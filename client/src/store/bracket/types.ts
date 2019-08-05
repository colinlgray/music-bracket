import { Bracket } from "../../models";

export const GET_BRACKET = "GET_BRACKET";
export const SET_BRACKET = "SET_BRACKET";
export const SET_FETCHING_BRACKET = "SET_FETCHING_BRACKET";

export interface SetBracketAction {
  type: "SET_BRACKET";
  payload: Bracket;
}
export interface SetFetchingBracket {
  type: "SET_FETCHING_BRACKET";
  payload: boolean;
}

export type Action = SetBracketAction | SetFetchingBracket;
