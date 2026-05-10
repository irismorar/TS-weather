import { Sunrise, Sunset } from "lucide-react";
import type processWeatherData from "./processWeatherData";

type WeatherData = ReturnType<typeof processWeatherData>;
type SunPosition = Pick<WeatherData, "sunrise" | "sunset">;

export function SunPositionInfo({ sunrise, sunset }: SunPosition) {
  const sunriseTime = `${String(sunrise.hour).padStart(2, "0")}:${String(
    sunrise.minutes,
  ).padStart(2, "0")}`;

  const sunsetTime = `${String(sunset.hour).padStart(2, "0")}:${String(
    sunset.minutes,
  ).padStart(2, "0")}`;

  return (
    <section className="sun_position_container">
      <div className="sun_position_row">
        <div>
          <Sunrise className="additional_weather_info_icon" />
          <span>Sunrise</span>
          <strong>{sunriseTime}</strong>
        </div>

        <div>
          <Sunset className="additional_weather_info_icon" />
          <span>Sunset</span>
          <strong>{sunsetTime}</strong>
        </div>
      </div>
      <div className="sun_arc_container">
        <div className="sun_arc"></div>
        <div className="sun_dot"></div>
      </div>
    </section>
  );
}
