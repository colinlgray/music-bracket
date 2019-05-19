const request = require("request");
const { map, pick } = require("lodash");
const moment = require("moment");
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.MUSIC_BRACKET_CLIENT_ID,
  clientSecret: process.env.MUSIC_BRACKET_CLIENT_SECRET
});

let tokenExpireTime = null;

const makeRequest = params => {
  return new Promise((resolve, reject) => {
    const { url, token } = params;
    const options = {
      headers: {
        Authorization: "Bearer " + token
      },
      json: true,
      url
    };
    request.get(options, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

const getApiToken = () => {
  return new Promise((resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode >= 400) {
        reject(new Error(response.statusMessage));
      } else {
        resolve(body.access_token);
      }
    });
  });
};

const refreshTokenIfNeeded = () => {
  if (!tokenExpireTime || tokenExpireTime.isAfter(moment())) {
    return spotifyApi.clientCredentialsGrant().then(data => {
      spotifyApi.setAccessToken(data.body["access_token"]);
    });
  }
  return Promise.resolve();
};

const getSongs = ({ query, offset = 0 }) => {
  return refreshTokenIfNeeded().then(() => {
    return spotifyApi.searchTracks(query).then(spotifyResponse => {
      return spotifyResponse.body.tracks;
    });
  });
};

module.exports = {
  getSongs,
  getApiToken,
  makeRequest
};
