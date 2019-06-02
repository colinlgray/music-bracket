import { BaseModel } from "./BaseModel";
import { Competitor } from "./Competitor";
import { without } from "lodash";

export interface BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
}

export class Bracket extends BaseModel {
  [key: string]: any;
  constructor(props: BracketProperties) {
    super();
    for (let key in props) {
      this[key] = props[key];
    }
  }

  addCompetitor(c: Competitor) {
    this.competitors = this.competitors.concat(c);
  }

  removeCompetitor(c: Competitor) {
    this.competitors = without(this.competitors, c);
  }

async fetchOrCreate(id?: string) {
  if (!id) {
    return this.create();
  }
  const { parsedBody } = await get(`/api/brackets/${id}`);
  return new Bracket(parsedBody);
}

export async function createBracket() {
  const { parsedBody } = await post("/api/brackets", {});
  return new Bracket(parsedBody);
}

}

export default Bracket;
