import { Bracket } from "../models";

export interface IState {
  existingBrackets: Array<Bracket>;
  isLoadingBrackets: boolean;
}

export const initialState = {
  existingBrackets: [],
  isLoadingBrackets: false
};
