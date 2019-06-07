import { BaseModel } from "./BaseModel";
import { get, post } from "../utils/request";
import { omit } from "lodash";
import uuid from "uuid/v4";

export interface ArtistProperties {
  [key: string]: any;
  id: string;
  spotifyId: string;
  href: string;
  name: string;
  type: string;
  uri: string;
}

export class Artist implements BaseModel {
  [key: string]: any;
  constructor(props: ArtistProperties) {
    this.id = uuid();
    for (let key in omit(props, "id")) {
      this[key] = props[key];
    }
    this.spotifyId = props.id;
  }

  async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(`/api/artists/${id}`);
    return new Artist(parsedBody);
  }

  async create() {
    const { parsedBody } = await post("/api/artists", {});
    return new Artist(parsedBody);
  }

  async save() {
    throw new Error("not implemented");
  }
}

export default Artist;
