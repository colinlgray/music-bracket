import { makeGetterAll, makeGetterById } from "../src/dbApi";
const getArtistById = makeGetterById("Artists");
const getAllArtists = makeGetterAll("Artists");

// test("gets artist from the db by id", done => {
//   return getArtistById({ id: "7jVv8c5Fj3E9VhNjxT4snq" })
//     .then(artist => {
//       expect(artist).toBeTruthy();
//       done();
//     })
//     .catch(done);
// });

test("gets all artists from the db", done => {
  return getAllArtists()
    .then(artists => {
      expect(artists.length).toBeTruthy();
      done();
    })
    .catch(done);
});
