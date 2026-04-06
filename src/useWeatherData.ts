import { useState, useEffect } from "react";
import processLocationData from "./processLocationData.ts";
import processWeatherData from "./processWeatherData.ts";

export function useWeatherData() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataReadyState, setDataReadyState] = useState<
    "loading" | "error" | "ready"
  >("loading");
  const [dataError, setDataError] = useState("");
  const [weatherData, setWeatherData] = useState<object | null>(null);
  const [locationData, setLocationData] = useState<object | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherDataPromise = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,uv_index_max,weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,visibility&current=is_day,temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,wind_speed_10m,pressure_msl`,
        );
        const locationPromise = fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&zoom=18&format=json`,
          {
            method: "GET",
          },
        );

        const [weatherDataResponse, locationResponse] = await Promise.all([
          weatherDataPromise,
          locationPromise,
        ]);

        if (!weatherDataResponse.ok || !locationResponse.ok) {
          setDataReadyState("error");
          setDataError("Could not get weather data or location data.");
        }

        const [weatherResponseData, locationResponseData] = await Promise.all([
          weatherDataResponse.json(),
          locationResponse.json(),
        ]);

        setDataReadyState("ready");
        setWeatherData(processWeatherData(weatherResponseData));
        setLocationData(processLocationData(locationResponseData));
      },
      (error) => {
        setDataError(`Could not get current lat/long. ${error.message}`);
      },
    );
  }, []);

  return {
    dataError,
    weatherData,
    locationData,
  };
}
