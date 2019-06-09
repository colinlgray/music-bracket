import { searchForType } from "../src/spotifyApi";
const searchTracks = searchForType("track");

test("gets json from spotify for a song query", done => {
  done();
  searchTracks({ query: "old town road", limit: 10, offset: 1 }).then(
    tracks => {
      expect(tracks.items.length).toBeTruthy();
      expect(tracks.total).toBeTruthy();
      done();
    }
  );
});
