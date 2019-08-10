import { Competitor } from "../../models";

export interface SystemState {
  searchResults: Array<Competitor>;
  isSearching: boolean;
}

export const initialState = {
  searchResults: [],
  isSearching: false
};
