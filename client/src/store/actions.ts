import { Bracket } from "../models";
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
    return new Promise<void>(resolve => {
      dispatch(isFetching(true));
      console.log("Going to get brackets");
      setTimeout(() => {
        dispatch(setExistingBrackets([]));
        setTimeout(() => {
          dispatch(isFetching(false));
          console.log("Done mocking async");
          resolve();
        }, 1000);
      }, 1000);
    });
  };
};
