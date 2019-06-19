import { app } from "../src";
import request from "supertest";

test("GET /api/artists", () => {
  return request(app)
    .get("/api/artists")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body.length).toEqual(1);
      expect(response).toBeTruthy();
    });
});

test("GET /api/artists/:id", () => {
  const id = "7jVv8c5Fj3E9VhNjxT4snq";
  return request(app)
    .get(`/api/artists/${id}`)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body.id).toEqual(id);
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
  const id = "8193731a-e552-40dd-951f-798ec31e8ac6";
  const bracket = { id, competitors: [] };
  return request(app)
    .put(`/api/brackets/${id}`)
    .send(bracket)
    .expect(200);
});
