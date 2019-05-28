const moment = require("moment");
const request = require("request");

const clientId = process.env.MUSIC_BRACKET_CLIENT_ID;
const clientSecret = process.env.MUSIC_BRACKET_CLIENT_SECRET;

let tokenExpireTime = null;
let authToken = null;

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(clientId + ":" + clientSecret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

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
    request.get(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};
const getAndRefreshTokenIfNeeded = () => {
  if (!tokenExpireTime || tokenExpireTime.isAfter(moment())) {
    return getApiToken().then(body => {
      tokenExpireTime = moment().add(body.expires_in, "seconds");
      authToken = body.access_token;
      return authToken;
    });
  }
  return Promise.resolve(authToken);
};

const getApiToken = () => {
  return new Promise((resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode >= 400) {
        reject(new Error(response.statusMessage));
      } else {
        resolve(body);
      }
    });
  });
};

const searchForType = type => ({ query, offset = 0, limit = 10 }) => {
  return getAndRefreshTokenIfNeeded().then(token => {
    if (!query) {
      return [{ total: 0, items: [], offset }];
    }
    return makeRequest({
      url: `https://api.spotify.com/v1/search?q=${encodeURI(
        query
      )}&type=${type}&market=US&limit=${limit}&offset=${offset}`,
      token
    }).then(spotifyResponse => {
      return {
        total: spotifyResponse.tracks.total,
        items: spotifyResponse.tracks.items,
        offset
      };
    });
  });
};

module.exports = {
  searchForType
};
