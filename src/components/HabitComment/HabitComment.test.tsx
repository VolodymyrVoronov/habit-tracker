import { useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Toast } from "primereact/toast";
import { ConfirmPopup } from "primereact/confirmpopup";

import HabitComment from "./HabitComment";

const mockHabitComment = {
  id: "1",
  comment: "This is a comment",
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

it("renders comment", async () => {
  render(
    <HabitComment
      id={mockHabitComment.id}
      comment={mockHabitComment.comment}
      onDeleteClick={() => {}}
    />
  );

  const comment = screen.getByText(mockHabitComment.comment);
  expect(comment).toBeInTheDocument();
});

it("calls and passes correct props/args into onClick function by click on 'yes' button", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: string }) => {
    return {
      id,
    };
  });

  render(
    <RenderWithToast>
      <HabitComment
        id={mockHabitComment.id}
        comment={mockHabitComment.comment}
        onDeleteClick={mock}
      />
    </RenderWithToast>
  );

  const deleteButton = screen.getByRole("button", {
    name: /delete habit icon/i,
  });
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  const confirmButton = screen.getByText(/yes/i);
  expect(confirmButton).toBeInTheDocument();
  fireEvent.click(confirmButton);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(mockHabitComment.id);
});

it("does not call onClick function by click on 'no' button", async () => {
  const mock = jest.fn().mockImplementation(({ id }: { id: string }) => {
    return {
      id,
    };
  });

  render(
    <RenderWithToast>
      <HabitComment
        id={mockHabitComment.id}
        comment={mockHabitComment.comment}
        onDeleteClick={mock}
      />
    </RenderWithToast>
  );

  const deleteButton = screen.getByRole("button", {
    name: /delete habit icon/i,
  });
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  const cancelButton = screen.getByText(/no/i);
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);

  expect(mock).not.toHaveBeenCalled();
});
