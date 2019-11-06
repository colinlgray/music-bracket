import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { searchForType } from "./controllers/spotify";
import { startDb } from "./database";
import apolloServer from "./controllers/apolloServer";

const router = express.Router();
const app = express();
const searchSongs = searchForType("Tracks");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "..", "build")));

apolloServer.applyMiddleware({ app });

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

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "dist", "client", "index.html")
  );
});

startDb().then(() => {
  app.listen(process.env.PORT || 8080);
});

module.exports = {
  app
};
