import {
  SunDim,
  Droplet,
  Thermometer,
  Wind,
  WindArrowDown,
  Eye,
} from "lucide-react";

type Props = {
  uv_index: number;
  apparent_temperature: string;
  humidity: string;
  wind: string;
  air_pressure: string;
  visibility: string;
};

export function AdditionalCurrentWeatherInfo({
  uv_index,
  apparent_temperature,
  humidity,
  wind,
  air_pressure,
  visibility,
}: Props) {
  return (
    <section className="additional_current_weather_info_container">
      <div>
        <SunDim className="additional_weather_info_icon" />
        <div>UV index</div>
        <div>{uv_index}</div>
      </div>
      <div>
        <Thermometer className="additional_weather_info_icon" />
        <div>Feels like</div>
        <div>{apparent_temperature}</div>
      </div>
      <div>
        <Droplet className="additional_weather_info_icon" />
        <div>Humidity</div>
        <div>{humidity}</div>
      </div>
      <div>
        <Wind className="additional_weather_info_icon" />
        <div>Wind speed</div>
        <div>{wind}</div>
      </div>
      <div>
        <WindArrowDown className="additional_weather_info_icon" />
        <div>Air pressure</div>
        <div>{air_pressure}</div>
      </div>
      <div>
        <Eye className="additional_weather_info_icon" />
        <div>Visibility</div>
        <div>{visibility}</div>
      </div>
    </section>
  );
}
