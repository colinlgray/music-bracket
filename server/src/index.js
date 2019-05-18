const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const api = require("./api");

app.use(bodyParser.json());
// app.use(cors());
app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.get("/api/songs", (req, res) => {
  api.getSongs({ query: req.query }).then(songs => {
    // console.log("", songs);
    res.send(songs);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
