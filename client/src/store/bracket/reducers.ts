import { IState, initialState } from "./state";
import {
  Action,
  SET_BRACKET,
  SET_FETCHING_BRACKET,
  REMOVE_COMPETITOR,
  ADD_COMPETITOR
} from "./types";

// addCompetitor(c: Competitor) {
//   this.competitors = this.competitors.concat(c);
//   c.bracketId = this.id;
//   c.save();
// }

// removeCompetitor(c: Competitor) {
//   this.competitors = without(this.competitors, c);
//   c.bracketId = null;
//   c.save();
// }

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
      console.log("not implemented");
      return state;
    case ADD_COMPETITOR:
      console.log("not implemented");
      return state;
    default:
      return state;
  }
}
