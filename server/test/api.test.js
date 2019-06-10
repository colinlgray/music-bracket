import request from "supertest";
import app from "../src";

describe("GET /api/brackets", () => {
  it("responds with json", () => {
    return request(app)
      .get("/api/brackets")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
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
        expect(response).toBeTruthy();
      });
  });
});

describe("GET /api/tracks/search", () => {
  const query = "old town road";
  const limit = 10;
  const offset = 0;

  it("responds with json", () => {
    return request(app)
      .get(
        `/api/tracks/search?query=${encodeURI(
          query
        )}&limit=${limit}&offset${offset}`
      )
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response).toBeTruthy();
      });
  });
});
