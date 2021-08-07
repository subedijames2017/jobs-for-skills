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
          let moreSimilarResult = [];
          let lessSimilarResult = [];
          let differentResult = [];
          let allResult;
          let incomingSkills = JSON.stringify(skillsObject.skills);
          if (result.length > 0) {
            result.forEach((element) => {
              let similarityValue = similarity(incomingSkills, element.title);
              if (similarityValue >= 0.2) {
                moreSimilarResult.push(element);
              }
              if (similarityValue > 0.1 && similarityValue < 0.2) {
                lessSimilarResult.push(element);
              }
              if (similarityValue < 0.1) {
                differentResult.push(element);
              }
            });
            allResult = moreSimilarResult.concat(lessSimilarResult);
            allResult = allResult.concat(differentResult);
            largeDataSet["data"] = allResult;
          }
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
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

module.exports = router;
