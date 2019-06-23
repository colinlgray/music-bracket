import Bracket from "./Bracket";
import Track from "./Track";
import Competitor from "./Competitor";
import { trackSearchResponse } from "../../../fixtures";
import * as request from "../utils/http";

jest.mock("../utils/http");

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
    track: new Track(trackSearchResult),
    id: "competitorId",
    index: 0
  });

  const b = new Bracket(props);
  b.addCompetitor(c);

  request.put = jest.fn();
  b.save();

  const expected = {
    ...props,
    competitors: [
      {
        index: 0,
        imageUrl:
          "https://i.scdn.co/image/2cc54e7570d470966be2def87590dfa84f87076f",
        roundsWon: 0,
        type: "track",
        id: "competitorId",
        spotifyId: "6u7jPi22kF8CTQ3rb9DHE7"
      }
    ]
  };

  expect(request.put).toHaveBeenCalledWith("/api/brackets/testId", expected);
});
