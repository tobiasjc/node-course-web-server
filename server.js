const express = require("express");
const helpers = require("./helpers/textFormat");
const fs = require("fs");

const app = express();
const contentPath = "/public";

const creator = {
  name: "José Tobias",
  likes: ["computers", "woman"]
};

// logger setup
app.use((req, res, next) => {
  var now = new Date().toString();
  var logMessage = `${now} : ${req.method} ${req.url}`;
  console.log(logMessage);
  fs.appendFile("server.log", logMessage.concat("\n"), err => {
    if (err) console.log("Unable to append to server.log due to error: ", err);
  });
  next();
});

// activate in case of maintenance
// app.use((req, res, next) => {
//   res.render("pages/maintenance.ejs", {
//     h: helpers,
//     creator
//   });
// });

// serving static content through the middleware
app.use(express.static(__dirname.concat(contentPath)));

app.set("view engine", "ejs");

app.get(/^\/(home|)$/, (req, res) => {
  res.render("pages/home.ejs", {
    h: helpers,
    creator,
    pageTitle: "Some website"
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about.ejs", {
    h: helpers,
    creator,
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to handle request" });
});

app.listen(3000, () => console.log("Server is up on port 3000"));
