import { BaseModel } from "./BaseModel";
import { Artist, ArtistProperties } from "./Artist";
import { Album, AlbumProperties } from "./Album";
import { get, post } from "../utils/http";
import { omit } from "lodash";

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

export class Track implements BaseModel {
  [key: string]: any;
  artists: Array<Artist>;
  album: Album;
  constructor(props: TrackProperties) {
    for (let key in omit(props, ["artists", "album"])) {
      this[key] = props[key];
    }
    this.artists = props.artists.map(a => new Artist(a as ArtistProperties));
    this.album = new Album(props.album as AlbumProperties);
  }

  async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(`/api/tracks/${id}`);
    return new Track(parsedBody);
  }

  async create() {
    const { parsedBody } = await post("/api/tracks", {});
    return new Track(parsedBody);
  }

  async save() {
    throw new Error("not implemented");
  }
}

export default Track;
