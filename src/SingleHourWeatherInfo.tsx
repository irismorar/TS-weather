import { weatherDictionary } from "./weatherDictionary";
import type processWeatherData from "./processWeatherData";

type WeatherData = ReturnType<typeof processWeatherData>;
type SingleHourData = WeatherData["data_for_the_next_24_hours"][number];

export function SingleHourWeatherInfo({
  time,
  weather_code,
  temperature,
}: SingleHourData) {
  return (
    <section className="one_hour_weather_info_container">
      <div>{time}</div>
      <div>{weatherDictionary[weather_code].icon}</div>
      <div>{temperature}</div>
    </section>
  );
}
