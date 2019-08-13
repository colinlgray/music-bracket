import { without } from "lodash";
import { IState, initialState } from "./state";
import {
  BracketAction,
  SET_BRACKET,
  SET_FETCHING_BRACKET,
  REMOVE_COMPETITOR,
  REORDER_COMPETITORS,
  ADD_COMPETITOR
} from "./types";
import { Bracket } from "../../models";
import { reorder } from "../../utils/reorder";

// TODO: These should not inststantiate Brackets
export function bracketReducer(
  state: IState = initialState,
  action: BracketAction
): IState {
  switch (action.type) {
    case SET_BRACKET:
      return { ...state, currentBracket: action.payload };
    case SET_FETCHING_BRACKET:
      return { ...state, isLoadingBracket: action.payload };
    case REMOVE_COMPETITOR:
      return {
        ...state,
        currentBracket: new Bracket({
          ...state.currentBracket,
          competitors: without(state.currentBracket.competitors, action.payload)
        })
      };
    case REORDER_COMPETITORS:
      return {
        ...state,
        currentBracket: new Bracket({
          ...state.currentBracket,
          competitors: reorder(
            state.currentBracket.competitors,
            action.startIndex,
            action.endIndex
          )
        })
      };
    case ADD_COMPETITOR:
      let clone = state.currentBracket.competitors.slice();
      clone.splice(action.index, 0, action.payload);
      return {
        ...state,
        currentBracket: new Bracket({
          ...state.currentBracket,
          competitors: clone
        })
      };

    default:
      return state;
  }
}
