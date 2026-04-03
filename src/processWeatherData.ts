type ParsedData = {
  current: {
    time: string;
    is_day: number;
    apparent_temperature: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  current_units: {
    apparent_temperature: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
  daily: {
    sunrise: Array<string>;
    sunset: Array<string>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    time: Array<string>;
    uv_index_max: Array<number>;
    weather_code: Array<number>;
  };
};

export default function processWeatherData(weatherData: ParsedData) {
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

  const {
    current: {
      time: current_time,
      is_day,
      apparent_temperature: current_apparent_temperature,
      temperature_2m: current_temeprature,
      relative_humidity_2m: relative_humidity,
      weather_code: current_weather_code,
      wind_speed_10m: wind_speed,
    },
    current_units: {
      apparent_temperature: temperature_unit,
      relative_humidity_2m: humidity_unit,
      wind_speed_10m: wind_speed_unit,
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
  } = weatherData;

  const data_for_7_days = next_7_dates.map((date, index) => {
    return {
      day: `${date.slice(-2)} ${monthName[Number(date.slice(5, 7)) - 1]}`,
      weather_code: `${daily_weather_code[index]}`,
      daily_max_temperature: `${daily_max_temperature[index]}${temperature_unit}`,
      daily_min_temperature: `${daily_min_temperature[index]}${temperature_unit}`,
    };
  });

  const processedWeatherData = {
    current_time: {
      hour: new Date(current_time).getHours(),
      minutes: new Date(current_time).getMinutes(),
    },
    is_day: is_day === 0 ? "night" : "day",
    current_weather_code: current_weather_code,
    current_apparent_temperature: `${current_apparent_temperature}${temperature_unit}`,
    current_temperature: `${current_temeprature}${temperature_unit}`,
    relative_humidity: `${relative_humidity}${humidity_unit}`,
    wind_speed: `${wind_speed}${wind_speed_unit}`,
    sunrise: {
      hour: new Date(sunrise[0]).getHours(),
      minutes: new Date(sunrise[0]).getMinutes(),
    },
    sunset: {
      hour: new Date(sunset[0]).getHours(),
      minutes: new Date(sunset[0]).getMinutes(),
    },
    uv_index: daily_uv_index[0],
    data_for_7_days: data_for_7_days,
  };

  console.log(weatherData);
  return processedWeatherData;
}
