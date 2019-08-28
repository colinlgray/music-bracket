import { Bracket } from "../../types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get } from "lodash";
import { query } from "../../api/graphql";
import { SetBracketsAction, SetFetchingBracketsAction } from "./types";
import { bracketStates } from "../../types";

async function fetchStartedBrackets() {
  const result = await query(
    `
      {
        getBrackets(creationState: "${bracketStates.started}") {
          id
          name
        }
      }
    `
  );
  return get(result, "data.getBrackets");
}

export const setExistingBrackets = (
  existingBrackets: Array<Bracket>
): SetBracketsAction => {
  return { type: "SET_BRACKETS", payload: existingBrackets };
};

export const setFetching = (
  setFetching: boolean
): SetFetchingBracketsAction => {
  return { type: "SET_FETCHING_BRACKETS", payload: setFetching };
};

export const getBrackets = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setFetching(true));
      fetchStartedBrackets()
        .then(brackets => {
          dispatch(setExistingBrackets(brackets as Array<Bracket>));
          dispatch(setFetching(false));
        })
        .catch((e: Error) => {
          dispatch(setFetching(false));
          reject(e);
        });
    });
  };
};
