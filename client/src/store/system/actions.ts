import {
  SearchSpotifyAction,
  SetSearchResultsAction,
  SetSearchingAction,
  SearchRequest,
  SEARCH_SPOTIFY,
  SET_SEARCH_RESULTS,
  SET_SEARCHING
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Track, Competitor } from "../../models";

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
      const items = response.items.map((serverResponse: any) => {
        const t = new Track(serverResponse);
        return new Competitor({
          index: -1,
          type: "track",
          spotifyId: t.id,
          model: t,
          id: uuid()
        });
      });

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
  results: Array<Competitor>
): SetSearchResultsAction => {
  return { type: SET_SEARCH_RESULTS, payload: results };
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
          dispatch(setSearchResults(results.items));
        })
        .catch((e: Error) => {
          dispatch(setSearching(false));
          reject(e);
        });
    });
  };
};
