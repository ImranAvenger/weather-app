# Weather Now

Weather Now is a simple, responsive weather dashboard for checking current conditions and a seven-day forecast for cities around the world.

Search for a place to see its current temperature, feels-like temperature, humidity, wind, precipitation, daily forecast, and hourly forecast. Weather data is provided by [Open-Meteo](https://open-meteo.com/), so no API key is required.

## Using the app

1. Type a city or place name into the search field.
2. Choose a suggested location, or press **Search** to use the best match.
3. Use the **Units** menu to choose Celsius/Fahrenheit, km/h/mph, and millimetres/inches.
4. Select a day in the hourly forecast to view that day’s conditions.

The dashboard includes clear loading, no-result, and connection-error states. If the weather service is temporarily unavailable, select **Retry** to try the same request again.

## Features

- Global place search with Open-Meteo geocoding
- Live current weather and seven-day forecasts
- Hourly forecast by selected day
- Day/night-aware weather icons powered by Lucide
- Metric and imperial unit options
- Responsive layout for mobile and desktop
- Accessible search, loading, and error feedback

## Run locally

You need a current LTS version of [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev
```

Vite will show a local URL (usually `http://localhost:5173`) to open in your browser.

## Other commands

```bash
npm run lint    # Check code quality
npm run build   # Create a production build
npm run preview # Preview the production build locally
```

## Technology

- React and Vite
- Tailwind CSS
- Open-Meteo Forecast and Geocoding APIs
- Lucide React icons
