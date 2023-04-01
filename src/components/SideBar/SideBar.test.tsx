import { render, screen, fireEvent } from "@testing-library/react";

import SideBar from "./SideBar";

const mockHabits = [
  {
    id: 1,
    habit: "Habit 1",
    habitInformation: "Habit 1 information",
    target: 5,
    iconName: "Bad habit",
    iconCode: "bad-habit",
    comments: "",
  },
  {
    id: 2,
    habit: "Habit 2",
    habitInformation: "Habit 2 information",
    target: 15,
    iconName: "Education",
    iconCode: "education",
    comments: "",
  },
];

it("renders sidebar with logo and title", async () => {
  render(
    <SideBar
      habits={[]}
      onUserHabitClick={() => {}}
      onAddHabitClick={() => {}}
    />
  );

  const logo = screen.getByRole("img", { name: /logo icon/i });
  expect(logo).toBeInTheDocument();

  const title = screen.getByText(/habit tracker/i);
  expect(title).toBeInTheDocument();
});

it("renders sidebar without habits", async () => {
  render(
    <SideBar
      habits={[]}
      onUserHabitClick={() => {}}
      onAddHabitClick={() => {}}
    />
  );

  const textIfNoHabits = screen.getByText(/start adding new habit!/i);
  expect(textIfNoHabits).toBeInTheDocument();
});

it("renders sidebar with habits", async () => {
  render(
    <SideBar
      habits={mockHabits}
      onUserHabitClick={() => {}}
      onAddHabitClick={() => {}}
    />
  );

  const habits = screen.getAllByTestId("user-habit-button");
  expect(habits).toHaveLength(mockHabits.length);
});

it("clicks 'onAddHabitClick' once", async () => {
  const mock = jest.fn();

  render(
    <SideBar
      habits={mockHabits}
      onUserHabitClick={() => {}}
      onAddHabitClick={mock}
    />
  );

  const button = screen.getByRole("button", { name: "Add new habit" });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(mock).toHaveBeenCalled();
});

it("calls 'onUserHabitClick' with correct args", async () => {
  const mock = jest.fn().mockImplementation((id: number) => {
    return {
      id,
    };
  });

  render(
    <SideBar
      habits={mockHabits}
      onUserHabitClick={mock}
      onAddHabitClick={() => {}}
    />
  );

  const habits = screen.getAllByTestId("user-habit-button");

  for (let i = 0; i < habits.length; i += 1) {
    fireEvent.click(habits[i]);
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(Number(mockHabits[i].id));
  }
});
