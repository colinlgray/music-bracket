import { Bracket } from "../models";

export interface IState {
  existingBrackets: Array<Bracket>;
  hasLoadedBrackets: boolean;
}

export const initialState = {
  existingBrackets: [],
  hasLoadedBrackets: false
};
