import { Track, TrackProperties } from "./Track";
import { BaseModel } from "./BaseModel";
import { get as _get } from "lodash";
import uuid from "uuid/v4";

export interface CompetitorProps {
  [key: string]: any;
  type: string;
  spotifyId: string;
  track?: Track;
}

export interface CompetitorProperties extends CompetitorProps {
  id: string;
  imageUrl: string;
  spotifyId: string;
  type: string;
  model: Track | null;
}

export class Competitor extends BaseModel implements CompetitorProperties {
  [key: string]: any;
  id: string;
  imageUrl: string;
  spotifyId: string;
  type: string;
  model: Track | null;
  constructor(props: CompetitorProps) {
    const id = uuid();
    super({ id });
    this.id = id;
    this.type = props.type;
    this.spotifyId = props.spotifyId;
    if (props.type === "track" && props.track) {
      this.model = new Track(props.track as TrackProperties);
      const images = _get(props, "track.album.images", []);
      this.imageUrl = images.reduce(
        (memo: any, curr: { width: number; height: number; url: string }) => {
          if (!memo || curr.width < memo.width) {
            return curr;
          }
          return memo;
        },
        ""
      );
    } else {
      console.error("This case not handled yet");
      this.model = null;
      this.imageUrl = "";
    }
  }
}

export default Competitor;
