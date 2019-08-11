import { Competitor } from "../../models";

export const SEARCH_SPOTIFY = "SEARCH_SPOTIFY";
export const SET_SEARCHING = "SET_SEARCHING";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const REMOVE_FROM_SEARCH_RESULTS = "REMOVE_FROM_SEARCH_RESULTS";

export type SearchRequest = {
  query: string;
  limit: number;
  offset: number;
};

export interface SearchSpotifyAction {
  type: "SEARCH_SPOTIFY";
  payload: SearchRequest;
}
export interface SetSearchingAction {
  type: "SET_SEARCHING";
  payload: boolean;
}
export interface SetSearchResultsAction {
  type: "SET_SEARCH_RESULTS";
  payload: Array<Competitor>;
}
export interface RemoveFromSearchResultsAction {
  type: "REMOVE_FROM_SEARCH_RESULTS";
  payload: Competitor;
}
export type SystemAction =
  | SearchSpotifyAction
  | SetSearchResultsAction
  | RemoveFromSearchResultsAction
  | SetSearchingAction;
