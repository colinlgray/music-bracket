import { IState, initialState } from "./state";
import { Action, SET_BRACKET, SET_FETCHING_BRACKET } from "./types";

export function bracketReducer(
  state: IState = initialState,
  action: Action
): IState {
  switch (action.type) {
    case SET_BRACKET:
      return { ...state, currentBracket: action.payload };
    case SET_FETCHING_BRACKET:
      return { ...state, isLoadingBracket: action.payload };
    default:
      return state;
  }
}
