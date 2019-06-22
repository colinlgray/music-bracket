import Bracket from "./Bracket";
import Track from "./Track";
import Competitor from "./Competitor";
import { track as trackFixture } from "../../../fixtures";
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

  const c = new Competitor({
    type: "track",
    spotifyId: trackFixture.id,
    track: new Track(trackFixture),
    id: "competitorId"
  });

  const b = new Bracket(props);
  b.addCompetitor(c);

  request.put = jest.fn();
  b.save();

  const expected = {
    id: c.id,
    name: "my new bracket",
    creator: "my new bracket",
    description: "test",
    competitors: [
      {
        index: 0,
        imageUrl:
          "https://i.scdn.co/image/1d828085e1ba97a564dcdad94373023eff8b02ca",
        roundsWon: 0,
        type: "track",
        spotifyId: "1DMEzmAoQIikcL52psptQL"
      }
    ]
  };

  expect(request.put).toHaveBeenCalledWith("/api/brackets/testId", expected);
});
