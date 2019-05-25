import { searchForType } from "../src/api";
import { makeGetterAll, makeGetterById } from "../src/dbApi";
const searchTracks = searchForType("track");
const getArtistById = makeGetterById("Artists");
const getAllArtists = makeGetterAll("Artists");

test("gets json from spotify for a song query", done => {
  searchTracks({ query: "old town road", limit: 10, offset: 1 }).then(
    tracks => {
      expect(tracks.items.length).toBeTruthy();
      expect(tracks.total).toBeTruthy();
      done();
    }
  );
});

test("gets artist from the db by id", done => {
  return getArtistById({ id: "7jVv8c5Fj3E9VhNjxT4snq" })
    .then(artist => {
      expect(artist).toBeTruthy();
      done();
    })
    .catch(done);
});

test("gets all artists from the db", done => {
  return getAllArtists()
    .then(artists => {
      expect(artists.length).toBeTruthy();
      done();
    })
    .catch(done);
});
