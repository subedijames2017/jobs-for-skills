const express = require("express");
const router = express.Router();

const { spawn } = require("child_process");

//register
router.post("/", (req, res, next) => {
  console.log("req", req.body);
  let largeDataSet = [];
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
    largeDataSet.push(predicted.data);
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
