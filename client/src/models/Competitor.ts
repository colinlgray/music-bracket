import { Track, TrackProperties } from "./Track";
import { BaseModel } from "./BaseModel";
import { get, post, put } from "../utils/request";
import { get as _get } from "lodash";
import uuid from "uuid/v4";

export interface CompetitorProperties {
  [key: string]: any;
  track: Track | TrackProperties;
  id: string;
  imageUrl: string;
}

export function isTrack(props: Track | CompetitorProperties): props is Track {
  return (props as Track).save !== undefined;
}

export class Competitor implements BaseModel {
  [key: string]: any;
  constructor(props: Track | CompetitorProperties) {
    this.id = uuid();
    if (isTrack(props)) {
      this.track = props;
    } else {
      if (!props.track) {
        throw new Error(
          "Competitor model requires a Track model or a track json object"
        );
      }
      this.track = new Track(props.track as TrackProperties);
    }
    const images = _get(props, "track.album.images", []);
    this.imageUrl = images.reduce(
      (memo: any, curr: { width: number; height: number; url: string }) => {
        if (!memo || curr.width < memo.width) {
          return curr;
        }
        return memo;
      }
    );
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
