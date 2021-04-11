const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({path: "./.env"});
const {spawn} = require("child_process");
const bodyParser = require("body-parser");
const user = require("./routes/user");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const recommend = require("./routes/recommend");
const saveVacancies = require("./routes/scrapjobs");

app.use("/api/users", user);
app.use("/api/recommend", recommend);
app.use("/api/sync", saveVacancies);

app.listen(3001, () => {
  console.log("server is runing at port", 3001);
});
