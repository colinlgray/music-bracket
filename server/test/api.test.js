import { getResource } from "../src/api";
const getSongs = getResource("track");
test("gets json from spotify for a song query", done => {
  getSongs({ query: "old town road", limit: 10, offset: 1 }).then(songs => {
    expect(songs.items.length).toBeTruthy();
    expect(songs.total).toBeTruthy();
    done();
  });
});
