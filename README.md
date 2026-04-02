# Weather App

A basic weather application built with TypeScript and React that shows accurate, location-based weather details for the user's current place.

## Features

1. Detects and displays weather information for the user's actual location
2. Shows the current and hourly temperature forecast
3. Displays today's minimum and maximum temperature
4. Provides a 7-day forecast with daily minimum and maximum temperatures
5. Shows sunrise and sunset times for the current day
6. Includes additional weather details such as:

- UV index
- Wind speed and direction
- Humidity
- Feels-like temperature
- Atmospheric pressure
- Visibility

## Tech Stack

- React
- TypeScript
- CSS for styling
- Weather API integration
- Geolocation API for detecting the user's current place
- pnpm for installation and run locally

## How It Works

1. The app requests access to the user's location.
2. After permission is granted, it fetches weather data for the detected place.
3. The UI displays:

- Current location weather
- Hourly temperature updates
- Today's low/high temperature
- 7-day low/high forecast
- Sunrise and sunset times
- Extra weather metrics like UV and wind
