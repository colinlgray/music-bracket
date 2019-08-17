import { Artist } from "./Artist";
import { Track } from "./Track";
import { Image } from "./Image";

export interface Album {
  [key: string]: any;
  id: string;
  album_type: string;
  href: string;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  artists: Array<Artist>;
  tracks?: Array<Track>;
  images?: Array<Image>;
}

export default Album;
