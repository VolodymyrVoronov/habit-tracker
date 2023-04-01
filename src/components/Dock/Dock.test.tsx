import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import Dock from "./Dock";

it("renders dock items, which has 4 buttons", async () => {
  render(<Dock />);

  const buttons = screen.getAllByRole("menuitem");

  expect(buttons).toHaveLength(4);
});

it("leads to correct path/page by click on buttons", async () => {
  render(<Dock />, { wrapper: MemoryRouterProvider });

  const mainButton = screen.getByRole("menuitem", {
    name: /icon main/i,
  });
  const habitsButton = screen.getByRole("menuitem", {
    name: /icon habits/i,
  });
  const weatherButton = screen.getByRole("menuitem", {
    name: /icon weather/i,
  });
  const radioButton = screen.getByRole("menuitem", {
    name: /icon radio/i,
  });

  fireEvent.click(habitsButton);
  expect(mockRouter.asPath).toEqual("/habits");

  fireEvent.click(weatherButton);
  expect(mockRouter.asPath).toEqual("/weather");

  fireEvent.click(radioButton);
  expect(mockRouter.asPath).toEqual("/radio");

  fireEvent.click(mainButton);
  expect(mockRouter.asPath).toEqual("/");
});
