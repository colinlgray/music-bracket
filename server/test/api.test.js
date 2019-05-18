import { getSongs } from "../src/api";

test("gets json from spotify for a song query", done => {
  getSongs("old town road").then(songs => {
    expect(songs).toBe(3);
    done();
  });
});
