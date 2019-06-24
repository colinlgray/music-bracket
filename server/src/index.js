import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { searchForType, getType } from "./controllers/spotifyApi";
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
const searchSongs = searchForType("Tracks");
const getTrack = getType("Tracks");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "..", "build")));

apolloServer.applyMiddleware({ app });
const dbRoutes = ["Brackets", "Competitors"];
const getResourceById = dbRoutes.map(key => makeGetterById(key));
const getResourcesAll = dbRoutes.map(key => makeGetterAll(key));
const createResource = dbRoutes.map(key => makeCreator(key));
const putResourceById = dbRoutes.map(key => makePutById(key));

const errorHandler = res => err => {
  console.error(err);
  res.sendStatus(500);
};

const sendOr404 = res => obj => {
  if (obj) {
    return res.send(obj);
  }
  return res.sendStatus(404);
};

router.get("/tracks/search", (req, res) =>
  searchSongs(req.query)
    .then(sendOr404(res))
    .catch(errorHandler(res))
);

router.get("/tracks/:id", (req, res) =>
  getTrack(req.params.id)
    .then(sendOr404(res))
    .catch(errorHandler(res))
);

const getById = ({ key, id }) => getResourceById[dbRoutes.indexOf(key)](id);

const createModel = ({ key, id, body }) => {
  return createResource[dbRoutes.indexOf(key)]({ id: id || uuid(), ...body });
};

dbRoutes.map(key => {
  router.get(`/${key}/:id`, (req, res) => {
    return getById({ key, id: req.params.id })
      .then(sendOr404(res))
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
    return getResourcesAll[dbRoutes.indexOf(key)]()
      .then(models => {
        res.send(models);
      })
      .catch(errorHandler(res));
  });

  router.put(`/${key}/:id`, (req, res) => {
    return putResourceById[dbRoutes.indexOf(key)](req.body)
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
