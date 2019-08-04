import { Bracket } from "../models";
import { GET_BRACKETS, GET_BRACKET_BY_ID, ActionTypes } from "./types";

export function getBrackets(): ActionTypes {
  return {
    type: GET_BRACKETS
  };
}
