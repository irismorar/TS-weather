type WeatherBackgroundProps = {
  weatherCode: number;
};

export function WeatherBackground({ weatherCode }: WeatherBackgroundProps) {
  const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
  const isSnowy = [71, 73, 75, 77, 85, 86].includes(weatherCode);
  const isCloudy = [2, 3, 45, 48].includes(weatherCode);
  const isSunny = [0, 1].includes(weatherCode);

  return (
    <div className="weather_background">
      {isSunny && <div className="sun_animation" />}

      {isCloudy && (
        <>
          <div className="cloud cloud_one" />
          <div className="cloud cloud_two" />
          <div className="cloud cloud_three" />
        </>
      )}

      {isRainy &&
        Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className="rain_drop"
            style={{ "--i": index } as React.CSSProperties}
          />
        ))}

      {isSnowy &&
        Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            className="snowflake"
            style={{ "--i": index } as React.CSSProperties}
          >
            ❄
          </span>
        ))}
    </div>
  );
}
