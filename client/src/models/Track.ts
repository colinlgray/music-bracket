import { BaseModel } from "./BaseModel";
import { Artist, ArtistProperties } from "./Artist";
import { get, post } from "../utils/request";
import { omit } from "lodash";

export interface TrackProperties {
  [key: string]: any;
  duration: number;
  explicit: boolean;
  href: string;
  popularity: number;
  preview_url: string;
  spotifyId: string;
  type: string;
  uri: string;
  id: string;
  artists: Array<Artist | ArtistProperties>;
}

export class Track implements BaseModel {
  [key: string]: any;
  constructor(props: TrackProperties) {
    for (let key in omit(props, ["id", "artists", "album"])) {
      this[key] = props[key];
    }
    this.artists = props.artists.map(a => new Artist(<ArtistProperties>a));
    this.spotifyId = props.id;
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
