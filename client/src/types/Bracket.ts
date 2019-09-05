import { Competitor } from "./Competitor";

export type CreationStates = "initial" | "created" | "started" | "seeding";

export const bracketStates = {
  created: "created",
  started: "started",
  seeding: "seeding",
  initial: "initial"
};

export interface Bracket {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
  competitors: Array<Competitor>;
  creationState: CreationStates;
}
