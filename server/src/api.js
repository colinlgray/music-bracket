const moment = require("moment");
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.MUSIC_BRACKET_CLIENT_ID,
  clientSecret: process.env.MUSIC_BRACKET_CLIENT_SECRET
});

const SEARCH_LIMIT = 10;
let tokenExpireTime = null;

const refreshTokenIfNeeded = () => {
  if (!tokenExpireTime || tokenExpireTime.isAfter(moment())) {
    return spotifyApi.clientCredentialsGrant().then(data => {
      tokenExpireTime = moment().add(data.body.expires_in, "seconds");
      spotifyApi.setAccessToken(data.body.access_token);
    });
  }
  return Promise.resolve();
};

const getSongs = ({ query, offset = 0 }) => {
  return refreshTokenIfNeeded()
    .then(() => spotifyApi.searchTracks(query, { limit: SEARCH_LIMIT, offset }))
    .then(spotifyResponse => spotifyResponse.body.tracks);
};

module.exports = {
  getSongs,
  refreshTokenIfNeeded
};
