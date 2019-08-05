import { Bracket } from "../../models";

export interface IState {
  currentBracket: null | Bracket;
  isLoadingBracket: boolean;
}

export const initialState = {
  currentBracket: null,
  isLoadingBracket: false
};
