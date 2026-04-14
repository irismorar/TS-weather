import { weatherDictionary } from "./weatherDictionary";

type WeatherCode = keyof typeof weatherDictionary;

export type ParsedWeatherData = {
  current: {
    time: string;
    is_day: number;
    apparent_temperature: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: WeatherCode;
    wind_speed_10m: number;
    pressure_msl: Array<number>;
  };
  current_units: {
    apparent_temperature: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    pressure_msl: string;
  };
  daily: {
    sunrise: Array<string>;
    sunset: Array<string>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    time: Array<string>;
    uv_index_max: Array<number>;
    weather_code: Array<WeatherCode>;
  };
  hourly: {
    temperature_2m: Array<number>;
    time: Array<string>;
    visibility: Array<number>;
    weather_code: Array<WeatherCode>;
  };
  hourly_units: {
    visibility: string;
  };
};

export default function processWeatherData(weatherData: ParsedWeatherData) {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const {
    current: {
      time: current_time,
      is_day,
      apparent_temperature: current_apparent_temperature,
      temperature_2m: current_temeprature,
      relative_humidity_2m: relative_humidity,
      weather_code: current_weather_code,
      wind_speed_10m: wind_speed,
      pressure_msl: current_air_pressure,
    },
    current_units: {
      apparent_temperature: temperature_unit,
      relative_humidity_2m: humidity_unit,
      wind_speed_10m: wind_speed_unit,
      pressure_msl: air_pressure_unit,
    },
    daily: {
      sunrise,
      sunset,
      temperature_2m_max: daily_max_temperature,
      temperature_2m_min: daily_min_temperature,
      time: next_7_dates,
      uv_index_max: daily_uv_index,
      weather_code: daily_weather_code,
    },
    hourly: {
      temperature_2m: hourly_temperature,
      time: hourly_time,
      visibility: hourly_visibility,
      weather_code: hourly_weather_code,
    },
  } = weatherData;

  const todayName = dayName[new Date(current_time).getDay()];

  const current_hour_index = hourly_time
    .slice(0, 24)
    .findIndex(
      (indexItem) => new Date().getHours() === new Date(indexItem).getHours(),
    );

  const start_index = current_hour_index !== -1 ? current_hour_index : 0;
  const next_24_hours = hourly_time.slice(start_index, start_index + 24);
  const data_for_the_next_24_hours = next_24_hours.map((hour, index) => {
    return {
      time: new Date(hour).getHours(),
      weather_code: hourly_weather_code[start_index + index],
      temperature: `${hourly_temperature[start_index + index]}${temperature_unit}`,
    };
  });

  const current_visibility = hourly_visibility[current_hour_index] / 1000;

  const data_for_the_next_7_days = next_7_dates.map((date, index) => {
    return {
      day: `${new Date(date).getDate()} ${monthName[Number(date.slice(5, 7)) - 1]}`,
      weather_code: `${daily_weather_code[index]}`,
      daily_max_temperature: `${daily_max_temperature[index]}${temperature_unit}`,
      daily_min_temperature: `${daily_min_temperature[index]}${temperature_unit}`,
    };
  });

  const current_min_temperature =
    data_for_the_next_7_days[0].daily_min_temperature;
  const current_max_temperature =
    data_for_the_next_7_days[0].daily_max_temperature;

  const processedWeatherData = {
    current_time: {
      hour: new Date().getHours(),
      minutes: new Date().getMinutes(),
    },
    current_date: data_for_the_next_7_days[0].day,
    today_name: todayName,
    is_day: is_day === 0 ? "night" : "day",
    current_weather_code: current_weather_code,
    current_min_temperature,
    current_max_temperature,
    current_apparent_temperature: `${current_apparent_temperature}${temperature_unit}`,
    current_temperature: `${current_temeprature}${temperature_unit}`,
    relative_humidity: `${relative_humidity}${humidity_unit}`,
    wind_speed: `${wind_speed}${wind_speed_unit}`,
    air_pressure: `${current_air_pressure}${air_pressure_unit}`,
    visibility: `${current_visibility}km`,
    sunrise: {
      hour: new Date(sunrise[0]).getHours(),
      minutes: new Date(sunrise[0]).getMinutes(),
    },
    sunset: {
      hour: new Date(sunset[0]).getHours(),
      minutes: new Date(sunset[0]).getMinutes(),
    },
    uv_index: daily_uv_index[0],
    data_for_the_next_24_hours: data_for_the_next_24_hours,
    data_for_the_next_7_days: data_for_the_next_7_days,
  };

  console.log(weatherData);
  console.log(processedWeatherData);
  return processedWeatherData;
}
