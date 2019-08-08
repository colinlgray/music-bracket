import { BaseModel } from "./BaseModel";
import { put } from "../utils/http";
import { Competitor, CompetitorProperties } from "./Competitor";
import { map, forEach, sortBy } from "lodash";

export type CreationStates = "created" | "started" | "seeding";

export interface BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<CompetitorProperties>;
  creationState: CreationStates;
}

export class Bracket extends BaseModel implements BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  creationState: CreationStates;
  competitors: Array<Competitor>;
  constructor(props: BracketProperties) {
    super(props);
    this.creationState = props.creationState;
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.creator = props.creator;
    this.competitors = map(props.competitors, c => new Competitor(c));
  }

  updateIndices(list: Array<Competitor>, startIndex: number, endIndex: number) {
    this.competitors = list;
    let start = startIndex;
    let end = endIndex;
    if (start > end) {
      let tmp = start;
      start = end;
      end = tmp;
    }
    for (let index = start; index <= end; index++) {
      this.competitors[index].index = index;
      this.competitors[index].save();
    }
  }

  sortBy(value: string) {
    if (value === "popularity") {
      sortBy(this.competitors, [c => (c.model ? c.model.popularity : -1)]);
      forEach(this.competitors, c => c.save());
    }
  }

  get dbProps() {
    let dbProps: { [index: string]: {} } = {};
    Object.keys(this).forEach(key => {
      dbProps[key] = this[key];
    });
    dbProps.competitors = map(this.competitors, c => c.id);
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
