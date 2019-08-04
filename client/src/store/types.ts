export const GET_BRACKETS = "GET_BRACKETS";
export const GET_BRACKET_BY_ID = "GET_BRACKET_BY_ID";

interface GetBracketsAction {
  type: typeof GET_BRACKETS;
}

interface GetBracketByIdAction {
  type: typeof GET_BRACKET_BY_ID;
  id: string;
}

export type ActionTypes = GetBracketsAction | GetBracketByIdAction;
