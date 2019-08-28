import { getTrack } from "../../../controllers/spotifyApi";

export const attachSpotify = c =>
  getTrack(c.spotifyId).then(t => {
    c.spotifyData = t;
    return c;
  });
