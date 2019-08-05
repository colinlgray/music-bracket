import { combineReducers } from "redux";
import { bracketsReducer } from "./brackets/reducers";
import { bracketReducer } from "./bracket/reducers";

export const rootReducer = combineReducers({
  brackets: bracketsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
