import { BaseModel } from "./BaseModel";
import { Competitor } from "./Competitor";
import { without } from "lodash";

export interface BracketProps {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
}

export class Bracket extends BaseModel {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
  constructor(props: BracketProps) {
    super(props);
    this.id = props.id;
    this.competitors = props.competitors;
    this.name = props.name;
    this.description = props.description;
    this.creator = props.creator;
  }

  addCompetitor(c: Competitor) {
    this.competitors = this.competitors.concat(c);
  }

  removeCompetitor(c: Competitor) {
    this.competitors = without(this.competitors, c);
  }
}

export default Bracket;
