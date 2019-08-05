export const GET_BRACKETS = "GET_BRACKETS";
import { Bracket } from "../models";

export interface SetBracketsAction {
  type: "SET_BRACKETS";
  existingBrackets: Array<Bracket>;
}
export interface SetFetchingBrackets {
  type: "SET_FETCHING_BRACKETS";
  isFetching: boolean;
}

export type Action = SetBracketsAction | SetFetchingBrackets;
