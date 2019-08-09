import { without, sortBy } from "lodash";
import { IState, initialState } from "./state";
import {
  Action,
  SET_BRACKET,
  SET_FETCHING_BRACKET,
  REMOVE_COMPETITOR,
  ADD_COMPETITOR
} from "./types";
import { Bracket } from "../../models";

export function bracketReducer(
  state: IState = initialState,
  action: Action
): IState {
  switch (action.type) {
    case SET_BRACKET:
      return { ...state, currentBracket: action.payload };
    case SET_FETCHING_BRACKET:
      return { ...state, isLoadingBracket: action.payload };
    case REMOVE_COMPETITOR:
      const competitors = without(
        state.currentBracket.competitors,
        action.payload
      );
      return {
        ...state,
        currentBracket: new Bracket({ ...state.currentBracket, competitors })
      };
    case ADD_COMPETITOR:
      return {
        ...state,
        currentBracket: new Bracket({
          ...state.currentBracket,
          competitors: sortBy(
            state.currentBracket.competitors.concat(action.payload),
            ["index"]
          )
        })
      };

    default:
      return state;
  }
}
