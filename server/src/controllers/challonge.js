import request from "request";

export async function newTournament() {
  const url = "https://api.challonge.com/v1/tournaments.json";
  return new Promise((resolve, reject) => {
    request.post(
      {
        url,
        api_key: process.env.CHALLONGE_API_KEY,
        tournament: { name: "AHHHHHH" }
      },
      (error, response, body) => {
        if (error) {
          console.error(error);
          reject(error);
        } else if (response.statusCode >= 400) {
          console.error("Unexpected response code:", response.statusCode);
          reject(new Error(response.statusMessage));
        } else {
          resolve(body);
        }
      }
    );
  });
}
