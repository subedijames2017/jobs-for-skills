const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

const {spawn} = require("child_process");

//register
router.post("/", (req, res, next) => {
  console.log("req", req.body);
  let largeDataSet = {};
  let skillsObject = {
    skills: req.body.skills,
  };
  const python = spawn("python3", [
    "scripts/script.py",
    JSON.stringify(skillsObject),
  ]);
  // collect data from script
  python.stdout.on("data", function (data) {
    let predicted = JSON.parse(data.toString());
    let searchString = "";
    const date = new Date();
    let currnetDate = date.toISOString().split("T")[0];
    let query = knex("vacencies").select("*");
    let counter = 0;
    let predictedData = predicted.data.filter((v, i, a) => a.indexOf(v) === i);
    predictedData = predictedData.reverse();
    predictedData.forEach((element) => {
      let searchAbleString = element.split(" ");
      if (counter) {
        query.where("title", "like", `%${searchAbleString[0]}%`);
      } else {
        query.orWhere("title", "like", `%${searchAbleString[0]}%`);
      }
      counter += counter;
    });
    query
      .from(function () {
        this.select("*")
          .from("vacencies")
          .where("created_date", currnetDate)
          .as("t1");
      })
      .then((result) => {
        if (result && result.length > 0) {
          largeDataSet["data"] = result;
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: recommend.js ~ line 42 ~ err", err);
      });
  });
  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });
  // in close event we are sure that stream is from child process is closed
  python.on("close", (code) => {
    // send data to browser
    res.send(largeDataSet);
  });
});

module.exports = router;
