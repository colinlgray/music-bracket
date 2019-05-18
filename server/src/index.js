const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const api = require("./api");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")));

app.get("/api/songs", (req, res) => {
  console.log("req", req.query);
  api.get(req.query).then(songs => {
    console.log("songs", songs);
    res.sendStatus(200);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
