import { Bracket } from "../../models";
import { SetBracketsAction, SetFetchingBrackets } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const setExistingBrackets = (
  existingBrackets: Array<Bracket>
): SetBracketsAction => {
  return { type: "SET_BRACKETS", payload: existingBrackets };
};

export const isFetching = (isFetching: boolean): SetFetchingBrackets => {
  return { type: "SET_FETCHING_BRACKETS", payload: isFetching };
};

export const getBrackets = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(isFetching(true));
      Bracket.fetchAll()
        .then(brackets => {
          dispatch(setExistingBrackets(brackets as Array<Bracket>));
          dispatch(isFetching(false));
        })
        .catch((e: Error) => {
          dispatch(isFetching(false));
          reject(e);
        });
    });
  };
};
