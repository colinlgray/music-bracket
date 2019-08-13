import { SystemState, initialState } from "./state";
import {
  SystemAction,
  SET_SEARCHING,
  SET_SEARCH_RESULTS,
  ADD_SEARCH_RESULT,
  SET_SAVING_MODEL,
  REMOVE_FROM_SEARCH_RESULTS,
  REORDER_SEARCH_RESULTS
} from "./types";
import { without } from "lodash";
import { reorder } from "../../utils/reorder";

export function systemReducer(
  state: SystemState = initialState,
  action: SystemAction
): SystemState {
  switch (action.type) {
    case REORDER_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: reorder(
          state.searchResults,
          action.payload.startIndex,
          action.payload.endIndex
        )
      };
    case SET_SAVING_MODEL:
      console.log("TODO: set ", action.model, "", action.isSaving);
      return state;
    case SET_SEARCHING:
      return { ...state, isSearching: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case ADD_SEARCH_RESULT:
      let clone = state.searchResults.slice();
      clone.splice(action.index, 0, action.payload);
      return {
        ...state,
        searchResults: clone
      };

    case REMOVE_FROM_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: without(state.searchResults, action.payload)
      };
    default:
      return state;
  }
}
