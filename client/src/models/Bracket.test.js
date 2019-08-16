import Bracket from "./Bracket";
import Track from "./Track";
import Competitor from "./Competitor";
import { bracket, trackSearchResponse } from "../../../fixtures";
import * as request from "../utils/http";

jest.mock("../utils/http");

test("bracket instantiates with correct models", () => {
  const b = new Bracket(bracket);
  expect(b.competitors[0]).toBeInstanceOf(Competitor);
});
