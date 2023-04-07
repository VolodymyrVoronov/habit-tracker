import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HabitModal from "./HabitModal";

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

const commentsArray =
  mockHabit.comments === "" ? 0 : JSON.parse(mockHabit.comments as string);

it("renders correctly", async () => {
  render(
    <HabitModal habitData={mockHabit} dialogOpen onCloseClick={() => {}} />
  );

  const habitName = screen.getByText(mockHabit.habit);
  expect(habitName).toBeInTheDocument();

  const icon = screen.getByRole("img", {
    name: new RegExp(mockHabit.iconName, "i"),
  });
  expect(icon).toBeInTheDocument();

  const comments = screen.getAllByTestId("comment-test-id");
  expect(comments).toHaveLength(commentsArray.length);

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
});

it("renders correctly if habit achieved", async () => {
  render(
    <HabitModal
      habitData={{
        ...mockHabit,
        target: 15,
      }}
      dialogOpen
      onCloseClick={() => {}}
    />
  );

  expect(screen.getByText(/achieved/i)).toBeInTheDocument();
  expect(screen.getByText(/100%/i)).toBeInTheDocument();
});

it("renders correctly if no comments", async () => {
  render(
    <HabitModal
      habitData={{
        ...mockHabit,
        comments: "",
      }}
      dialogOpen
      onCloseClick={() => {}}
    />
  );

  const habitName = screen.getByText(mockHabit.habit);
  expect(habitName).toBeInTheDocument();

  const icon = screen.getByRole("img", {
    name: new RegExp(mockHabit.iconName, "i"),
  });
  expect(icon).toBeInTheDocument();

  const comments = screen.queryAllByTestId("comment-test-id");
  expect(comments).toHaveLength(0);

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);

  const textIfNoComment = screen.getByText(/no comments yet/i);
  expect(textIfNoComment).toBeInTheDocument();
});

it("calls onCloseClick with correct props/args by click on cancel button", async () => {
  const mock = jest.fn().mockImplementation(({ flag }: { flag: boolean }) => {
    return {
      flag,
    };
  });

  render(<HabitModal habitData={mockHabit} dialogOpen onCloseClick={mock} />);

  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  expect(cancelButton).toBeInTheDocument();

  await userEvent.click(cancelButton);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(false);
});

it("calls onCloseClick with correct props/args by click on close button", async () => {
  const mock = jest.fn().mockImplementation(({ flag }: { flag: boolean }) => {
    return {
      flag,
    };
  });

  render(<HabitModal habitData={mockHabit} dialogOpen onCloseClick={mock} />);

  const closeButton = screen.getByRole("button", {
    name: /close/i,
  });

  expect(closeButton).toBeInTheDocument();

  await userEvent.click(closeButton);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(false);
});
