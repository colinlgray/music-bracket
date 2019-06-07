import { BaseModel } from "./BaseModel";
import { Competitor } from "./Competitor";
import { without } from "lodash";
import { get, post, staticDecorator } from "../utils/request";

export interface BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
}

const defaultProps = {
  competitors: []
};

@staticDecorator<BaseModel>()
export class Bracket {
  [key: string]: any;
  constructor(props: BracketProperties) {
    Object.assign(this, defaultProps, props);
  }

  addCompetitor(c: Competitor) {
    this.competitors = this.competitors.concat(c);
  }

  removeCompetitor(c: Competitor) {
    this.competitors = without(this.competitors, c);
  }

  static async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(`/api/brackets/${id}`);
    return new Bracket(parsedBody);
  }

  static async create() {
    const { parsedBody } = await post("/api/brackets", {});
    return new Bracket(parsedBody);
  }

  static async save() {
    throw new Error("not implemented");
  }
}

export default Bracket;
