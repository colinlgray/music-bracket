import Bracket from "./Bracket";
import * as request from "../utils/http";

jest.mock("../utils/http");

test("Calling save on competitor sends correct json", () => {
  const props = {
    name: "my new bracket",
    creator: "my new bracket",
    competitors: [],
    description: "test",
    id: "testId"
  };

  const b = new Bracket(props);

  request.put = jest.fn();
  b.save();

  expect(request.put).toHaveBeenCalledWith("/api/brackets/testId", props);
});
