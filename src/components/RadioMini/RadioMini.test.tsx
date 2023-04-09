import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";

import { useRadioGlobalState } from "../../state/radioGlobalState";

import radioStreams from "../../constants/radioStreams";

import RadioMini from "./RadioMini";

it("renders correctly, if no radio selected", async () => {
  const { result } = renderHook(() => useRadioGlobalState());

  render(<RadioMini />);

  const dropdown = screen.getByTestId("dropdown");
  expect(dropdown).toBeInTheDocument();

  const textNoRadioSelected = screen.getByText(/select a radio/i);
  expect(within(dropdown).getByText(/empty/i)).toBeInTheDocument();
  expect(textNoRadioSelected).toBeInTheDocument();

  const radioPlayingIndicator = screen.queryByTestId("radio-is-playing");
  expect(radioPlayingIndicator).not.toBeInTheDocument();

  expect(result.current.getRadio()).toStrictEqual({
    id: "",
    name: "",
    stream: "",
  });
  expect(result.current.getPlaying()).toBe(false);
  expect(result.current.getMuted()).toBe(false);
});

it("shows radios by click on dropdown", async () => {
  render(<RadioMini />);

  const dropdown = screen.getByTestId("dropdown");
  await userEvent.click(dropdown);

  for (let i = 0; i < radioStreams.length; i += 1) {
    const radioStream = screen.getByText(radioStreams[i].name);

    expect(radioStream).toBeInTheDocument();
  }
});

it("starts playing selected radio by click on it and all renders correctly", async () => {
  const { result } = renderHook(() => useRadioGlobalState());

  render(<RadioMini />);

  const dropdown = screen.getByTestId("dropdown");
  await userEvent.click(dropdown);

  const firstRadio = screen.getByText(radioStreams[0].name);
  await userEvent.click(firstRadio);

  expect(result.current.getRadio()).toStrictEqual(radioStreams[0]);
  expect(result.current.getPlaying()).toBe(true);
  expect(result.current.getMuted()).toBe(false);

  expect(dropdown).toHaveClass("select-playing");

  await waitFor(() => {
    const textRadioSelected = screen.queryByText(/select a radio/i);
    expect(textRadioSelected).not.toBeInTheDocument();

    const radioPlayingIndicator = screen.queryByTestId("radio-is-playing");
    expect(radioPlayingIndicator).toBeInTheDocument();
  });

  const playButton = screen.getByRole("button", {
    name: /pause button/i,
  });

  const soundButton = screen.getByRole("button", {
    name: /sound on/i,
  });

  expect(playButton).not.toBeDisabled();
  expect(soundButton).not.toBeDisabled();
});
