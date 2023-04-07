import { render, screen } from "@testing-library/react";

import { IWeatherDataResponse } from "../../services/weatherApi";

import processString from "../../helpers/processString";

import WeatherWidgetMini from "./WeatherWidgetMini";

const mockWeatherWidgetMini: IWeatherDataResponse = {
  current: {
    cloud: 0,
    condition: {
      code: 0,
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      text: "Partly cloudy",
    },
    feelslike_c: 25,
    feelslike_f: 0,
    gust_kph: 0,
    gust_mph: 0,
    humidity: 62,
    is_day: 0,
    last_updated: "2023-04-07 16:30",
    last_updated_epoch: 0,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 20,
    temp_f: 0,
    uv: 0,
    vis_km: 0,
    vis_miles: 0,
    wind_degree: 0,
    wind_dir: "SW",
    wind_kph: 20,
    wind_mph: 0,
  },
  forecast: {
    forecastday: [],
  },
  location: {
    country: "Germany",
    lat: 0,
    localtime: "2023-04-07 16:35",
    localtime_epoch: 0,
    lon: 0,
    name: "Karlsruhe",
    region: "Baden-Wurttemberg",
    tz_id: "Europe/Berlin",
  },
};

it("renders correctly", async () => {
  render(<WeatherWidgetMini data={mockWeatherWidgetMini} />);

  const city = screen.getByText(mockWeatherWidgetMini.location.name);
  expect(city).toBeInTheDocument();

  const country = screen.getByText(mockWeatherWidgetMini.location.country);
  expect(country).toBeInTheDocument();

  const date = screen.getByText(
    processString(
      mockWeatherWidgetMini.location.localtime,
      0,
      10,
      "-",
      true,
      "-"
    )
  );
  expect(date).toBeInTheDocument();

  const condition = screen.getByText(
    new RegExp(mockWeatherWidgetMini.current.condition.text, "i")
  );
  expect(condition).toBeInTheDocument();

  const temp = screen.getByText(/20 °C/i);
  expect(temp).toBeInTheDocument();

  const tempFeelsLike = screen.getByText(/25 °C/i);
  expect(tempFeelsLike).toBeInTheDocument();

  const humidity = screen.getByText(/62 %/i);
  expect(humidity).toBeInTheDocument();

  const wind = screen.getByText(/20 km\/h/i);
  expect(wind).toBeInTheDocument();

  const windDir = screen.getByText(
    new RegExp(mockWeatherWidgetMini.current.wind_dir, "i")
  );
  expect(windDir).toBeInTheDocument();

  const icon = screen.getByRole("img", {
    name: new RegExp(mockWeatherWidgetMini.current.condition.text, "i"),
  });
  expect(icon).toBeInTheDocument();
});
