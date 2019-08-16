import { BaseModel } from "./BaseModel";
import { Competitor, CompetitorProperties } from "./Competitor";
import { map } from "lodash";

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
}

export default Bracket;
