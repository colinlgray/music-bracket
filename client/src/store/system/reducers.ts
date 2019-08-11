import { SystemState, initialState } from "./state";
import {
  SystemAction,
  SET_SEARCHING,
  SET_SEARCH_RESULTS,
  REMOVE_FROM_SEARCH_RESULTS
} from "./types";
import { without } from "lodash";

export function systemReducer(
  state: SystemState = initialState,
  action: SystemAction
): SystemState {
  switch (action.type) {
    case SET_SEARCHING:
      return { ...state, isSearching: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case REMOVE_FROM_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: without(state.searchResults, action.payload)
      };
    default:
      return state;
  }
}
