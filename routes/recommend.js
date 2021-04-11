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
    let query = knex("vacencies").select("*");
    let counter = 0;
    predicted.data.forEach((element) => {
      let searchAbleString = element.split(" ");
      if (searchAbleString.length > 0) {
        searchAbleString.forEach((searchElemet) => {
          if (counter) {
            query.where("title", "like", `%${searchElemet}%`);
          } else {
            query.orWhere("title", "like", `%${searchElemet}%`);
          }
          counter += counter;
        });
      }
    });
    query
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
