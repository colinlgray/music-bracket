import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { map } from "lodash";
import { searchForType, getTrack } from "./controllers/spotifyApi";
import { attachSpotify } from "./database/utils";
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

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "..", "build")));

apolloServer.applyMiddleware({ app });
const dbRoutes = ["Brackets", "Competitors"];
const getResourceById = map(dbRoutes, key => makeGetterById(key));
const getResourcesAll = map(dbRoutes, key => makeGetterAll(key));
const createResource = map(dbRoutes, key => makeCreator(key));
const putResourceById = map(dbRoutes, key => makePutById(key));

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

const createModel = ({ key, id, body }) => {
  return createResource[dbRoutes.indexOf(key)]({ id: id || uuid(), ...body });
};

map(dbRoutes, key => {
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

// Brackets
router.get(`/${dbRoutes[0]}/:id`, (req, res) => {
  return getResourceById[0](req.params.id)
    .then(bracket => {
      if (!bracket) return Promise.resolve([]);
      const asJson = bracket.toJSON();
      return Promise.all([asJson, ...map(asJson.competitors, attachSpotify)]);
    })
    .then(([bracket]) => {
      return Promise.resolve(bracket);
    })
    .then(sendOr404(res))
    .catch(errorHandler(res));
});

// Competitors
router.get(`/${dbRoutes[1]}/:id`, (req, res) => {
  return getResourceById[1](req.params.id)
    .then(competitor => {
      if (!competitor) return Promise.resolve([]);
      const asJson = competitor.toJSON();
      return Promise.all([asJson, ...map(asJson.competitors, attachSpotify)]);
    })
    .then(([c]) => Promise.resolve(c))
    .then(sendOr404(res))
    .catch(errorHandler(res));
});

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

startDb().then(() => {
  app.listen(process.env.PORT || 8080);
});

module.exports = {
  createModel,
  app
};
