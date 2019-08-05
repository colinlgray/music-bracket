import { Bracket } from "../../models";
import { SetBracketAction, SetFetchingBracket } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const setBracket = (bracket: Bracket): SetBracketAction => {
  return { type: "SET_BRACKET", payload: bracket };
};

export const isFetching = (isFetching: boolean): SetFetchingBracket => {
  return { type: "SET_FETCHING_BRACKET", payload: isFetching };
};

export const getBracket = (
  id?: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(isFetching(true));
      Bracket.fetchOrCreate(id)
        .then(bracket => {
          dispatch(setBracket(bracket as Bracket));
          dispatch(isFetching(false));
        })
        .catch((e: Error) => {
          dispatch(isFetching(false));
          reject(e);
        });
    });
  };
};
