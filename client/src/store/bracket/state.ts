import { Bracket, CreationStates, bracketStates } from "../../types";

export interface IState {
  currentBracket: Bracket;
  isLoadingBracket: boolean;
}

export const initialState = {
  currentBracket: {
    id: "",
    name: "loading",
    description: "",
    creationState: bracketStates.initial as CreationStates,
    creator: "",
    competitors: []
  },
  isLoadingBracket: false
};
