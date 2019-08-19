import { Track } from "./Track";

export interface Competitor {
  [key: string]: any;
  id: string;
  spotifyId: string;
  type: string;
  spotifyData: Track | null;
  roundsWon: number;
  bracketId: string | null;
  index: number;
}
