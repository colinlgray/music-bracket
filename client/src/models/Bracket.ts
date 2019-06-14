import { BaseModel } from "./BaseModel";
import { Competitor } from "./Competitor";
import { without } from "lodash";
import uuid from "uuid/v4";

export interface BracketProperties {
  [key: string]: any;
}

export class Bracket extends BaseModel {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
  constructor(id?: string) {
    super(id);
    this.id = id || uuid();
    this.competitors = [];
    this.name = "";
    this.description = "";
    this.creator = "";
  }

  addCompetitor(c: Competitor) {
    this.competitors = this.competitors.concat(c);
  }

  removeCompetitor(c: Competitor) {
    this.competitors = without(this.competitors, c);
  }
}

export default Bracket;
