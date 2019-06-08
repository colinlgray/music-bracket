import Competitor from "./Competitor";
import Artist from "./Artist";
import Track from "./Track";
import Album from "./Album";
import * as request from "../utils/request";
import { trackSearchResponse, competitor } from "../__fixtures__";

jest.mock("../utils/request");

test("Instantiates a competitor with correct models", () => {
  const c = new Competitor({ track: trackSearchResponse[0] });
  expect(c.track).toBeInstanceOf(Track);
  expect(c.track.artists).toBeInstanceOf(Array);
  c.track.artists.forEach(a => {
    expect(a).toBeInstanceOf(Artist);
  });
  expect(c.track.album).toBeInstanceOf(Album);
  expect(c.imageUrl).toBeTruthy();
});

test("Calling save on competitor sends correct json", () => {
  const c = new Competitor({
    track: trackSearchResponse[0],
    id: competitor.id
  });
  request.put = jest.fn();
  c.save();

  expect(request.put).toHaveBeenCalledWith("/api/competitors", competitor);
});
