import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { searchForType } from "./controllers/spotifyApi";
import {
  makeGetterById,
  makeGetterAll,
  makeCreator,
  makePutById
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
const putResourceById = routes.map(key => makePutById(key));

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

const errorHandler = res => err => {
  console.error(err);
  res.sendStatus(500);
};

routes.map(key => {
  router.get(`/${key}/:id`, (req, res) => {
    return getById({ key, id: req.params.id })
      .then(model => {
        if (model) {
          return res.send(model);
        } else {
          return res.sendStatus(404);
        }
      })
      .catch(errorHandler(res));
  });

  router.post(`/${key}`, (req, res) => {
    return createModel({ key, id: req.params.id, body: req.body })
      .then(model => {
        res.status(201);
        res.json(model);
        res.end();
      })
      .catch(errorHandler(res));
  });

  router.get(`/${key}`, (req, res) => {
    return getResourcesAll[routes.indexOf(key)]()
      .then(models => {
        res.send(models);
      })
      .catch(errorHandler(res));
  });

  router.put(`/${key}/:id`, (req, res) => {
    return putResourceById[routes.indexOf(key)](req.body)
      .then(model => {
        res.status(200);
        res.send(model);
      })
      .catch(errorHandler(res));
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
