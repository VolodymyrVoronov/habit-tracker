import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WeatherSearch from "./WeatherSearch";

const mockWeatherSearch = {
  city: "",
  isLoading: false,
};

it("renders correctly", async () => {
  render(
    <WeatherSearch
      city={mockWeatherSearch.city}
      isLoading={mockWeatherSearch.isLoading}
      onSearchChange={() => {}}
      onSearchClick={() => {}}
    />
  );

  const input = screen.getByRole("textbox", {
    name: /search city/i,
  });

  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("");

  const searchButton = screen.getByRole("button", {
    name: /search city/i,
  });

  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeDisabled();
});

it("calls and passes correct values by typing in input", async () => {
  const mock = jest
    .fn()
    .mockImplementation(({ e }: { e: React.ChangeEvent<HTMLInputElement> }) => {
      return {
        e,
      };
    });

  render(
    <WeatherSearch
      city="London"
      isLoading={mockWeatherSearch.isLoading}
      onSearchChange={mock}
      onSearchClick={() => {}}
    />
  );

  const input = screen.getByRole("textbox", {
    name: /search city/i,
  });

  await userEvent.type(input, "London");

  expect(mock).toHaveBeenCalled();
  expect(mock).toBeCalledTimes(6);

  await waitFor(() => {
    expect(input).toHaveValue("London");
  });

  const searchButton = screen.getByRole("button", {
    name: /search city/i,
  });

  expect(searchButton).not.toBeDisabled();
});

it("disables search button if loading", async () => {
  render(
    <WeatherSearch
      city="London"
      isLoading
      onSearchChange={() => {}}
      onSearchClick={() => {}}
    />
  );

  const searchButton = screen.getByRole("button", {
    name: /search city/i,
  });

  expect(searchButton).toBeDisabled();
});

it("disables search button if no city", async () => {
  render(
    <WeatherSearch
      city=""
      isLoading={mockWeatherSearch.isLoading}
      onSearchChange={() => {}}
      onSearchClick={() => {}}
    />
  );

  const searchButton = screen.getByRole("button", {
    name: /search city/i,
  });

  expect(searchButton).toBeDisabled();
});

it("clicks on search button, if not loading and city not empty", async () => {
  const mock = jest.fn();

  render(
    <WeatherSearch
      city="London"
      isLoading={mockWeatherSearch.isLoading}
      onSearchChange={() => {}}
      onSearchClick={mock}
    />
  );

  const searchButton = screen.getByRole("button", {
    name: /search city/i,
  });

  await userEvent.click(searchButton);

  expect(mock).toHaveBeenCalled();
});
