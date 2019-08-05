import { Bracket } from "../models";

export const GET_BRACKETS = "GET_BRACKETS";
export const SET_BRACKETS = "SET_BRACKETS";
export const SET_FETCHING_BRACKETS = "SET_FETCHING_BRACKETS";

export interface SetBracketsAction {
  type: "SET_BRACKETS";
  payload: Array<Bracket>;
}
export interface SetFetchingBrackets {
  type: "SET_FETCHING_BRACKETS";
  payload: boolean;
}

export type Action = SetBracketsAction | SetFetchingBrackets;
