import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";

import { useRadioGlobalState } from "../../state/radioGlobalState";

import radioStreams from "../../constants/radioStreams";

import RadioFullStations from "./RadioFullStations";

it("renders correctly", () => {
  render(<RadioFullStations />);

  const radios = screen.getAllByRole("button");

  expect(radios).toHaveLength(radioStreams.length);
});

it("calls and passes correct values into state by click on radio button", async () => {
  const { result } = renderHook(() => useRadioGlobalState());

  render(<RadioFullStations />);

  const radioButtonOne = screen.getByRole("button", {
    name: new RegExp(radioStreams[0].name, "i"),
  });

  expect(radioButtonOne).toBeInTheDocument();

  await waitFor(() => {
    userEvent.click(radioButtonOne);
  });

  await waitFor(() => {
    expect(result.current.getRadio()).toStrictEqual(radioStreams[0]);
    expect(result.current.getPlaying()).toBe(true);
    expect(radioButtonOne).toHaveClass("root-active");
  });

  const radioButtonTwo = screen.getByRole("button", {
    name: new RegExp(radioStreams[1].name, "i"),
  });

  expect(radioButtonTwo).toBeInTheDocument();

  await waitFor(() => {
    userEvent.click(radioButtonTwo);
  });

  await waitFor(() => {
    expect(result.current.getRadio()).toStrictEqual(radioStreams[1]);
    expect(result.current.getPlaying()).toBe(true);
    expect(radioButtonTwo).toHaveClass("root-active");
    expect(radioButtonOne).not.toHaveClass("root-active");
  });
});
