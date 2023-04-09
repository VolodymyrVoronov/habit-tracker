import { render, screen, fireEvent } from "@testing-library/react";

import HabitIcon from "./HabitIcon";

const mockHabitIcon = {
  iconUrl: "test.png",
  iconCode: "habit",
  iconAlt: "Habit icon",
  iconName: "Habit",
  selected: false,
};

it("calls and passes correct props/args into onClick function by button click", async () => {
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

  render(
    <HabitIcon
      iconUrl={mockHabitIcon.iconUrl}
      iconCode={mockHabitIcon.iconCode}
      iconAlt={mockHabitIcon.iconAlt}
      iconName={mockHabitIcon.iconName}
      selected={mockHabitIcon.selected}
      onClick={mock}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockHabitIcon.iconName, "i"),
  });

  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(
    mockHabitIcon.iconCode,
    mockHabitIcon.iconName
  );
});

it("renders with correct props", async () => {
  render(
    <HabitIcon
      iconUrl={mockHabitIcon.iconUrl}
      iconCode={mockHabitIcon.iconCode}
      iconAlt={mockHabitIcon.iconAlt}
      iconName={mockHabitIcon.iconName}
      selected={mockHabitIcon.selected}
      onClick={() => {}}
    />
  );

  const iconImage = screen.getByRole("img", {
    name: new RegExp(mockHabitIcon.iconName, "i"),
  });
  expect(iconImage).toBeInTheDocument();

  const iconName = screen.getByText(mockHabitIcon.iconName);
  expect(iconName).toBeInTheDocument();
});

it("has 'root-selected' css class if icon selected", async () => {
  render(
    <HabitIcon
      iconUrl={mockHabitIcon.iconUrl}
      iconCode={mockHabitIcon.iconCode}
      iconAlt={mockHabitIcon.iconAlt}
      iconName={mockHabitIcon.iconName}
      selected
      onClick={() => {}}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockHabitIcon.iconName, "i"),
  });

  expect(button).toHaveClass("root-selected");
});

it("does not have 'root-selected' css class if icon not selected", async () => {
  render(
    <HabitIcon
      iconUrl={mockHabitIcon.iconUrl}
      iconCode={mockHabitIcon.iconCode}
      iconAlt={mockHabitIcon.iconAlt}
      iconName={mockHabitIcon.iconName}
      selected={mockHabitIcon.selected}
      onClick={() => {}}
    />
  );

  const button = screen.getByRole("button", {
    name: new RegExp(mockHabitIcon.iconName, "i"),
  });

  expect(button).not.toHaveClass("root-selected");
});
