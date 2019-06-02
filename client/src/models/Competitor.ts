import { Track } from "./Track";
import { BaseModel } from "./BaseModel";

export interface CompetitorProperties {
  [key: string]: any;
  track: Track;
  id: string;
}

export function isTrack(props: Track | CompetitorProperties): props is Track {
  return (<Track>props).save !== undefined;
}

export class Competitor extends BaseModel {
  [key: string]: any;
  constructor(props: Track | CompetitorProperties) {
    super();
    if (isTrack(props)) {
      this.track = props;
    } else {
      for (let key in props) {
        this[key] = props[key];
      }
    }
  }

  save(): void {
    console.log("Would save the model here");
  }
}

export default Competitor;
