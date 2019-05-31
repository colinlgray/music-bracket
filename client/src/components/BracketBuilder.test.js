import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import BracketBuilder from "../BracketBuilder";

test("Makes call to api on mount", async () => {
  const { getByTestId, container } = render(
    <BracketBuilder addNominee={() => {}} />
  );
});
