import Bracket from "./Bracket";
import * as request from "../utils/http";

jest.mock("../utils/http");

test("Instantiates a bracket with id", () => {
  const b = new Bracket();
  expect(b.competitors).toEqual([]);
  expect(b.id).toBeTruthy();
});

test("Calling save on competitor sends correct json", () => {
  const b = new Bracket("testId");
  b.name = "my new bracket";
  request.put = jest.fn();
  b.save();

  expect(request.put).toHaveBeenCalledWith("/api/brackets", {
    competitors: [],
    creator: "",
    description: "",
    id: "testId",
    name: "my new bracket"
  });
});
