import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { searchForType } from "./controllers/spotifyApi";
import {
  makeGetterById,
  makeGetterAll,
  makeCreator
} from "./controllers/dbApi";
import { startDb } from "./database";
import uuid from "uuid/v4";
import apolloServer from "./controllers/apolloServer";

const router = express.Router();
const app = express();
const searchSongs = searchForType("track");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "..", "build")));

apolloServer.applyMiddleware({ app });
const routes = ["Artists", "Brackets", "Competitors"];
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

const getById = ({ key, id }) => getResourceById[routes.indexOf(key)](id);

const createModel = ({ key, id, body }) => {
  return createResource[routes.indexOf(key)]({ id: id || uuid(), ...body });
};

routes.map(key => {
  router.get(`/${key}/:id`, (req, res) => {
    getById({ key, id: req.params.id }).then(model => {
      if (model) {
        res.send(model);
      } else {
        res.sendStatus(404);
      }
    });
  });

  router.post(`/${key}`, (req, res) => {
    createModel({ key, id: req.params.id, body: req.body }).then(model => {
      res.status(201);
      res.json(model);
      res.end();
    });
  });

  router.get(`/${key}`, (req, res) => {
    getResourcesAll[routes.indexOf(key)]().then(models => {
      res.send(models);
    });
  });

  router.put(`/${key}/:id`, (req, res) => {
    throw new Error("Not implemented");
    // putResourceById[routes.indexOf(key)]().then(models => {
    //   res.send(models);
    // });
  });
});

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

startDb().then(() => {
  app.listen(process.env.PORT || 8080);
});

module.exports = {
  getById,
  createModel,
  app
};
