import { render, screen } from "@testing-library/react";

import { IForecastDay } from "../../services/weatherApi";

import processString from "../../helpers/processString";

import WeatherWidgetFull from "./WeatherWidgetFull";

const mockWeatherWidgetFull: IForecastDay = {
  astro: {
    is_moon_up: 0,
    is_sun_up: 0,
    moon_illumination: "",
    moon_phase: "",
    moonrise: "",
    moonset: "",
    sunrise: "",
    sunset: "",
  },
  date: "2023-04-07 16:35",
  date_epoch: 0,
  day: {
    avghumidity: 62,
    avgtemp_c: 0,
    avgtemp_f: 0,
    avgvis_km: 0,
    avgvis_miles: 0,
    condition: {
      code: 0,
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      text: "Partly cloudy",
    },
    daily_chance_of_rain: 0,
    daily_chance_of_snow: 0,
    daily_will_it_rain: 0,
    daily_will_it_snow: 0,
    maxtemp_c: 30,
    maxtemp_f: 0,
    maxwind_kph: 20,
    maxwind_mph: 0,
    mintemp_c: 20,
    mintemp_f: 0,
    totalprecip_in: 0,
    totalprecip_mm: 0,
    totalsnow_cm: 0,
    uv: 0,
  },
  hour: [],
};

it("renders correctly", async () => {
  render(<WeatherWidgetFull data={mockWeatherWidgetFull} />);

  const date = screen.getByText(
    processString(mockWeatherWidgetFull.date, 0, 10, "-", true, "-")
  );
  expect(date).toBeInTheDocument();

  const icon = screen.getByRole("img", {
    name: new RegExp(mockWeatherWidgetFull.day.condition.text, "i"),
  });
  expect(icon).toBeInTheDocument();

  const condition = screen.getByText(
    new RegExp(mockWeatherWidgetFull.day.condition.text, "i")
  );
  expect(condition).toBeInTheDocument();

  const tempMin = screen.getByText(/20 °C/i);
  expect(tempMin).toBeInTheDocument();

  const tempMax = screen.getByText(/30 °C/i);
  expect(tempMax).toBeInTheDocument();

  const humidity = screen.getByText(/62 %/i);
  expect(humidity).toBeInTheDocument();

  const wind = screen.getByText(/20 km\/h/i);
  expect(wind).toBeInTheDocument();
});
