import { searchForType, getType } from "../src/api";
const searchTracks = searchForType("track");
const getBrackets = getType("bracket");

test("gets json from spotify for a song query", done => {
  searchTracks({ query: "old town road", limit: 10, offset: 1 }).then(
    tracks => {
      expect(tracks.items.length).toBeTruthy();
      expect(tracks.total).toBeTruthy();
      done();
    }
  );
});

test.only("gets json from spotify for a song query", done => {
  getBrackets({ id: "testId" }).then(bracket => {
    expect(bracket).toBeTruthy();
    done();
  });
});
