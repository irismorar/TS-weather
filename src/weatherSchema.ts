import * as z from "zod";
import { weatherDictionary } from "./weatherDictionary";

export const WeatherDataSchema = z.object({
  current: z.object({
    time: z.string(),
    is_day: z.number(),
    apparent_temperature: z.number(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    weather_code: z.literal(
      Object.keys(weatherDictionary).map(
        Number,
      ) as (keyof typeof weatherDictionary)[],
    ),
    wind_speed_10m: z.number(),
    pressure_msl: z.number(),
  }),
  current_units: z.object({
    apparent_temperature: z.string(),
    relative_humidity_2m: z.string(),
    wind_speed_10m: z.string(),
    pressure_msl: z.string(),
  }),
  daily: z.object({
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    time: z.array(z.string()),
    uv_index_max: z.array(z.number()),
    weather_code: z.array(
      z.literal(
        Object.keys(weatherDictionary).map(Number) as [
          keyof typeof weatherDictionary,
          ...Array<keyof typeof weatherDictionary>,
        ],
      ),
    ),
  }),
  hourly: z.object({
    temperature_2m: z.array(z.number()),
    time: z.array(z.string()),
    visibility: z.array(z.number()),
    weather_code: z.array(
      z.literal(
        Object.keys(weatherDictionary).map(Number) as [
          keyof typeof weatherDictionary,
          ...Array<keyof typeof weatherDictionary>,
        ],
      ),
    ),
  }),
  hourly_units: z.object({
    visibility: z.string(),
  }),
});

export type WeatherData = z.infer<typeof WeatherDataSchema>;
