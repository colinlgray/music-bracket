import { IState, initialState } from "./state";

export default function reducer(state: IState = initialState, action: any) {
  console.log("reducer action", action);
  return state;
}
