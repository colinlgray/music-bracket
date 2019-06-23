import { app } from "../src";
import { Bracket, Competitor, Track } from "../../client/src/models";
import { bracket, trackSearchResponse } from "../../fixtures";
import request from "supertest";

test.skip("GET /api/tracks/:id", () => {
  const trackResponse = trackSearchResponse[0];
  const id = { trackResponse };
  return request(app)
    .get(`/api/tracks/${id}`)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body).toEqual(trackResponse);
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

test("PUT /api/brackets/:id", () => {
  const c = new Competitor({
    type: "track",
    spotifyId: trackSearchResponse[0].id,
    track: new Track(trackSearchResponse[0]),
    id: "competitorId",
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
    .expect(200)
    .then(response => {
      expect(response.body).toEqual(b.dbProps);
    });
});
