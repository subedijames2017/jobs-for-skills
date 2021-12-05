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
                console.log("merojob vacancy inserted successfully");
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
router.get("/jobsnepal", (req, res, next) => {
  function makeAPICall(page) {
    return new Promise((resolve, reject) => {
      request(
        {
          method: "GET",
          url: `https://www.jobsnepal.com/jobs?page=${page}`,
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
      let allJobsTextBody = $("#app").text();
      if (!allJobsTextBody.includes("Currently, there are no job vacancies")) {
        $("#app")
          .find("div.card-inner")
          .each(function () {
            let jobName = $(this)
              .find(".job-title")
              .find("a")
              .text()
              .replace(/(\r\n|\n|\r)/gm, "");
            let jobAvatar = $(this)
              .find("div.company-logo")
              .find("img")
              .attr("data-src")
              ? $(this).find("div.company-logo").find("img").attr("data-src")
              : "";
            let jobLink = $(this).find(".job-title").find("a").attr("href");
            let companyName = $($(this).find("ul").find("li")[0]).find("p")
              .length
              ? $($(this).find("ul").find("li")[0])
                  .find("p")
                  .text()
                  .replace(/(\r\n|\n|\r)/gm, "")
              : "";
            let location = $(this).find("i.icon-location4").parent().find("div")
              .length
              ? $(this)
                  .find("i.icon-location4")
                  .parent()
                  .find("div")
                  .text()
                  .replace(/(\r\n|\n|\r)/gm, "")
              : "";
            let description = {
              companyName,
              location,
            };
            let insertObject = {
              title: jobName,
              description: JSON.stringify(description),
              link: jobLink,
              avatar: jobAvatar,
              job_portal: "jobsnepal",
              created_date: date.toISOString().slice(0, 19).replace("T", " "),
            };
            knex("vacencies")
              .insert(insertObject)
              .then((result) => {
                console.log("jobsnepal vacancy inserted successfully");
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
router.get("/kumarijob", (req, res, next) => {
  function makeAPICall(page) {
    return new Promise((resolve, reject) => {
      request(
        {
          method: "GET",
          url: `https://www.kumarijob.com/search?page=${page}`,
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
      if ($("div.job-listing").find(".job-listing-frame").length > 1) {
        $("div.job-listing-frame").each(function () {
          let jobName = $(this)
            .find(".job-detail")
            .find("h5")
            .find("a")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "");
          let jobAvatar = $(this)
            .find("div.companey-logo")
            .find("img")
            .attr("src")
            ? $(this).find("div.companey-logo").find("img").attr("src")
            : "";
          let jobLink = $(this)
            .find(".job-detail")
            .find("h5")
            .find("a")
            .attr("href");
          let companyName = $(this)
            .find(".job-detail")
            .find("span.title")
            .find("a")
            .text()
            ? $(this)
                .find(".job-detail")
                .find("span.title")
                .find("a")
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
            : "";
          let location = $(this)
            .find("i.fa-map-marker")
            .parent()
            .find("span.text").length
            ? $(this)
                .find("i.fa-map-marker")
                .parent()
                .find("span.text")
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
            : "";
          let description = {
            companyName,
            location,
          };
          let insertObject = {
            title: jobName,
            description: JSON.stringify(description),
            link: jobLink,
            avatar: jobAvatar,
            job_portal: "kumarijob",
            created_date: date.toISOString().slice(0, 19).replace("T", " "),
          };
          knex("vacencies")
            .insert(insertObject)
            .then((result) => {
              console.log("kumarijob vacancy inserted successfully");
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
