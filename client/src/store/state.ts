import { Bracket } from "../models";

export interface IState {
  existingBrackets: Array<Bracket>;
  hasLoadedBrackets: boolean;
  isLoadingBrackets: boolean;
}

export const initialState = {
  existingBrackets: [],
  hasLoadedBrackets: false,
  isLoadingBrackets: false
};
