import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "./Form";

it("renders correctly if no iconCode and iconName passed / opens for the first time", async () => {
  render(
    <Form
      iconCode=""
      iconName=""
      onFormChange={() => {}}
      onDeleteIconClick={() => {}}
    />
  );

  const habitInput = screen.getByTestId("habit-input");
  expect(habitInput).toBeInTheDocument();
  expect(habitInput).toHaveValue("");

  const habitInformation = screen.getByTestId("habit-information");
  expect(habitInformation).toBeInTheDocument();
  expect(habitInformation).toHaveValue("");

  const habitTarget = screen.getByTestId("habit-target");
  expect(habitTarget).toBeInTheDocument();
  expect(habitTarget).toHaveValue("0");

  const noHabitIcon = screen.getByTestId("no-habit-icon");
  expect(noHabitIcon).toBeInTheDocument();

  const habitIcon = screen.queryByTestId("habit-icon");
  expect(habitIcon).not.toBeInTheDocument();

  const deleteIconButton = screen.getByRole("button", {
    name: /delete icon/i,
  });
  expect(deleteIconButton).toBeInTheDocument();
  expect(deleteIconButton).toBeDisabled();
});

it("renders correctly if iconCode and iconName passed", async () => {
  render(
    <Form
      iconCode="achievement"
      iconName="Achievement"
      onFormChange={() => {}}
      onDeleteIconClick={() => {}}
    />
  );

  const noHabitIcon = screen.queryByTestId("no-habit-icon");
  expect(noHabitIcon).not.toBeInTheDocument();

  const habitIcon = screen.queryByTestId("habit-icon");
  expect(habitIcon).toBeInTheDocument();
});

it("renders and works correctly when inputs are not empty", async () => {
  render(
    <Form
      iconCode="achievement"
      iconName="Achievement"
      onFormChange={() => {}}
      onDeleteIconClick={() => {}}
    />
  );

  const habitInput = screen.getByTestId("habit-input");
  await userEvent.type(habitInput, "habit");
  expect(habitInput).toHaveValue("habit");

  const habitInformation = screen.getByTestId("habit-information");
  await userEvent.type(habitInformation, "habit information");
  expect(habitInformation).toHaveValue("habit information");

  const habitTarget = screen.getByTestId("habit-target");
  await userEvent.type(habitTarget, "100");
  expect(habitTarget).toHaveValue("100");
});

it("calls onDeleteIconClick function by click on delete icon button", async () => {
  const onDeleteIconClick = jest.fn();

  render(
    <Form
      iconCode="achievement"
      iconName="Achievement"
      onFormChange={() => {}}
      onDeleteIconClick={onDeleteIconClick}
    />
  );

  const deleteIconButton = screen.getByRole("button", {
    name: /delete icon/i,
  });

  await userEvent.click(deleteIconButton);

  expect(onDeleteIconClick).toHaveBeenCalledTimes(1);
});

it("calls onFormChange function when input is changed", async () => {
  const onFormChange = jest
    .fn()
    .mockImplementation(
      (habitData: {
        habit: string;
        habitInformation: string;
        target: number;
      }) => {
        return {
          habit: habitData.habit,
          habitInformation: habitData.habitInformation,
          target: habitData.target,
        };
      }
    );

  render(
    <Form
      iconCode="achievement"
      iconName="Achievement"
      onFormChange={onFormChange}
      onDeleteIconClick={() => {}}
    />
  );

  const habitInput = screen.getByTestId("habit-input");
  await userEvent.type(habitInput, "habit");

  const habitInformation = screen.getByTestId("habit-information");
  await userEvent.type(habitInformation, "habit information");

  const habitTarget = screen.getByTestId("habit-target");
  await userEvent.type(habitTarget, "100");

  expect(onFormChange).toHaveBeenCalled();

  expect(onFormChange).toHaveBeenCalledWith({
    habit: "habit",
    habitInformation: "habit information",
    target: 100,
  });
});
