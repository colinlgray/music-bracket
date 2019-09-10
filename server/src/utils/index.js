import { getTrack } from "../controllers/spotify";

export const attachSpotify = c => {
  if (!c || !c.spotifyId) {
    console.error("Competitor missing spotifyId");
    return c;
  }
  return getTrack(c.spotifyId).then(t => {
    c.spotifyData = t;
    return c;
  });
};
