import { Track, TrackProperties } from "./Track";
import { BaseModel } from "./BaseModel";
import { get as _get } from "lodash";
import uuid from "uuid/v4";

export interface CompetitorProps {
  [key: string]: any;
  track: Track | TrackProperties;
  id?: string;
}

export interface CompetitorProperties extends CompetitorProps {
  id: string;
  imageUrl: string;
}

export function isTrack(props: Track | CompetitorProps): props is Track {
  return (props as Track).save !== undefined;
}

export class Competitor extends BaseModel {
  [key: string]: any;
  id: string;
  track: Track;
  imageUrl: string;
  constructor(props: Track | CompetitorProps) {
    super(props);
    this.id = props.id || uuid();
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
}

export default Competitor;
