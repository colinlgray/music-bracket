import { Competitor } from "../../types";

export interface SystemState {
  searchResults: Array<Competitor>;
  isSearching: boolean;
  totalSearchResults: number;
}

export const initialState = {
  totalSearchResults: 0,
  searchResults: [],
  isSearching: false
};
