import { Bracket, Competitor } from "../../types";
import {
  SetBracketAction,
  SetFetchingBracketAction,
  RemoveCompetitorAction,
  AddCompetitorAction,
  ReorderCompetitorsAction,
  SetSavingCompetitorAction,
  SET_BRACKET,
  ADD_COMPETITOR,
  REMOVE_COMPETITOR,
  REORDER_COMPETITORS,
  SET_SAVING_COMPETITOR,
  SET_FETCHING_BRACKET
} from "./types";
import { ReorderSearchResultsParams } from "../system/types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { sortBy } from "lodash";
import { fetchOrCreate, save } from "../../api";
import { ModelNames } from "../../types";

export const setBracket = (bracket: Bracket): SetBracketAction => {
  bracket.competitors = sortBy(bracket.competitors, ["index"]);
  return { type: SET_BRACKET, payload: bracket };
};

// TODO:
// These need to be thunks that dispatch multiple actions
// Use graphQL for purely remote things like removing/adding bracketId
// Need to save these models and need a better system for remote communication
// Look into apollo starter kit before more
export const addCompetitor = (
  competitor: Competitor,
  index: number
): AddCompetitorAction => {
  return { type: ADD_COMPETITOR, payload: competitor, index };
};

export const removeCompetitor = (
  competitor: Competitor
): RemoveCompetitorAction => {
  return { type: REMOVE_COMPETITOR, payload: competitor };
};

export const saveCompetitor = (
  competitor: Competitor
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(
        setSavingCompetitor({ index: competitor.index, isSaving: true })
      );
      save(ModelNames.Competitor, competitor)
        .then(() => {
          dispatch(
            setSavingCompetitor({ index: competitor.index, isSaving: false })
          );
          resolve();
        })
        .catch((e: Error) => {
          dispatch(
            setSavingCompetitor({ index: competitor.index, isSaving: false })
          );
          reject(e);
        });
    });
  };
};

export const setSavingCompetitor = (params: {
  index: number;
  isSaving: boolean;
}): SetSavingCompetitorAction => {
  return { type: SET_SAVING_COMPETITOR, ...params };
};

export const setFetching = (setFetching: boolean): SetFetchingBracketAction => {
  return { type: SET_FETCHING_BRACKET, payload: setFetching };
};

export const saveChangedCompetitors = (
  params: ReorderSearchResultsParams
): ReorderCompetitorsAction => {
  return {
    type: REORDER_COMPETITORS,
    startIndex: params.startIndex,
    endIndex: params.endIndex
  };
};
export const reorderCompetitorsArray = (
  params: ReorderSearchResultsParams
): ReorderCompetitorsAction => {
  return {
    type: REORDER_COMPETITORS,
    startIndex: params.startIndex,
    endIndex: params.endIndex
  };
};

export const reorderCompetitors = (
  params: ReorderSearchResultsParams & { competitors: Array<Competitor> }
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(
        reorderCompetitorsArray({
          startIndex: params.startIndex,
          endIndex: params.endIndex
        })
      );
      let start = params.startIndex;
      let end = params.endIndex;
      if (start > end) {
        let tmp = start;
        start = end;
        end = tmp;
      }
      for (let index = start; index <= end; index++) {
        dispatch(saveCompetitor(params.competitors[index]));
      }
      resolve();
    });
  };
};

export const getBracket = (
  id?: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setFetching(true));
      fetchOrCreate(ModelNames.Bracket, id)
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
