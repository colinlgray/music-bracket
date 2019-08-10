import { combineReducers } from "redux";
import { bracketsReducer } from "./brackets/reducers";
import { bracketReducer } from "./bracket/reducers";
import { systemReducer } from "./system/reducers";

export const rootReducer = combineReducers({
  bracket: bracketReducer,
  brackets: bracketsReducer,
  system: systemReducer
});

export type AppState = ReturnType<typeof rootReducer>;
