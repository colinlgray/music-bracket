const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { searchForType } = require("./api");
const db = require("../../database/models");

const app = express();
const searchSongs = searchForType("track");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.get("/api/songs", (req, res) =>
  searchSongs(req.query)
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

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 8080);
});
