type WeatherBackgroundProps = {
  weatherCode: number;
  isDay: boolean;
};

export function WeatherBackground({
  weatherCode,
  isDay,
}: WeatherBackgroundProps) {
  const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
  const isSnowy = [71, 73, 75, 77, 85, 86].includes(weatherCode);
  const isMisty = [45, 48].includes(weatherCode);
  const isCloudy = [2, 3, 45, 48].includes(weatherCode);
  const isSunny = [0, 1].includes(weatherCode);

  return (
    <div className="weather_background">
      {isDay && isSunny && <div className="sun_animation"></div>}

      {!isDay && (
        <>
          <div className="moon_animation"></div>
          {Array.from({ length: 10 }).map((_, index) => {
            return <span key={index} className="star"></span>;
          })}
        </>
      )}

      {isCloudy && (
        <>
          <div className="cloud cloud_one"></div>
          <div className="cloud cloud_two"></div>
          <div className="cloud cloud_three"></div>
        </>
      )}

      {isMisty && (
        <>
          <div className="mist mist_one"></div>
          <div className="mist mist_two"></div>
          <div className="mist mist_three"></div>
        </>
      )}

      {isRainy &&
        Array.from({ length: 24 }).map((_, index) => {
          return (
            <span
              key={index}
              className="rain_drop"
              style={{ "--i": index } as React.CSSProperties}
            ></span>
          );
        })}

      {isSnowy &&
        Array.from({ length: 20 }).map((_, index) => {
          return (
            <span
              key={index}
              className="snowflake"
              style={{ "--i": index } as React.CSSProperties}
            >
              ❄
            </span>
          );
        })}
    </div>
  );
}
