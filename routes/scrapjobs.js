const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const knex = require("../db/knex");

//register
router.get("/merojob", (req, res, next) => {
  function makeAPICall(page) {
    return new Promise((resolve, reject) => {
      request(
        {
          method: "GET",
          url: `https://merojob.com/category/it-telecommunication/?page=${page}`,
        },
        (err, res, body) => {
          if (err) reject(false);
          resolve(cheerio.load(body));
        }
      );
    });
  }

  async function processJobs() {
    const date = new Date();
    let scrapJobs = true;
    let counter = 1;
    while (scrapJobs) {
      let $ = await makeAPICall(counter);
      if ($(".pagination").length > 0) {
        $("#search_job")
          .find(".card-body")
          .each(function () {
            let jobName = $(this)
              .find(".media-heading")
              .text()
              .replace(/(\r\n|\n|\r)/gm, "");
            let jobLink = `https://merojob.com${$(this)
              .find(".media-heading")
              .find("a")
              .attr("href")}`;
            let jobAvatar = `https://merojob.com${$(this)
              .find("img")
              .attr("src")}`;
            let companyName = $(this)
              .find("h3")
              .text()
              .replace(/(\r\n|\n|\r)/gm, "");
            let location = $(this)
              .find("span[itemprop='addressLocality']")
              .text()
              .replace(/(\r\n|\n|\r)/gm, "");
            let skills = $(this)
              .find(".media-body")
              .find("span[itemprop='skills']")
              .text();
            let description = {
              companyName,
              location,
              skills,
            };
            let insertObject = {
              title: jobName,
              description: JSON.stringify(description),
              link: jobLink,
              avatar: jobAvatar,
              job_portal: "merojob",
              created_date: date.toISOString().slice(0, 19).replace("T", " "),
            };
            knex("vacencies")
              .insert(insertObject)
              .then((result) => {
                console.log("data inserted successfully");
              });
          });
      } else {
        scrapJobs = false;
      }
      counter += 1;
    }
    return counter;
  }

  async function doIt() {
    let result = await processJobs();
    res.send("success");
  }
  doIt();
});

module.exports = router;
