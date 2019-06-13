import { BaseModel } from "./BaseModel";
import { Competitor } from "./Competitor";
import { without } from "lodash";
import uuid from "uuid/v4";
import { get, post, put } from "../utils/http";

export interface BracketProperties {
  [key: string]: any;
}

export class Bracket {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
  constructor(id?: string) {
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

  async save() {
    return await put("/api/brackets", JSON.parse(JSON.stringify(this)));
  }
}

export default Bracket;
