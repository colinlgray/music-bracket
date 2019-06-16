import { app } from "../src";
import request from "supertest";

describe("GET /api/artists", () => {
  it("responds with json", () => {
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
});

describe("GET /api/artists/:id", () => {
  it("responds with json", () => {
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
});

describe("GET /api/tracks/search", () => {
  const query = "old town road";
  const limit = 10;
  const offset = 0;
  const url = `/api/tracks/search?query=${encodeURI(
    query
  )}&limit=${limit}&offset${offset}`;

  it("responds with json", () => {
    return request(app)
      .get(url)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response).toBeTruthy();
      });
  });
});
