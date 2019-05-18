import request from "request";
import { map, pick } from "lodash";

const client_id = process.env.MUSIC_BRACKET_CLIENT_ID;
const client_secret = process.env.MUSIC_BRACKET_CLIENT_SECRET;

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

export const makeRequest = params => {
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

export const getApiToken = () => {
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

export const getSongs = ({ query, offset = 0 }) => {
  return getApiToken().then(token => {
    if (!query) {
      return [];
    }
    return makeRequest({
      url: `https://api.spotify.com/v1/search?q=${encodeURI(
        query
      )}&type=track&market=US&limit=50&offset=${offset}`,
      token
    }).then(spotifyResponse => {
      return {
        total: spotifyResponse.tracks.total,
        items: map(spotifyResponse.tracks.items, item => {
          return pick(item, [
            "id",
            "name",
            "popularity",
            "duration_ms",
            "uri",
            "artists"
          ]);
        })
      };
    });
  });
};
