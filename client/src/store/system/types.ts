export const SEARCH_SPOTIFY = "SEARCH_SPOTIFY";
export const SET_SEARCHING = "SET_SEARCHING";

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

export type SystemAction = SearchSpotifyAction;
