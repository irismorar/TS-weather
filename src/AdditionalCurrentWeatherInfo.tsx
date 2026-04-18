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
      <div className="weather_metric_card">
        <SunDim className="additional_weather_info_icon" />
        <div className="weather_metric_label">UV index</div>
        <div className="weather_metric_value">{uv_index}</div>
      </div>
      <div className="weather_metric_card">
        <Thermometer className="additional_weather_info_icon" />
        <div className="weather_metric_label">Feels like</div>
        <div className="weather_metric_value">{apparent_temperature}</div>
      </div>
      <div className="weather_metric_card">
        <Droplet className="additional_weather_info_icon" />
        <div className="weather_metric_label">Humidity</div>
        <div className="weather_metric_value">{humidity}</div>
      </div>
      <div className="weather_metric_card">
        <Wind className="additional_weather_info_icon" />
        <div className="weather_metric_label">Wind speed</div>
        <div className="weather_metric_value">{wind}</div>
      </div>
      <div className="weather_metric_card">
        <WindArrowDown className="additional_weather_info_icon" />
        <div className="weather_metric_label">Air pressure</div>
        <div className="weather_metric_value">{air_pressure}</div>
      </div>
      <div className="weather_metric_card">
        <Eye className="additional_weather_info_icon" />
        <div className="weather_metric_label">Visibility</div>
        <div className="weather_metric_value">{visibility}</div>
      </div>
    </section>
  );
}
