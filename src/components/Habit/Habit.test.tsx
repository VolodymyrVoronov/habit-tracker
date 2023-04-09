import { useRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "primereact/toast";
import { ConfirmPopup } from "primereact/confirmpopup";

import Habit from "./Habit";

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

const RenderWithToast = ({ children }: { children: React.ReactNode }) => {
  const toast = useRef(null);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      {children}
    </>
  );
};

it("renders correctly", async () => {
  render(
    <Habit
      habitData={mockHabit}
      onDeleteHabitClick={() => {}}
      onAddCommentClick={() => {}}
      onDeleteHabitsCommentClick={() => {}}
    />
  );

  const habitName = screen.getByText(mockHabit.habit);
  expect(habitName).toBeInTheDocument();

  const habitInformation = screen.getByText(mockHabit.habitInformation);
  expect(habitInformation).toBeInTheDocument();

  const target = screen.getByText(new RegExp(mockHabit.target.toString(), "i"));
  expect(target).toBeInTheDocument();

  const habitIcon = screen.getByRole("img", {
    name: mockHabit.iconCode,
  });
  expect(habitIcon).toBeInTheDocument();

  expect(screen.queryAllByTestId("habit-comment")).toHaveLength(10);

  const loadMoreCommentsButton = screen.getByRole("button", {
    name: /load more comments/i,
  });

  await userEvent.click(loadMoreCommentsButton);

  await waitFor(() => {
    expect(screen.queryAllByTestId("habit-comment")).toHaveLength(15);
  });

  await userEvent.click(loadMoreCommentsButton);

  expect(loadMoreCommentsButton).not.toBeInTheDocument();

  const addCommentButton = screen.getByRole("button", {
    name: /add/i,
  });

  expect(addCommentButton).toBeInTheDocument();
  expect(addCommentButton).toBeDisabled();

  const addCommentField = screen.getByRole("textbox");

  expect(addCommentField).toBeInTheDocument();
  expect(addCommentField).toHaveValue("");
});

it("renders correctly if no comments", async () => {
  render(
    <Habit
      habitData={{
        ...mockHabit,
        comments: "",
      }}
      onDeleteHabitClick={() => {}}
      onAddCommentClick={() => {}}
      onDeleteHabitsCommentClick={() => {}}
    />
  );

  const textNoComment = screen.getByText("No comments yet.");
  expect(textNoComment).toBeInTheDocument();
});

it("renders correctly if target achieved", async () => {
  render(
    <Habit
      habitData={{
        ...mockHabit,
        target: 15,
      }}
      onDeleteHabitClick={() => {}}
      onAddCommentClick={() => {}}
      onDeleteHabitsCommentClick={() => {}}
    />
  );

  const textNoComment = screen.getByText(/target achieved!/i);
  expect(textNoComment).toBeInTheDocument();

  const addCommentField = screen.queryByRole("textbox");
  expect(addCommentField).not.toBeInTheDocument();

  const addCommentButton = screen.queryByRole("button", {
    name: /add/i,
  });
  expect(addCommentButton).not.toBeInTheDocument();
});

it("disables add comment button if the add comment field is filled", async () => {
  render(
    <Habit
      habitData={mockHabit}
      onDeleteHabitClick={() => {}}
      onAddCommentClick={() => {}}
      onDeleteHabitsCommentClick={() => {}}
    />
  );

  const addCommentField = screen.getByRole("textbox");

  await userEvent.type(addCommentField, "Test comment");

  const addCommentButton = screen.getByRole("button", {
    name: /add/i,
  });

  expect(addCommentButton).not.toBeDisabled();
});

it("calls onDeleteIconClick function by click on delete habit button", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: string }) => {
    return {
      id,
    };
  });

  render(
    <RenderWithToast>
      <Habit
        habitData={mockHabit}
        onDeleteHabitClick={mock}
        onAddCommentClick={() => {}}
        onDeleteHabitsCommentClick={() => {}}
      />
    </RenderWithToast>
  );

  const deleteHabitButton = screen.getByTestId("delete-habit-button");

  await userEvent.click(deleteHabitButton);

  const confirmButton = screen.getAllByText(/yes/i);
  expect(confirmButton[0]).toBeInTheDocument();

  await userEvent.click(confirmButton[0]);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(mockHabit.id);
});

it("calls onDeleteHabitsCommentClick function by click on delete habit comment button", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: string }) => {
    return {
      id,
    };
  });

  render(
    <RenderWithToast>
      <Habit
        habitData={mockHabit}
        onDeleteHabitClick={() => {}}
        onAddCommentClick={() => {}}
        onDeleteHabitsCommentClick={mock}
      />
    </RenderWithToast>
  );

  const deleteHabitButton = screen.getAllByRole("button", {
    name: /delete habit icon/i,
  });

  await userEvent.click(deleteHabitButton[1]);

  const confirmButton = screen.getAllByText(/yes/i);
  expect(confirmButton[0]).toBeInTheDocument();

  await userEvent.click(confirmButton[0]);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith("lffe6zfy");
});

it("calls onAddCommentClick function by click on add habit comment button", async () => {
  const mock = jest
    .fn()
    .mockImplementation(({ comment }: { comment: string }) => {
      return {
        comment,
      };
    });

  render(
    <RenderWithToast>
      <Habit
        habitData={mockHabit}
        onDeleteHabitClick={() => {}}
        onAddCommentClick={mock}
        onDeleteHabitsCommentClick={() => {}}
      />
    </RenderWithToast>
  );

  const addCommentField = screen.getByRole("textbox");

  await userEvent.type(addCommentField, "Test comment");

  const addCommentButton = screen.getByRole("button", {
    name: /add/i,
  });

  await userEvent.click(addCommentButton);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith("Test comment");
});
