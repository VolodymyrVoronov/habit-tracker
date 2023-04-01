import { render, screen } from "@testing-library/react";

import Dock from "./Dock";

it("renders dock items, which has 4 links", async () => {
  render(<Dock />);

  const links = screen.getAllByRole("menuitem");

  expect(links).toHaveLength(4);
});
