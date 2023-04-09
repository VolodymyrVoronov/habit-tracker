import { render, screen } from "@testing-library/react";

import UserHabitButtons from "./UserHabitButtons";

it("renders correctly and has children", () => {
  render(
    <UserHabitButtons>
      <button type="button">1</button>
      <button type="button">2</button>
    </UserHabitButtons>
  );

  const buttons = screen.getAllByRole("button");

  expect(buttons).toHaveLength(2);
});
