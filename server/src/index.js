const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));

function redirectUnmatched(req, res) {
  res.redirect("/");
}

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, ".." , "build", "index.html"));
});

app.use(redirectUnmatched)
app.listen(process.env.PORT || 8080);
