import request from "request";
import uuid from "uuid/v4";
import { cloneDeep } from "lodash";

const authDefaults = {
  url: "https://api.challonge.com/v1/tournaments.json",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(
        process.env.CHALLONGE_USERNAME + ":" + process.env.CHALLONGE_API_KEY
      ).toString("base64")
  },
  body: {
    tournament: {
      name: "AHH!!!"
    }
  },
  json: true
};

export async function newTournament() {
  return new Promise((resolve, reject) => {
    const authParams = cloneDeep(authDefaults);
    authParams.body.tournament.url = uuid()
      .split("-")
      .join("");

    request.post(authParams, (error, response, body) => {
      if (error) {
        console.error(error);
        reject(error);
      } else if (response.statusCode === 422) {
        console.error("Challonge Validation Error:", response.body);
        reject(new Error(response.statusMessage));
      } else if (response.statusCode >= 400) {
        console.error("Unexpected response code:", response.statusCode);
        reject(new Error(response.statusMessage));
      } else {
        resolve(body);
      }
    });
  });
}
