import { BaseModel } from "./BaseModel";
import { Artist, ArtistProperties } from "./Artist";
import { Track, TrackProperties } from "./Track";

export interface AlbumProperties {
  [key: string]: any;
  album_type: string;
  href: string;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  artists: Array<Artist | ArtistProperties>;
  tracks?: Array<Track | TrackProperties>;
}

export class Album extends BaseModel {
  [key: string]: any;
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
    this.artists = props.artists.map(
      (a: Artist | ArtistProperties) => new Artist(a as ArtistProperties)
    );
    if (props.tracks) {
      this.tracks = props.tracks.map(
        (t: Track | TrackProperties) => new Track(t as TrackProperties)
      );
    }
  }
}

export default Album;
