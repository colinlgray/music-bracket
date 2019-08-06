import { Bracket } from "../../models";

export interface IState {
  currentBracket: Bracket;
  isLoadingBracket: boolean;
}

export const initialState = {
  currentBracket: new Bracket({
    id: "",
    name: "loading",
    description: "",
    creationState: "created",
    creator: "",
    competitors: []
  }),
  isLoadingBracket: false
};
