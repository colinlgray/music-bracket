import { Competitor } from "./Competitor";
import { without } from "lodash";

export interface BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  Competitors: Array<Competitor>;
}

export class Bracket {
  [key: string]: any;
  constructor(props: BracketProperties) {
    for (let key in props) {
      this[key] = props[key];
    }
  }

  save(): void {
    console.log("Would save the model here");
  }

  addCompetitor(c: Competitor) {
    this.Competitors = this.Competitors.concat(c);
  }

  removeCompetitor(c: Competitor) {
    this.Competitors = without(this.Competitors, c);
  }
}

export default Bracket;
