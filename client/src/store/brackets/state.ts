import { Bracket } from "../../types";

export interface IState {
  existingBrackets: Array<Bracket>;
  isLoadingBrackets: boolean;
}

export const initialState = {
  existingBrackets: [],
  isLoadingBrackets: false
};
