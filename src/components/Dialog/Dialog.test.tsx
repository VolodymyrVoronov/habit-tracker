import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dialog from "./Dialog";

const mockDialog = {
  headerTitle: "Header",
  isVisible: true,
  footerContent: <div>Footer content</div>,
};

it("renders correctly and shows content if isVisible true", async () => {
  render(
    <Dialog
      headerTitle={mockDialog.headerTitle}
      isVisible={mockDialog.isVisible}
      footerContent={mockDialog.footerContent}
      onHideClick={() => {}}
    />
  );

  const title = screen.getByText(mockDialog.headerTitle);
  expect(title).toBeInTheDocument();

  const footer = screen.getByText(/footer content/i);
  expect(footer).toBeInTheDocument();
});

it("renders correctly and does not show content if isVisible false", async () => {
  render(
    <Dialog
      headerTitle={mockDialog.headerTitle}
      isVisible={false}
      footerContent={mockDialog.footerContent}
      onHideClick={() => {}}
    />
  );

  const title = screen.queryByText(mockDialog.headerTitle);
  expect(title).not.toBeInTheDocument();

  const footer = screen.queryByText(/footer content/i);
  expect(footer).not.toBeInTheDocument();
});

it("calls and passes correct props/args into onHideClick function by click on close button", async () => {
  const mock = jest.fn().mockImplementation(({ flag }: { flag: boolean }) => {
    return {
      flag,
    };
  });

  render(
    <Dialog
      headerTitle={mockDialog.headerTitle}
      isVisible={mockDialog.isVisible}
      footerContent={mockDialog.footerContent}
      onHideClick={mock}
    />
  );

  const closeButton = screen.getByRole("button", {
    name: /close/i,
  });

  expect(closeButton).toBeInTheDocument();

  await userEvent.click(closeButton);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(false);
});
