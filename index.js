const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Welcome to react application");
});

app.listen(3001, () => {
  console.log("server is runing at port", 3001);
});
