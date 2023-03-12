const API_KEY = "7b49eae9ef3d4a31bfa171753231203&q";
const API_URL = "https://api.weatherapi.com/v1/";

const getWeatherForecast = async (city: string): Promise<void> => {
  const res = await fetch(
    `${API_URL}forecast.json?key=${API_KEY}=${city}&days=3`
  );

  return res.json();
};

export default getWeatherForecast;
