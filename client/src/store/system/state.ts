import { Competitor } from "../../types";

export interface SystemState {
  searchResults: Array<Competitor>;
  isSearching: boolean;
}

export const initialState = {
  searchResults: [],
  isSearching: false
};
