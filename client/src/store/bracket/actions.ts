import { Bracket, Competitor } from "../../models";
import {
  SetBracketAction,
  SetFetchingBracketAction,
  RemoveCompetitorAction,
  AddCompetitorAction,
  SET_BRACKET,
  ADD_COMPETITOR,
  REMOVE_COMPETITOR,
  SET_FETCHING_BRACKET
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const setBracket = (bracket: Bracket): SetBracketAction => {
  return { type: SET_BRACKET, payload: bracket };
};

export const addCompetitor = (
  competitor: Competitor,
  bracket: Bracket
): AddCompetitorAction => {
  // TODO: This needs to be a redux action
  competitor.bracketId = bracket.id;
  competitor.save();
  return { type: ADD_COMPETITOR, payload: competitor };
};

export const removeCompetitor = (
  competitor: Competitor
): RemoveCompetitorAction => {
  // TODO: This needs to be a redux action
  competitor.bracketId = null;
  competitor.save();
  return { type: REMOVE_COMPETITOR, payload: competitor };
};
export const setFetching = (setFetching: boolean): SetFetchingBracketAction => {
  return { type: SET_FETCHING_BRACKET, payload: setFetching };
};

export const getBracket = (
  id?: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setFetching(true));
      Bracket.fetchOrCreate(id)
        .then(bracket => {
          dispatch(setBracket(bracket as Bracket));
          dispatch(setFetching(false));
        })
        .catch((e: Error) => {
          dispatch(setFetching(false));
          reject(e);
        });
    });
  };
};