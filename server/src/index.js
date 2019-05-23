const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { searchForType, makeGetterById, makeGetterAll } = require("./api");
const { startDb } = require("../../database");

const app = express();
const searchSongs = searchForType("track");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")));
app.get("/api/tracks/search", (req, res) =>
  searchSongs(req.query)
    .then(songs => {
      res.send(songs);
    })
    .catch(err => {
      console.error("Err in /tracks/search", err);
      res.sendStatus(500);
    })
);

const routes = ["artists"];
const getResourceById = routes.map(key => makeGetterById(key));
const getResourcesAll = routes.map(key => makeGetterAll(key));

routes.map(key => {
  app.get(`/${key}/:id?`, (req, res) => {
    getResourceById[routes.indexOf(key)]().then(model => {
      res.send(model);
    });
  });
});

// const getAllArtists = makeGetterAll("artist");
// app.get(`/api/artists`, (req, res) => {
//   getAllArtists().then(model => {
//     res.send(model);
//   });
// });

routes.map(key => {
  app.get(`/api/${key}`, (req, res) => {
    getResourcesAll[routes.indexOf(key)]().then(model => {
      res.send(model);
    });
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

startDb().then(() => {
  app.listen(process.env.PORT || 8080);
});
