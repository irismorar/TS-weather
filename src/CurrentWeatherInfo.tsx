import { weatherDictionary } from "./weatherDictionary";

type WeatherCode = keyof typeof weatherDictionary;

type Props = {
  current_temperature: string;
  current_day_name: string;
  current_date: string;
  current_hour: {
    hour: number;
    minutes: number;
  };
  current_weather_code: WeatherCode;
  weather_dictionary: typeof weatherDictionary;
  current_min_temperature: string;
  current_max_temperature: string;
  location: string;
};

export function CurrentWeatherInfo({
  current_temperature,
  current_day_name,
  current_date,
  current_hour: { hour, minutes },
  current_weather_code,
  weather_dictionary,
  current_min_temperature,
  current_max_temperature,
  location,
}: Props) {
  return (
    <section className="current_weather_info">
      <div className="current_weather_temeprature">{current_temperature}</div>
      <section>
        <span className="current_weather_date">
          {current_day_name}, {current_date} {hour < 10 ? "0" + hour : hour}:
          {minutes < 10 ? "0" + minutes : minutes}
        </span>
        <span className="current_weather_temperature_limits">
          {weather_dictionary[current_weather_code].name}{" "}
          {current_min_temperature}/{current_max_temperature}
        </span>
        <span className="location">{location}</span>
      </section>
    </section>
  );
}
