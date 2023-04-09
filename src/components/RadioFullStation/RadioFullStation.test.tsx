import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RadioFullStation from "./RadioFullStation";

const mockDialog = {
  radio: {
    id: "radio-1",
    name: "radio-1",
    stream: "stream.com",
  },
  selectedRadio: "radio-1",
  isPlaying: false,
};

it("renders correctly, if not selected and not playing", async () => {
  render(
    <RadioFullStation
      radio={mockDialog.radio}
      selectedRadioId=""
      isPlaying={mockDialog.isPlaying}
      onRadioClick={() => {}}
    />
  );

  const radioButton = screen.getByRole("button", {
    name: new RegExp(mockDialog.radio.name, "i"),
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toHaveClass("root-active");

  const radioPlayingIndicator = screen.queryByTestId("radio-is-playing");

  expect(radioPlayingIndicator).not.toBeInTheDocument();
});

it("renders correctly, if selected and not playing", async () => {
  render(
    <RadioFullStation
      radio={mockDialog.radio}
      selectedRadioId=""
      isPlaying={mockDialog.isPlaying}
      onRadioClick={() => {}}
    />
  );

  const radioButton = screen.getByRole("button", {
    name: new RegExp(mockDialog.radio.name, "i"),
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toHaveClass("root-active");

  const radioPlayingIndicator = screen.queryByTestId("radio-is-playing");

  expect(radioPlayingIndicator).not.toBeInTheDocument();
});

it("renders correctly, if not selected and playing", async () => {
  render(
    <RadioFullStation
      radio={mockDialog.radio}
      selectedRadioId=""
      isPlaying={mockDialog.isPlaying}
      onRadioClick={() => {}}
    />
  );

  const radioButton = screen.getByRole("button", {
    name: new RegExp(mockDialog.radio.name, "i"),
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).not.toHaveClass("root-active");

  const radioPlayingIndicator = screen.queryByTestId("radio-is-playing");

  expect(radioPlayingIndicator).not.toBeInTheDocument();
});

it("renders correctly, if selected and playing", async () => {
  render(
    <RadioFullStation
      radio={mockDialog.radio}
      selectedRadioId={mockDialog.selectedRadio}
      isPlaying
      onRadioClick={() => {}}
    />
  );

  const radioButton = screen.getByRole("button", {
    name: new RegExp(mockDialog.radio.name, "i"),
  });

  expect(radioButton).toBeInTheDocument();
  expect(radioButton).toHaveClass("root-active");

  const radioPlayingIndicator = screen.queryByTestId("radio-is-playing");

  expect(radioPlayingIndicator).toBeInTheDocument();
});

it("calls and passes correct props/args into onRadioButtonClick function by click on radio button", async () => {
  const mock = jest
    .fn()
    .mockImplementation(
      ({ radio }: { radio: { id: string; name: string; stream: string } }) => {
        return {
          radio,
        };
      }
    );

  render(
    <RadioFullStation
      radio={mockDialog.radio}
      selectedRadioId={mockDialog.selectedRadio}
      isPlaying
      onRadioClick={mock}
    />
  );

  const radioButton = screen.getByRole("button", {
    name: new RegExp(mockDialog.radio.name, "i"),
  });

  expect(radioButton).toBeInTheDocument();

  await userEvent.click(radioButton);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(mockDialog.radio);
});
