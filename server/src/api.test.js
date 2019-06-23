import { app } from "../src";
import { bracket, searchResponse } from "../../fixtures";
import request from "supertest";

test.skip("GET /api/tracks/:id", () => {
  const trackResponse = searchResponse[0];
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

test.skip("PUT /api/brackets/:id", () => {
  const { id } = bracket;
  const url = `/api/brackets/${id}`;

  return request(app)
    .put(url)
    .send(bracket)
    .expect(200)
    .get(url)
    .then(response => {
      expect(response).toBeTruthy();
    });
});
