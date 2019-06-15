import { BaseModel } from "./BaseModel";
import { Artist, ArtistProperties } from "./Artist";
import { Album, AlbumProperties } from "./Album";

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
  artists: Array<Artist | ArtistProperties>;
  album: Album | AlbumProperties;
}

export class Track extends BaseModel {
  [key: string]: any;
  artists: Array<Artist>;
  album: Album;
  duration: number;
  explicit: boolean;
  href: string;
  popularity: number;
  preview_url: string;
  type: string;
  uri: string;
  id: string;

  constructor(props: TrackProperties) {
    super(props);
    this.duration = props.duration;
    this.explicit = props.explicit;
    this.href = props.href;
    this.popularity = props.popularity;
    this.preview_url = props.preview_url;
    this.type = props.type;
    this.uri = props.uri;
    this.id = props.id;
    this.artists = props.artists.map(a => new Artist(a as ArtistProperties));
    this.album = new Album(props.album as AlbumProperties);
  }
}

export default Track;
