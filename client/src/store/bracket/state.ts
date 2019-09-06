import { Bracket, CreationStates, bracketStates } from "../../types";

export interface IState {
  currentBracket: Bracket;
  isLoadingBracket: boolean;
}

export const initialState = {
  currentBracket: {
    id: "",
    name: "",
    description: "",
    creationState: bracketStates.initial as CreationStates,
    creator: "",
    competitors: [],
    challongeUrl: null
  },
  isLoadingBracket: false
};
