import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HabitCardMini from "./HabitCardMini";

const mockHabit = {
  id: 1,
  habit: "Test habit",
  habitInformation: "Test habit information",
  target: 20,
  iconCode: "achievement",
  iconName: "Achievement",
  comments:
    '[{"id":"lffe6zfy","comment":"Lorem ipsum dolor sit 1."},{"id":"lffe72c4","comment":"Lorem ipsum dolor sit 2."},{"id":"lffe7546","comment":"Lorem ipsum dolor sit 3."},{"id":"lffe781p","comment":"Lorem ipsum dolor sit 4."},{"id":"lffe7ae6","comment":"Lorem ipsum dolor sit 5."},{"id":"lfwq8do5","comment":"Lorem ipsum dolor sit 6."},{"id":"lfwq8g7r","comment":"Lorem ipsum dolor sit 7."},{"id":"lfwq8i6v","comment":"Lorem ipsum dolor sit 8."},{"id":"lfwq8l59","comment":"Lorem ipsum dolor sit 9."},{"id":"lfwq8mpb","comment":"Lorem ipsum dolor sit 10."},{"id":"lfwq8ond","comment":"Lorem ipsum dolor sit 11."},{"id":"lfwqd396","comment":"Lorem ipsum dolor sit 11."},{"id":"lfwqd9oq","comment":"Lorem ipsum dolor sit 12."},{"id":"lfwqdd0k","comment":"Lorem ipsum dolor sit 13."},{"id":"lfwqtxi2","comment":"asd"}]',
};

it("renders correctly", async () => {
  render(
    <HabitCardMini
      habitData={mockHabit}
      onCardClick={() => {}}
      onDeleteClick={() => {}}
    />
  );

  const habitName = screen.getByText(mockHabit.habit);
  expect(habitName).toBeInTheDocument();

  const icon = screen.getByRole("img", {
    name: "Habit icon",
  });
  expect(icon).toBeInTheDocument();

  const tab = screen.getByRole("tab", {
    name: /expand/i,
  });
  await userEvent.click(tab);

  const habitInformation = screen.getByText(mockHabit.habitInformation);
  expect(habitInformation).toBeInTheDocument();

  const target = screen.getByText(new RegExp(mockHabit.target.toString(), "i"));
  expect(target).toBeInTheDocument();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
});

it("renders correctly if habit achieved", async () => {
  render(
    <HabitCardMini
      habitData={{
        ...mockHabit,
        target: 15,
      }}
      onCardClick={() => {}}
      onDeleteClick={() => {}}
    />
  );

  expect(screen.getByText(/achieved/i)).toBeInTheDocument();
  expect(screen.getByText(/100%/i)).toBeInTheDocument();
});

it("calls onCardClick with correct props/args", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: number }) => {
    return {
      id,
    };
  });

  render(
    <HabitCardMini
      habitData={mockHabit}
      onCardClick={mock}
      onDeleteClick={() => {}}
    />
  );

  const button = screen.getByRole("button", {
    name: /read more icon/i,
  });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);

  expect(mock).toHaveBeenCalledWith(mockHabit.id);
});

it("calls onDeleteClick with correct props/args", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: number }) => {
    return {
      id,
    };
  });

  render(
    <HabitCardMini
      habitData={mockHabit}
      onCardClick={() => {}}
      onDeleteClick={mock}
    />
  );

  const button = screen.getByRole("button", {
    name: /delete habit icon/i,
  });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);

  expect(mock).toBeCalled();
  expect(mock).toHaveBeenCalledWith(mockHabit.id);
});
