import { Track } from "./Track";
import { BaseModel } from "./BaseModel";
import { get, post } from "../utils";

export interface CompetitorProperties {
  [key: string]: any;
  track: Track;
  id: string;
}

export function isTrack(props: Track | CompetitorProperties): props is Track {
  return (<Track>props).save !== undefined;
}

export class Competitor implements BaseModel {
  [key: string]: any;
  constructor(props: Track | CompetitorProperties) {
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
    throw new Error("not implemented");
  }
}

export default Competitor;
