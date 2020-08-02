const express = require("express");
const app = express();
const { spawn } = require("child_process");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/job", function (req, res) {
  console.log("req", req.body);
  let largeDataSet = [];
  const python = spawn("python", ["scripts/script.py", '{"name":"james"}']);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("data", data.toString());
    console.log("data", JSON.parse(data.toString()));

    console.log("Pipe data from python script ...");
    let predicted = JSON.parse(data.toString());
    largeDataSet.push(predicted.data);
  });
  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });
  // in close event we are sure that stream is from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(largeDataSet);
  });
});

app.listen(3001, () => {
  console.log("server is runing at port", 3001);
});
