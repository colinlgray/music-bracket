import { Track, TrackProperties } from "./Track";
import { get } from "../utils/http";
import { BaseModel } from "./BaseModel";
import { get as _get } from "lodash";
import uuid from "uuid/v4";
import { omit } from "lodash";

export interface CompetitorProps {
  [key: string]: any;
  type: string;
  spotifyId: string;
  track?: Track;
  id?: string;
  index: number;
}

export interface CompetitorProperties extends CompetitorProps {
  id: string;
  imageUrl: string;
  spotifyId: string;
  type: string;
  model: Track | null;
  roundsWon: number;
  bracketId: string | null;
}

export function isTrack(props: Track | CompetitorProps): props is Track {
  return (props as Track).save !== undefined;
}

export class Competitor extends BaseModel implements CompetitorProperties {
  [key: string]: any;
  id: string;
  imageUrl: string;
  spotifyId: string;
  type: string;
  model: Track | null;
  roundsWon: number;
  index: number;
  bracketId: string | null;
  constructor(props: CompetitorProps) {
    let id = null;
    if (props.id) {
      id = props.id;
    } else {
      id = uuid();
    }
    super({ id });
    this.id = id;
    this.type = props.type;
    this.spotifyId = props.spotifyId;
    this.roundsWon = 0;
    this.index = props.index;
    this.bracketId = null;
    if (props.type === "track" && props.track) {
      this.model = props.track;
      const images = _get(props, "track.album.images", []);
      this.imageUrl = images.reduce(
        (memo: any, curr: { width: number; height: number; url: string }) => {
          if (!memo || curr.width < memo.width) {
            return curr.url;
          }
          return memo;
        },
        ""
      );
    } else {
      this.model = null;
      this.imageUrl = "";
      console.error("Did not receive correct model data");
    }
  }

  get dbProps() {
    return omit(this, ["model"]);
  }
}

export default Competitor;
