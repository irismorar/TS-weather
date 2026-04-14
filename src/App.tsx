import "./App.css";
import { useWeatherData } from "./useWeatherData";
import { weatherDictionary } from "./weatherDictionary";
import type { ParsedWeatherData } from "./processWeatherData";
import processWeatherData from "./processWeatherData";
import type { ParsedLocationData } from "./processLocationData";
import processLocationData from "./processLocationData";
import { MainCurrentInfo } from "./MainCurrentInfo";

export default function App() {
  const { dataError, dataReadyState, weatherData, locationData } =
    useWeatherData();

  if (dataReadyState === "loading") {
    return (
      <div>
        <span className="loader"></span> Loading...
      </div>
    );
  }

  if (dataReadyState === "error") {
    return <div>{dataError}</div>;
  }

  const processedLocation = processLocationData(
    locationData as ParsedLocationData,
  );
  const processedWeather = processWeatherData(weatherData as ParsedWeatherData);

  const {
    current_time,
    current_date,
    today_name,
    current_weather_code,
    current_min_temperature,
    current_max_temperature,
    current_apparent_temperature,
    // is_day,
    // current_temperature,
    // relative_humidity,
    // wind_speed,
    // air_pressure,
    // visibility,
    // sunrise,
    // sunset,
    // uv_index,
    // data_for_the_next_24_hours,
    // data_for_the_next_7_days,
  } = processedWeather;

  return (
    <MainCurrentInfo
      current_temperature={current_apparent_temperature}
      current_day_name={today_name}
      current_date={current_date}
      current_hour={current_time}
      current_weather_code={current_weather_code}
      weather_dictionary={weatherDictionary}
      current_min_temperature={current_min_temperature}
      current_max_temperature={current_max_temperature}
      processed_location={processedLocation}
    />
  );
}
