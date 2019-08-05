import { IState, initialState } from "./state";
import { Action, SET_BRACKETS, SET_FETCHING_BRACKETS } from "./types";

export function bracketsReducer(
  state: IState = initialState,
  action: Action
): IState {
  switch (action.type) {
    case SET_BRACKETS:
      return { ...state, existingBrackets: action.payload };
    case SET_FETCHING_BRACKETS:
      return { ...state, isLoadingBrackets: action.payload };
    default:
      return state;
  }
}
