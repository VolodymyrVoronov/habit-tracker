import { render, screen, fireEvent } from "@testing-library/react";

import AddHabitButton from "./AddHabitButton";

it("renders button and click it", async () => {
  const mock = jest.fn();

  render(<AddHabitButton onClick={mock} />);

  const button = screen.getByRole("button", { name: "Add new habit" });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(mock).toHaveBeenCalled();
});
