import { useState, useEffect } from "react";
import processLocationData from "./processLocationData.ts";
import processWeatherData from "./processWeatherData.ts";
import { WeatherDataSchema } from "./weatherSchema.ts";
import { LocationDataSchema } from "./locationSchema.ts";
import { ZodError } from "zod";

export function useWeatherData() {
  const [dataReadyState, setDataReadyState] = useState<
    "loading" | "error" | "ready"
  >("loading");
  const [dataError, setDataError] = useState("");
  const [weatherData, setWeatherData] = useState<ReturnType<
    typeof processWeatherData
  > | null>(null);
  const [locationData, setLocationData] = useState<ReturnType<
    typeof processLocationData
  > | null>(null);

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

        const [weatherResponse, locationResponse] = await Promise.all([
          weatherDataPromise,
          locationPromise,
        ]);

        if (!weatherResponse.ok || !locationResponse.ok) {
          setDataReadyState("error");
          setDataError("Could not get weather data or location data.");
        }

        const [weatherResponseData, locationResponseData] = await Promise.all([
          weatherResponse.json(),
          locationResponse.json(),
        ]);

        try {
          const validatedWeatherData =
            WeatherDataSchema.parse(weatherResponseData);
          const processedWeatherData = processWeatherData(validatedWeatherData);
          setDataReadyState("ready");
          setWeatherData(processedWeatherData);
        } catch (error) {
          setDataReadyState("error");
          if (error instanceof ZodError) {
            setDataError(
              `Weather API returned unexpected data, ${error.issues}`,
            );
          } else if (error instanceof Error) {
            setDataError(error.message);
          } else {
            setDataError("Something went wrong.");
          }
        }

        try {
          const validatedLocationData =
            LocationDataSchema.parse(locationResponseData);
          const processedLocationData = processLocationData(
            validatedLocationData,
          );
          setDataReadyState("ready");
          setLocationData(processedLocationData);
        } catch (error) {
          setDataReadyState("error");
          if (error instanceof ZodError) {
            setDataError(
              `Location API returned unexpected data, ${error.issues}`,
            );
          } else if (error instanceof Error) {
            setDataError(error.message);
          } else {
            setDataError("Something went wrong.");
          }
        }
      },
      (error) => {
        setDataReadyState("error");
        setDataError(`Could not get current lat/long. ${error.message}`);
      },
    );
  }, []);

  return {
    dataError,
    dataReadyState,
    weatherData,
    locationData,
  };
}
