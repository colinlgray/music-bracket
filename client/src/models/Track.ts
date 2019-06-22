import { Artist } from "./Artist";
import { Album } from "./Album";

export interface TrackProperties {
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

export class Track implements TrackProperties {
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

  constructor(props: TrackProperties) {
    this.duration = props.duration;
    this.explicit = props.explicit;
    this.href = props.href;
    this.popularity = props.popularity;
    this.preview_url = props.preview_url;
    this.type = props.type;
    this.uri = props.uri;
    this.id = props.id;
    this.disc_number = props.disc_number;
    this.duration_ms = props.duration_ms;
    this.is_local = props.is_local;
    this.is_playable = props.is_playable;
    this.name = props.name;
    this.track_number = props.track_number;
    this.artists = props.artists.map(a => new Artist(a));
    this.album = new Album(props.album);
  }
}

export default Track;
