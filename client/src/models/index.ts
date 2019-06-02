import { Bracket } from "./Bracket";
import { get, post } from "../utils";

export async function fetchOrCreateBracket(id?: string) {
  if (!id) {
    return createBracket();
  }
  const { parsedBody } = await get(`/api/brackets/${id}`);
  return new Bracket(parsedBody);
}

export async function createBracket() {
  const { parsedBody } = await post("/api/brackets", {});
  return new Bracket(parsedBody);
}

export * from "./Bracket";
export * from "./Competitor";
export * from "./Track";
export * from "./BaseModel";
