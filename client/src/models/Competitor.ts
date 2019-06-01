import { Track } from "./Track";

export interface CompetitorProperties {
  [key: string]: any;
  track: Track;
  id: string;
}

export class Competitor {
  [key: string]: any;
  constructor(props: CompetitorProperties) {
    for (let key in props) {
      this[key] = props[key];
    }
  }

  save(): void {
    console.log("Would save the model here");
  }
}

export default Competitor;
