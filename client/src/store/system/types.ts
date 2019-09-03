import { Competitor } from "../../types";

export const SEARCH_SPOTIFY = "SEARCH_SPOTIFY";
export const SET_SEARCHING = "SET_SEARCHING";
export const SET_SAVING_MODEL = "SET_SAVING_MODEL";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
export const REORDER_SEARCH_RESULTS = "REORDER_SEARCH_RESULTS";
export const REMOVE_FROM_SEARCH_RESULTS = "REMOVE_FROM_SEARCH_RESULTS";

export type SearchRequest = {
  query: string;
  limit: number;
  offset: number;
};

export type SearchResults = {
  items: Array<Competitor>;
  totalResults: number;
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
  payload: SearchResults;
}
export interface AddSearchResultAction {
  type: "ADD_SEARCH_RESULT";
  payload: Competitor;
  index: number;
}
export interface RemoveFromSearchResultsAction {
  type: "REMOVE_FROM_SEARCH_RESULTS";
  payload: Competitor;
}
export interface ReorderSearchResultsAction {
  type: "REORDER_SEARCH_RESULTS";
  payload: ReorderSearchResultsParams;
}
export interface ReorderSearchResultsParams {
  list?: Array<any>;
  startIndex: number;
  endIndex: number;
}

export type SystemAction =
  | SearchSpotifyAction
  | SetSearchResultsAction
  | AddSearchResultAction
  | RemoveFromSearchResultsAction
  | ReorderSearchResultsAction
  | SetSearchingAction;
