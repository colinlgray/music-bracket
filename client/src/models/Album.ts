import { BaseModel } from "./BaseModel";
import { Artist } from "./Artist";
import { Track } from "./Track";

export interface AlbumProperties {
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
}

export class Album extends BaseModel implements AlbumProperties {
  [key: string]: any;
  id: string;
  artists: Array<Artist>;
  tracks?: Array<Track>;
  album_type: string;
  href: string;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;

  constructor(props: AlbumProperties) {
    super(props);
    this.album_type = props.album_type;
    this.href = props.href;
    this.name = props.name;
    this.release_date = props.release_date;
    this.release_date_precision = props.release_date_precision;
    this.total_tracks = props.total_tracks;
    this.type = props.type;
    this.uri = props.uri;
    this.id = props.id;
    this.artists = props.artists.map((a: Artist) => new Artist(a));
    if (props.tracks) {
      this.tracks = props.tracks.map((t: Track) => new Track(t));
    }
  }
}

export default Album;
