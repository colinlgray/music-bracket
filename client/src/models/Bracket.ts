import { BaseModel } from "./BaseModel";
import { put } from "../utils/http";
import { Competitor } from "./Competitor";
import { map, without } from "lodash";

export interface BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
}

export class Bracket extends BaseModel implements BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
  constructor(props: BracketProperties) {
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

  get dbProps() {
    let dbProps: { [index: string]: {} } = {};
    Object.keys(this).forEach(key => {
      dbProps[key] = this[key];
    });
    dbProps.competitors = map(this.competitors, c => c.dbProps);
    return dbProps;
  }

  async save() {
    return await put(
      `/api/${BaseModel.asUrl(this.constructor.name)}/${encodeURI(this.id)}`,
      this.dbProps
    );
  }
}

export default Bracket;
