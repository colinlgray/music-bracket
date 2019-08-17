import { Competitor } from "./Competitor";

export type CreationStates = "created" | "started" | "seeding";

export interface Bracket {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
  creationState: CreationStates;
}

export default Bracket;
