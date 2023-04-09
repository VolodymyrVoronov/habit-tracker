import { render, screen } from "@testing-library/react";

import WeatherForecastParameter from "./WeatherForecastParameter";

const mockWeatherForecastParameter = {
  parValue: "10",
  parTitle: "Temperature",
  parType: "°C",
};

it("renders correctly with passed props", () => {
  render(
    <WeatherForecastParameter
      parValue={mockWeatherForecastParameter.parValue}
      parTitle={mockWeatherForecastParameter.parTitle}
      parType={mockWeatherForecastParameter.parType}
    />
  );

  const title = screen.getByText(
    new RegExp(mockWeatherForecastParameter.parTitle, "i")
  );
  expect(title).toBeInTheDocument();

  const value = screen.getByText(
    new RegExp(mockWeatherForecastParameter.parValue, "i")
  );
  expect(value).toBeInTheDocument();

  const type = screen.getByText(
    new RegExp(mockWeatherForecastParameter.parType, "i")
  );
  expect(type).toBeInTheDocument();
});
