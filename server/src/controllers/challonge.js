import request from "request";
console.log(
  process.env.CHALLONGE_USERNAME + ":" + process.env.CHALLONGE_API_KEY
);
const authOptions = {
  url: "https://api.challonge.com/v1/tournaments.json",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(
        process.env.CHALLONGE_USERNAME + ":" + process.env.CHALLONGE_API_KEY
      ).toString("base64")
  },
  body: { tournament: { name: "AHH!!!", url: "test_url_1" } },
  json: true
};

export async function newTournament() {
  return new Promise((resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
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
