import { without } from "lodash";
import { IState, initialState } from "./state";
import {
  BracketAction,
  SET_BRACKET,
  SET_FETCHING_BRACKET,
  REMOVE_COMPETITOR,
  REORDER_COMPETITORS,
  ADD_COMPETITOR,
  SET_SAVING_COMPETITOR,
  SET_COMPETITORS,
  UPDATE_BRACKET
} from "./types";
import { Competitor } from "../../types";
import { reorder } from "../../utils/reorder";

const updateIndices = (params: {
  competitors: Array<Competitor>;
  start: number;
  end: number;
}) => {
  for (let index = params.start; index <= params.end; index++) {
    params.competitors[index].index = index;
  }
};

export function bracketReducer(
  state: IState = initialState,
  action: BracketAction
): IState {
  switch (action.type) {
    case SET_BRACKET:
      return { ...state, currentBracket: action.payload };
    case SET_FETCHING_BRACKET:
      return { ...state, isLoadingBracket: action.payload };
    case REMOVE_COMPETITOR:
      const arrWithoutItem = without(
        state.currentBracket.competitors,
        action.payload
      );
      updateIndices({
        competitors: arrWithoutItem,
        start: action.payload.index,
        end: arrWithoutItem.length - 1
      });
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          competitors: arrWithoutItem
        }
      };
    case REORDER_COMPETITORS:
      const clone = reorder(
        state.currentBracket.competitors,
        action.startIndex,
        action.endIndex
      );
      let start = action.startIndex;
      let end = action.endIndex;
      if (start > end) {
        let tmp = start;
        start = end;
        end = tmp;
      }
      updateIndices({
        competitors: clone,
        start,
        end
      });
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          competitors: clone
        }
      };
    case ADD_COMPETITOR:
      const competitors = state.currentBracket.competitors;

      const arrWithNewItem = [
        ...competitors.slice(0, action.index),
        { ...action.payload, bracketId: state.currentBracket.id },
        ...competitors.slice(action.index)
      ];
      updateIndices({
        competitors: arrWithNewItem,
        start: action.index,
        end: arrWithNewItem.length - 1
      });
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          competitors: arrWithNewItem as Array<Competitor>
        }
      };
    case SET_COMPETITORS:
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          competitors: action.payload
        }
      };
    case UPDATE_BRACKET:
      return {
        ...state,
        currentBracket: {
          ...state.currentBracket,
          ...action.payload
        }
      };
    case SET_SAVING_COMPETITOR:
      // TODO: set value on model
      return state;
    default:
      return state;
  }
}
