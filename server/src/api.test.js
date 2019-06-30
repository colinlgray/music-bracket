import { app } from "../src";
import { Bracket, Competitor, Track } from "../../client/src/models";
import {
  bracket,
  trackSearchResponse,
  getTrackResponse,
  competitor
} from "../../fixtures";
import { db } from "./database";
import request from "supertest";

beforeAll(() =>
  Promise.all([
    db.sequelize.queryInterface.bulkDelete("competitors", {
      id: "testCompetitorId"
    }),
    db.sequelize.queryInterface.bulkInsert("competitors", competitor)
  ])
);

afterAll(() =>
  db.sequelize.queryInterface.bulkDelete("competitors", {
    id: competitor.id
  })
);

test.skip("Get /api/competitors/:id returns spotify info", () => {
  return request(app)
    .get(`/api/competitors/${competitor.id}`)
    .set("Accept", "application/json")
    .expect(200)
    .then(response => {
      expect(response.body.model).toBeTruthy();
    });
});

test("GET /api/tracks/:id", () => {
  return request(app)
    .get(`/api/tracks/${trackSearchResponse[0].id}`)
    .set("Accept", "application/json")
    .expect(200)
    .then(response => {
      expect(response.body.album).toEqual(getTrackResponse);
    });
});

test("GET /api/tracks/search", () => {
  const query = "old town road";
  const limit = 10;
  const offset = 0;
  const url = `/api/tracks/search?query=${encodeURI(
    query
  )}&limit=${limit}&offset${offset}`;

  return request(app)
    .get(url)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response).toBeTruthy();
    });
});

test("POST /api/competitors", () => {
  const c = new Competitor({
    type: "track",
    spotifyId: trackSearchResponse[0].id,
    track: new Track(trackSearchResponse[0]),
    id: "testCompetitorId",
    index: 0
  });
  return request(app)
    .post("/api/competitors")
    .send(c.dbProps)
    .expect(201)
    .then(response => {
      expect(response.body).toBeTruthy();
    });
});

test("PUT /api/brackets/:id", () => {
  const c = new Competitor({
    type: "track",
    spotifyId: trackSearchResponse[0].id,
    track: new Track(trackSearchResponse[0]),
    id: "testCompetitorId",
    index: 0
  });

  const b = new Bracket({
    name: "my new bracket",
    creator: "my new bracket",
    competitors: [],
    description: "test",
    id: "testId"
  });

  b.addCompetitor(c);
  const { id } = bracket;
  const url = `/api/brackets/${id}`;
  return request(app)
    .put(url)
    .send(b.dbProps)
    .expect(200);
});
