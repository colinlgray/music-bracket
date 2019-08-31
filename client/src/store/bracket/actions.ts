import { Bracket, Competitor, Track } from "../../types";
import {
  SetBracketAction,
  SetFetchingBracketAction,
  RemoveCompetitorAction,
  AddCompetitorAction,
  ReorderCompetitorsAction,
  SetSavingCompetitorAction,
  SetCompetitorsAction,
  UpdateBracketAction,
  SET_BRACKET,
  SET_COMPETITORS,
  ADD_COMPETITOR,
  REMOVE_COMPETITOR,
  REORDER_COMPETITORS,
  SET_SAVING_COMPETITOR,
  SET_FETCHING_BRACKET,
  UPDATE_BRACKET
} from "./types";
import { ReorderSearchResultsParams } from "../system/types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { sortBy, get, omit } from "lodash";
import { query, mutate } from "../../api/graphql";
import { AppState } from "../index";

export const setBracket = (bracket: Bracket): SetBracketAction => {
  bracket.competitors = sortBy(bracket.competitors, ["index"]);
  return { type: SET_BRACKET, payload: bracket };
};

export const addCompetitorToArray = (
  competitor: Competitor,
  index: number
): AddCompetitorAction => {
  return { type: ADD_COMPETITOR, payload: competitor, index };
};

const competitorsLocation = "bracket.currentBracket.competitors";

export const addCompetitor = (
  competitor: Competitor,
  index: number
): ThunkAction<Promise<void>, AppState, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ): Promise<void> => {
    dispatch(addCompetitorToArray(competitor, index));
    const arr = get(getState(), competitorsLocation, []);
    for (let idx = index; idx < arr.length; idx++) {
      dispatch(saveCompetitor(arr[idx]));
    }
  };
};

export const removeCompetitorFromArray = (
  competitor: Competitor
): RemoveCompetitorAction => {
  return { type: REMOVE_COMPETITOR, payload: competitor };
};

export const removeCompetitor = (
  competitor: Competitor
): ThunkAction<Promise<void>, AppState, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ): Promise<void> => {
    let idx = competitor.index;
    dispatch(removeCompetitorFromArray(competitor));
    const arr = get(getState(), competitorsLocation, []);
    for (; idx < arr.length; idx++) {
      dispatch(saveCompetitor(arr[idx]));
    }
    dispatch(saveCompetitor({ ...competitor, bracketId: null }));
  };
};

const toQueryObject = (o: Competitor | Bracket) => {
  return JSON.stringify(
    omit(o, ["spotifyData", "__typename", "competitors"])
  ).replace(/"([^(")"]+)":/g, "$1:");
};

// TODO: Make save call first and let the response from this go to the reducer
async function makeCompetitorSaveRequest(competitor: Competitor) {
  const result = await mutate(
    `
    mutation {
      updateCompetitor(update: ${toQueryObject(competitor)})
      {
        id
        index
        spotifyId
        bracketId
      }
    }    `
  );
  return get(result, "data.updateCompetitor");
}

async function makeBracketSaveRequest(bracket: Bracket) {
  const result = await mutate(
    `
    mutation {
      updateBracket(update: ${toQueryObject(bracket)})
      {
        id
        name
        creationState
      }
    }    `
  );
  return get(result, "data.updateBracket");
}

export const saveCompetitor = (
  competitor: Competitor
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(
        setSavingCompetitor({ index: competitor.index, isSaving: true })
      );
      makeCompetitorSaveRequest(competitor)
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

export const setCompetitors = (
  competitors: Array<Competitor>
): SetCompetitorsAction => {
  return { type: SET_COMPETITORS, payload: competitors };
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
  };
};

export const reseedCompetitors = (
  metric: keyof Track
): ThunkAction<Promise<void>, AppState, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ): Promise<void> => {
    let competitors = get(getState(), competitorsLocation, []).slice();
    competitors.sort((a: Competitor, b: Competitor) => {
      return (
        get(b, `spotifyData.${metric}`, 0) - get(a, `spotifyData.${metric}`, 0)
      );
    });
    competitors.forEach((c: Competitor, idx: number) => {
      c.index = idx;
      dispatch(saveCompetitor(c));
    });
    dispatch(setCompetitors(competitors));
  };
};

async function fetchBracket(id?: string) {
  const result = await query(
    `
      {
        getBracket(id: "${id}") {
          id
          name
          creationState
          competitors {
            id
            index
            spotifyId
            bracketId
            spotifyData {
              name
              album {
                images {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    `
  );
  return get(result, "data.getBracket");
}

async function createBracket() {
  const result = await query(
    `
      {
        newBracket {
          id
        }
      }
    `
  );
  return get(result, "data.newBracket");
}

async function fetchOrCreateBracket(id?: string) {
  return id ? fetchBracket(id) : createBracket();
}

export const getBracket = (
  id?: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      dispatch(setFetching(true));
      fetchOrCreateBracket(id)
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

const updateBracketAttribute = (payload: any): UpdateBracketAction => {
  return { type: UPDATE_BRACKET, payload };
};

export const updateBracket = (
  payload: any
): ThunkAction<Promise<void>, AppState, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ): Promise<void> => {
    dispatch(updateBracketAttribute(payload));
    makeBracketSaveRequest(get(getState(), "bracket.currentBracket", {}));
  };
};
