import {
  SearchSpotifyAction,
  SetSearchingAction,
  SearchRequest,
  SEARCH_SPOTIFY,
  SET_SEARCHING
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Track } from "../../models";

// TODO: Move this into its own folder
const searchSpotify = (request: SearchRequest) => {
  return fetch(
    `/api/tracks/search?query=${encodeURI(request.query)}&limit=${
      request.limit
    }&offset=${request.offset}`
  )
    .then(res => res.json())
    .then(response => {
      // this.setState({
      //   loading: false
      // });
      return {
        response: response.items.map(
          (serverResponse: any) => new Track(serverResponse)
        ),
        totalResults: response.total
      };
    })
    .catch(err => {
      console.error(err);
      // this.setState({ loading: false, searchError: err });
    });
};

//

export const setSearching = (isSearching: boolean): SetSearchingAction => {
  return { type: SET_SEARCHING, payload: isSearching };
};

export const SearchSpotify = (
  request: SearchRequest
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setSearching(true));
      searchSpotify(request)
        .then(results => {
          dispatch(setSearching(false));
          console.log("results", results);
          // dispatch(setResults);
        })
        .catch((e: Error) => {
          dispatch(setSearching(false));
          reject(e);
        });
    });
  };
};
