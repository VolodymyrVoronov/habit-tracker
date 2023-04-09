import { render, screen, fireEvent } from "@testing-library/react";

import UserHabitButton from "./UserHabitButton";

const mockUserHabitButton = {
  id: 1,
  habit: "Habit 1",
  iconCode: "habit",
  selected: false,
};

it("renders correctly", async () => {
  render(
    <UserHabitButton
      id={mockUserHabitButton.id}
      habit={mockUserHabitButton.habit}
      iconCode={mockUserHabitButton.iconCode}
      selected={mockUserHabitButton.selected}
      onClick={() => {}}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockUserHabitButton.habit, "i"),
  });
  expect(button).toBeInTheDocument();

  const image = screen.getByRole("img", {
    name: new RegExp(mockUserHabitButton.iconCode, "i"),
  });
  expect(image).toBeInTheDocument();
});

it("calls and passes correct props/args into onClick function by button click", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: number }) => {
    return {
      id,
    };
  });

  render(
    <UserHabitButton
      id={mockUserHabitButton.id}
      habit={mockUserHabitButton.habit}
      iconCode={mockUserHabitButton.iconCode}
      selected={mockUserHabitButton.selected}
      onClick={mock}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockUserHabitButton.habit, "i"),
  });

  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(mockUserHabitButton.id);
});

it("has 'root-selected' css class if button clicked/selected", async () => {
  render(
    <UserHabitButton
      id={mockUserHabitButton.id}
      habit={mockUserHabitButton.habit}
      iconCode={mockUserHabitButton.iconCode}
      selected
      onClick={() => {}}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockUserHabitButton.habit, "i"),
  });

  expect(button).toHaveClass("root-selected");
});

it("does not have 'root-selected' css class if button not clicked/selected", async () => {
  render(
    <UserHabitButton
      id={mockUserHabitButton.id}
      habit={mockUserHabitButton.habit}
      iconCode={mockUserHabitButton.iconCode}
      selected={mockUserHabitButton.selected}
      onClick={() => {}}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockUserHabitButton.habit, "i"),
  });

  expect(button).not.toHaveClass("root-selected");
});
