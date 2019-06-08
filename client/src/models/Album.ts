import { BaseModel } from "./BaseModel";
import { Artist, ArtistProperties } from "./Artist";
import { Track, TrackProperties } from "./Track";
import { get, post } from "../utils/request";
import { omit } from "lodash";

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

export class Album implements BaseModel {
  [key: string]: any;
  constructor(props: AlbumProperties) {
    for (let key in omit(props, ["artists", "tracks"])) {
      this[key] = props[key];
    }
    this.artists = props.artists.map(
      (a: Artist | ArtistProperties) => new Artist(<ArtistProperties>a)
    );
    if (props.tracks) {
      this.tracks = props.tracks.map(
        (t: Track | TrackProperties) => new Track(<TrackProperties>t)
      );
    }
  }

  async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(`/api/albums/${id}`);
    return new Track(parsedBody);
  }

  async create() {
    const { parsedBody } = await post("/api/albums", {});
    return new Track(parsedBody);
  }

  async save() {
    throw new Error("not implemented");
  }
}

export default Album;
