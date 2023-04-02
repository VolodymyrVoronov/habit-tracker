import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import habitIcons from "../../constants/habitIcons";

import HabitIcons from "./HabitIcons";

it("renders correctly", async () => {
  render(<HabitIcons iC="" onHabitIconClick={() => {}} />);

  const habitIconsContainer = screen.getByTestId("habit-icons-container");

  const habitIconButtons = within(habitIconsContainer).getAllByRole("button");

  expect(habitIconButtons).toHaveLength(habitIcons.length);

  for (let i = 0; i < habitIcons.length; i += 1) {
    expect(habitIconButtons[i]).toBeInTheDocument();
  }
});

it("filters correct icon/s", async () => {
  render(<HabitIcons iC="" onHabitIconClick={() => {}} />);

  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();

  await userEvent.type(input, "achievement");

  const habitIconsContainer = screen.getByTestId("habit-icons-container");

  expect(within(habitIconsContainer).getAllByRole("button")).toHaveLength(1);

  const clearInputFieldButton = screen.getByRole("button", {
    name: /clear field icon/i,
  });

  expect(clearInputFieldButton).toBeInTheDocument();

  await userEvent.click(clearInputFieldButton);

  expect(within(habitIconsContainer).getAllByRole("button")).toHaveLength(
    habitIcons.length
  );

  await userEvent.type(input, "ac");

  expect(within(habitIconsContainer).getAllByRole("button")).toHaveLength(2);

  await userEvent.click(clearInputFieldButton);

  await userEvent.type(input, "acasdasdasdasd");

  expect(within(habitIconsContainer).queryAllByRole("button")).toHaveLength(0);
});

it("calls and passes correct props/args into onHabitIconClick function by click on button", async () => {
  const mock = jest
    .fn()
    .mockImplementation(
      ({ iconCode, iconName }: { iconCode: string; iconName: string }) => {
        return {
          iconCode,
          iconName,
        };
      }
    );

  render(<HabitIcons iC="" onHabitIconClick={mock} />);

  const habitIconsContainer = screen.getByTestId("habit-icons-container");

  const habitIconButtons = within(habitIconsContainer).getAllByRole("button");

  for (let i = 0; i < habitIcons.length; i += 1) {
    expect(habitIconButtons[i]).toBeInTheDocument();

    fireEvent.click(habitIconButtons[i]);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(
      habitIcons[i].iconCode,
      habitIcons[i].iconName
    );
  }

  expect(mock).toHaveBeenCalledTimes(habitIconButtons.length);
});
