import { Sunrise, Sunset } from "lucide-react";
import type processWeatherData from "./processWeatherData";

type WeatherData = ReturnType<typeof processWeatherData>;
type SunPosition = Pick<WeatherData, "sunrise" | "sunset">;

export function SunPositionInfo({ sunrise, sunset }: SunPosition) {
  return (
    <section className="sun_position_container">
      <section className="sun_position_header">
        <div>
          <Sunrise />
          <div>Sunrise</div>
        </div>
        <div>
          <Sunset />
          <div>Sunset</div>
        </div>
      </section>
      <div className="sun_position_hours">
        <span>
          {" "}
          {sunrise.hour < 10 ? "0" + sunrise.hour : sunrise.hour}:
          {sunrise.minutes < 10 ? "0" + sunrise.minutes : sunrise.minutes}
        </span>
        <span>
          {" "}
          {sunset.hour < 10 ? "0" + sunset.hour : sunset.hour}:
          {sunset.minutes < 10 ? "0" + sunset.minutes : sunset.minutes}
        </span>
      </div>
    </section>
  );
}
