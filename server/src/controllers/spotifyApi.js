const moment = require("moment");
const request = require("request");
const pluralize = require("pluralize");

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

const makeRequest = url => {
  return getAndRefreshTokenIfNeeded().then(token => {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          Authorization: "Bearer " + token
        },
        json: true,
        url
      };
      request.get(options, (error, response, body) => {
        if (error || body.error) {
          reject(error || body.error);
        } else {
          resolve(body);
        }
      });
    });
  });
};

const getAndRefreshTokenIfNeeded = () => {
  if (!tokenExpireTime || moment().isAfter(tokenExpireTime)) {
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
  if (!query) {
    return Promise.resolve([{ total: 0, items: [], offset }]);
  }

  const modelType = pluralize.singular(type).toLowerCase();
  const url = `https://api.spotify.com/v1/search?q=${encodeURI(
    query
  )}&type=${modelType}&market=US&limit=${limit}&offset=${offset}`;

  return makeRequest(url).then(body => {
    if (!body.tracks) {
      console.error("missing tracks in response", body);
      return { total: 0, items: [], offset };
    }
    return {
      total: body.tracks.total,
      items: body.tracks.items,
      offset
    };
  });
};

const getType = type => id => {
  if (!id) {
    return null;
  }
  const modelType = pluralize.plural(type).toLowerCase();
  const url = `https://api.spotify.com/v1/${modelType}/${id}`;

  return makeRequest(url);
};

module.exports = {
  searchForType,
  getType,
  getTrack: getType("Tracks")
};
