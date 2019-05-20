import { searchForType, getResource } from "../src/api";
const searchTracks = searchForType("track");
const getArtist = getResource("artist");

test("gets json from spotify for a song query", done => {
  searchTracks({ query: "old town road", limit: 10, offset: 1 }).then(
    tracks => {
      expect(tracks.items.length).toBeTruthy();
      expect(tracks.total).toBeTruthy();
      done();
    }
  );
});

test("gets artist from the db", done => {
  return getArtist({ id: "7jVv8c5Fj3E9VhNjxT4snq" })
    .then(artist => {
      expect(artist).toBeTruthy();
      done();
    })
    .catch(done);
});
