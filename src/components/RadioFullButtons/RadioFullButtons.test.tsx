import { render, screen, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useRadioGlobalState } from "../../state/radioGlobalState";

import RadioFullButtons from "./RadioFullButtons";

it("renders correctly", () => {
  render(<RadioFullButtons />);

  const playButton = screen.getByRole("button", {
    name: /play button/i,
  });

  expect(playButton).toBeInTheDocument();

  const muteButton = screen.getByRole("button", {
    name: /sound on/i,
  });

  expect(muteButton).toBeInTheDocument();
});

it("renders correctly by clicking on play/pause button", async () => {
  const { result } = renderHook(() => useRadioGlobalState());

  render(<RadioFullButtons />);

  expect(
    screen.queryByRole("button", {
      name: /play button/i,
    })
  ).toBeInTheDocument();

  act(() => {
    result.current.setPlaying(!result.current.getPlaying());
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /pause button/i,
      })
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /play button/i,
      })
    ).not.toBeInTheDocument();
  });

  act(() => {
    result.current.setPlaying(!result.current.getPlaying());
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /pause button/i,
      })
    ).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /play button/i,
      })
    ).toBeInTheDocument();
  });
});

it("renders correctly by clicking on sound on/off button", async () => {
  const { result } = renderHook(() => useRadioGlobalState());

  render(<RadioFullButtons />);

  expect(
    screen.queryByRole("button", {
      name: /sound on/i,
    })
  ).toBeInTheDocument();

  act(() => {
    result.current.setMuted(!result.current.getMuted());
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /sound off/i,
      })
    ).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /sound on/i,
      })
    ).not.toBeInTheDocument();
  });

  act(() => {
    result.current.setMuted(!result.current.getMuted());
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /sound off/i,
      })
    ).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", {
        name: /sound on/i,
      })
    ).toBeInTheDocument();
  });
});

it("renders correctly if no radio selected", async () => {
  render(<RadioFullButtons />);

  const playButton = screen.getByTestId("play-button");
  const soundButton = screen.getByTestId("sound-button");

  expect(playButton).toBeInTheDocument();
  expect(soundButton).toBeInTheDocument();

  expect(playButton).toBeDisabled();
  expect(soundButton).toBeDisabled();
});
