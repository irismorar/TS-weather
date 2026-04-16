import type processWeatherData from "./processWeatherData";
import { weatherDictionary } from "./weatherDictionary";

type WeatherData = ReturnType<typeof processWeatherData>;
type SingleDayData = WeatherData["data_for_the_next_7_days"][number];

export function SingleDayWeatherInfo({
  day,
  day_name,
  weather_code,
  daily_max_temperature,
  daily_min_temperature,
}: SingleDayData) {
  return (
    <section className="single_day_weather_info_container">
      <span>{day}</span>
      <span>{day_name}</span>
      <span>{weatherDictionary[weather_code].icon}</span>
      <span>
        {daily_min_temperature}/{daily_max_temperature}
      </span>
    </section>
  );
}
