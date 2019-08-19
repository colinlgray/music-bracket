import { without, map } from "lodash";
import { IState, initialState } from "./state";
import {
  BracketAction,
  SET_BRACKET,
  SET_FETCHING_BRACKET,
  REMOVE_COMPETITOR,
  REORDER_COMPETITORS,
  ADD_COMPETITOR,
  SET_SAVING_COMPETITOR
} from "./types";
import { Competitor } from "../../types";
import { reorder } from "../../utils/reorder";

const updateIndices = (c: Competitor, i: number) => {
  c.index = i;
  return c;
};

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
        currentBracket: {
          ...state.currentBracket,
          competitors: map(
            without(state.currentBracket.competitors, action.payload),
            updateIndices
          )
        }
      };
    case REORDER_COMPETITORS:
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          competitors: reorder(
            state.currentBracket.competitors,
            action.startIndex,
            action.endIndex
          ).map(updateIndices)
        }
      };
    case ADD_COMPETITOR:
      let clone = state.currentBracket.competitors.slice();
      map(
        clone.splice(action.index, 0, {
          ...action.payload,
          bracketId: state.currentBracket.id
        }),
        updateIndices
      );
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          competitors: map(clone, updateIndices)
        }
      };
    case SET_SAVING_COMPETITOR:
      // TODO: set value on model
      return state;
    default:
      return state;
  }
}
