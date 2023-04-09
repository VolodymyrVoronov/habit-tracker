import { render, screen } from "@testing-library/react";

import Logo from "./Logo";

it("renders logo and title", () => {
  render(<Logo />);

  const logo = screen.getByRole("img", { name: /logo icon/i });
  expect(logo).toBeInTheDocument();

  const title = screen.getByText(/habit tracker/i);
  expect(title).toBeInTheDocument();
});
