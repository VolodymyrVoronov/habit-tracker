import { render, screen } from "@testing-library/react";

import ErrorBox from "./ErrorBox";

it("renders error message", async () => {
  render(<ErrorBox errorMessage="Error test message!" />);

  const errorMessage = screen.getByText("Error test message!");
  expect(errorMessage).toBeInTheDocument();
});
