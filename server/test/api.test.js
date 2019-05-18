import { getSongs } from "../src/api";

test("gets json from spotify for a song query", done => {
  getSongs({ query: "old town road" }).then(songs => {
    expect(songs.items.length).toBeTruthy();
    expect(songs.total).toBeTruthy();
    done();
  });
});
