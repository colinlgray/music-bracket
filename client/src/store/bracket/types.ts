import { Bracket, Competitor } from "../../models";

export const GET_BRACKET = "GET_BRACKET";
export const SET_BRACKET = "SET_BRACKET";
export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const REMOVE_COMPETITOR = "REMOVE_COMPETITOR";
export const SET_FETCHING_BRACKET = "SET_FETCHING_BRACKET";

export interface SetBracketAction {
  type: "SET_BRACKET";
  payload: Bracket;
}
export interface SetFetchingBracketAction {
  type: "SET_FETCHING_BRACKET";
  payload: boolean;
}
export interface AddCompetitorAction {
  type: "ADD_COMPETITOR";
  payload: { competitor: Competitor; index: number };
}
export interface RemoveCompetitorAction {
  type: "REMOVE_COMPETITOR";
  payload: Competitor;
}

export type Action =
  | SetBracketAction
  | SetFetchingBracketAction
  | AddCompetitorAction
  | RemoveCompetitorAction;
