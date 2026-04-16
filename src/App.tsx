import "./App.css";
import { useWeatherData } from "./useWeatherData";
import { weatherDictionary } from "./weatherDictionary";
import { CurrentWeatherInfo } from "./CurrentWeatherInfo";
import { SingleHourWeatherInfo } from "./SingleHourWeatherInfo";
import { SingleDayWeatherInfo } from "./SingleDayWeatherInfo";
import { AdditionalCurrentWeatherInfo } from "./AdditionalCurrentWeatherInfo";
import { SunPositionInfo } from "./SunPositionInfo";

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

  if (!weatherData || !locationData) {
    return <div>Missing data.{dataError}</div>;
  }

  const {
    current_time,
    current_date,
    today_name,
    is_day,
    current_weather_code,
    current_min_temperature,
    current_max_temperature,
    current_apparent_temperature,
    current_temperature,
    relative_humidity,
    wind_speed,
    air_pressure,
    visibility,
    sunrise,
    sunset,
    uv_index,
  } = weatherData;

  const { location } = locationData;

  return (
    <main>
      <CurrentWeatherInfo
        current_temperature={current_temperature}
        current_day_name={today_name}
        current_date={current_date}
        current_hour={current_time}
        current_weather_code={current_weather_code}
        weather_dictionary={weatherDictionary}
        current_min_temperature={current_min_temperature}
        current_max_temperature={current_max_temperature}
        location={location}
      />
      <section className="hourly_weather_info_container">
        {weatherData.data_for_the_next_24_hours.map((hour) => {
          return <SingleHourWeatherInfo key={hour.time} {...hour} />;
        })}
      </section>
      <section className="next_7_days_weather_info_container">
        {weatherData.data_for_the_next_7_days.map((date) => {
          return <SingleDayWeatherInfo key={date.day} {...date} />;
        })}
      </section>
      <AdditionalCurrentWeatherInfo
        uv_index={uv_index}
        apparent_temperature={current_apparent_temperature}
        humidity={relative_humidity}
        wind={wind_speed}
        air_pressure={air_pressure}
        visibility={visibility}
      />
      <SunPositionInfo sunrise={sunrise} sunset={sunset} />
    </main>
  );
}
