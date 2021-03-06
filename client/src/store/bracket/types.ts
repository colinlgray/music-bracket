import { Bracket, Competitor } from "../../types";

export const UPDATE_BRACKET = "UPDATE_BRACKET";
export const GET_BRACKET = "GET_BRACKET";
export const SET_BRACKET = "SET_BRACKET";
export const ADD_COMPETITOR = "ADD_COMPETITOR";
export const SET_COMPETITORS = "SET_COMPETITORS";
export const REMOVE_COMPETITOR = "REMOVE_COMPETITOR";
export const REORDER_COMPETITORS = "REORDER_COMPETITORS";
export const SET_FETCHING_BRACKET = "SET_FETCHING_BRACKET";

export interface SetCompetitorsAction {
  type: "SET_COMPETITORS";
  payload: Array<Competitor>;
}
export interface SetBracketAction {
  type: "SET_BRACKET";
  payload: Bracket;
}
export interface UpdateBracketAction {
  type: "UPDATE_BRACKET";
  payload: any;
}
export interface SetFetchingBracketAction {
  type: "SET_FETCHING_BRACKET";
  payload: boolean;
}
export interface AddCompetitorAction {
  type: "ADD_COMPETITOR";
  payload: Competitor;
  index: number;
}
export interface RemoveCompetitorAction {
  type: "REMOVE_COMPETITOR";
  payload: Competitor;
}
export interface ReorderCompetitorsAction {
  type: "REORDER_COMPETITORS";
  startIndex: number;
  endIndex: number;
}

export type BracketAction =
  | UpdateBracketAction
  | SetCompetitorsAction
  | SetBracketAction
  | SetFetchingBracketAction
  | AddCompetitorAction
  | ReorderCompetitorsAction
  | RemoveCompetitorAction;
