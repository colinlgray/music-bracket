import { Bracket, CreationStates } from "../../types";

export interface IState {
  currentBracket: Bracket;
  isLoadingBracket: boolean;
}

export const initialState = {
  currentBracket: {
    id: "",
    name: "loading",
    description: "",
    creationState: "created" as CreationStates,
    creator: "",
    competitors: []
  },
  isLoadingBracket: false
};
