import {
  RemoveFromSearchResultsAction,
  ReorderSearchResultsAction,
  AddSearchResultAction,
  SetSearchResultsAction,
  SetSearchingAction,
  SearchRequest,
  SearchResults,
  ReorderSearchResultsParams,
  REMOVE_FROM_SEARCH_RESULTS,
  REORDER_SEARCH_RESULTS,
  ADD_SEARCH_RESULT,
  SET_SEARCH_RESULTS,
  SET_SEARCHING
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Competitor } from "../../types";

import uuid from "uuid/v4";
// TODO: Move this into its own folder
const fetchSpotify = (request: SearchRequest) => {
  return fetch(
    `/api/tracks/search?query=${encodeURI(request.query)}&limit=${
      request.limit
    }&offset=${request.offset}`
  )
    .then(res => res.json())
    .then(response => {
      const items: Array<Competitor> = response.items.map(
        (serverResponse: any) => {
          return {
            index: -1,
            type: "track",
            spotifyId: serverResponse.id,
            spotifyData: serverResponse,
            id: uuid()
          } as Competitor;
        }
      );

      const results = {
        items,
        totalResults: response.total
      };

      return results;
    });
};

export const setSearching = (isSearching: boolean): SetSearchingAction => {
  return { type: SET_SEARCHING, payload: isSearching };
};

export const setSearchResults = (
  response: SearchResults
): SetSearchResultsAction => {
  return { type: SET_SEARCH_RESULTS, payload: response };
};
export const addSearchResult = (
  payload: Competitor,
  index: number
): AddSearchResultAction => {
  return { type: ADD_SEARCH_RESULT, payload, index };
};
export const removeFromSearchResults = (
  competitor: Competitor
): RemoveFromSearchResultsAction => {
  return { type: REMOVE_FROM_SEARCH_RESULTS, payload: competitor };
};

export const reorderSearchResults = (
  params: ReorderSearchResultsParams
): ReorderSearchResultsAction => {
  return { type: REORDER_SEARCH_RESULTS, payload: params };
};

export const searchSpotify = (
  request: SearchRequest
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setSearching(true));
      fetchSpotify(request)
        .then(results => {
          dispatch(setSearching(false));
          dispatch(setSearchResults(results));
        })
        .catch((e: Error) => {
          dispatch(setSearching(false));
          reject(e);
        });
    });
  };
};
