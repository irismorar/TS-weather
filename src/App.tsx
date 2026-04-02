import "./App.css";
import { useWeatherData } from "./useWeatherData";

export default function App() {
  const { dataError, weatherData, locationData } = useWeatherData();
  return <div>lalalala</div>;
}
