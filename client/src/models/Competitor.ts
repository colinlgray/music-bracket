import { Track } from "./Track";
import { BaseModel } from "./BaseModel";
import { get, post, put } from "../utils/request";
import uuid from "uuid/v4";

export interface CompetitorProperties {
  [key: string]: any;
  track: Track;
  id: string;
}

export function isTrack(props: Track | CompetitorProperties): props is Track {
  return (props as Track).save !== undefined;
}

export class Competitor implements BaseModel {
  [key: string]: any;
  constructor(props: Track | CompetitorProperties) {
    this.id = uuid();
    // this.save = this.save.bind(this);
    if (isTrack(props)) {
      this.track = props;
    } else {
      for (let key in props) {
        this[key] = props[key];
      }
    }
  }

  async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(`/api/competitors/${id}`);
    return new Competitor(parsedBody);
  }

  async create() {
    const { parsedBody } = await post("/api/competitors", {});
    return new Competitor(parsedBody);
  }

  async save() {
    const res = await put("/api/competitors", this);
    return res;
  }
}

export default Competitor;
