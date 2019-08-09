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

test("bracket can add track and save correctly", () => {
  const props = {
    name: "my new bracket",
    creator: "my new bracket",
    competitors: [],
    description: "test",
    id: "testId"
  };
  const trackSearchResult = trackSearchResponse[0];
  const { id } = trackSearchResult;
  const c = new Competitor({
    type: "track",
    spotifyId: id,
    model: new Track(trackSearchResult),
    id: "competitorId",
    index: 0
  });

  const b = new Bracket(props);
  b.addCompetitor(c);

  request.put = jest.fn();
  b.save();

  const expected = {
    ...props,
    competitors: ["competitorId"]
  };

  expect(request.put).toHaveBeenCalledWith("/api/brackets/testId", expected);
});
