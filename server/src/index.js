const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { searchForType } = require("./api");
const { makeGetterById, makeGetterAll, makeCreator } = require("./dbApi");
const { startDb, db } = require("../../database");
const uuid = require("uuid/v4");

const router = express.Router();
const app = express();
const searchSongs = searchForType("track");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "..", "build")));

const routes = ["Artists", "Brackets"];
const getResourceById = routes.map(key => makeGetterById(key));
const getResourcesAll = routes.map(key => makeGetterAll(key));
const createResource = routes.map(key => makeCreator(key));

router.get("/tracks/search", (req, res) =>
  searchSongs(req.query)
    .then(songs => {
      res.send(songs);
    })
    .catch(err => {
      console.error("Err in /tracks/search", err);
      res.sendStatus(500);
    })
);

routes.map(key => {
  router.get(`/${key}/:id`, (req, res) => {
    getResourceById[routes.indexOf(key)](req.params.id).then(model => {
      res.send(model);
    });
  });

  router.post(`/${key}`, (req, res) => {
    const newId = uuid();
    createResource[routes.indexOf(key)]().then(model => {
      res.status(201);
      res.json({ id: newId });
      res.end();
    });
  });

  router.get(`/${key}`, (req, res) => {
    getResourcesAll[routes.indexOf(key)]().then(model => {
      res.send(model);
    });
  });
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.use("/api", router);

startDb().then(() => {
  app.listen(process.env.PORT || 8080);
});
