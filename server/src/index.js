const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const { getResource } = require("./api");

const getSongs = getResource("track");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.get("/api/songs", (req, res) =>
  getSongs({ query: req.query })
    .then(songs => {
      res.send(songs);
    })
    .catch(err => {
      console.error("Err in /api/songs", err);
      res.sendStatus(500);
    })
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
