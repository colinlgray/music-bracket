import { Artist } from "./Artist";
import { Album } from "./Album";

export interface Track {
  [key: string]: any;
  duration: number;
  explicit: boolean;
  href: string;
  popularity: number;
  preview_url: string;
  type: string;
  uri: string;
  id: string;
  disc_number: number;
  duration_ms: number;
  is_local: string;
  is_playable: boolean;
  name: string;
  track_number: number;
  artists: Array<Artist>;
  album: Album;
}

export default Track;
