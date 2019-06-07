import Competitor from "./Competitor";
import Artist from "./Artist";
import Track from "./Track";
import * as request from "../utils/request";
import { trackSearchResults } from "../__fixtures__/searchResults";

jest.mock("../utils/request");

test("Instantiates a competitor with correct models", () => {
  const c = new Competitor({ track: trackSearchResults[0] });
  expect(c.track).toBeInstanceOf(Track);
  expect(c.track.artists).toBeInstanceOf(Array);
  c.track.artists.forEach(a => {
    expect(a).toBeInstanceOf(Artist);
  });
});

test("Calling save on competitor sends correct json", () => {
  const c = new Competitor({ track: trackSearchResults[0] });
  request.put = jest.fn();
  c.save();
  expect(request.put).toHaveBeenCalled();
});
