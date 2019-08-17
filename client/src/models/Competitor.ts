import { Track } from "./Track";
import { BaseModel } from "./BaseModel";
import uuid from "uuid/v4";

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
  spotifyId: string;
  type: string;
  spotifyData: Track | null;
  roundsWon: number;
  bracketId: string | null;
}

export class Competitor extends BaseModel implements CompetitorProperties {
  [key: string]: any;
  id: string;
  spotifyId: string;
  type: string;
  spotifyData: Track | null;
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
    this.bracketId = props.bracketId;
    if (props.spotifyData) {
      this.spotifyData = props.spotifyData;
    } else {
      this.spotifyData = null;
    }
  }
}

export default Competitor;
