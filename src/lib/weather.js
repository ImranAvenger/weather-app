// Open-Meteo exposes separate public endpoints for place lookup and weather data.
const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search'
const forecastUrl = 'https://api.open-meteo.com/v1/forecast'

export function getWeatherDetails(code, isDay = 1) {
  // Open-Meteo weather_code uses WMO weather interpretation codes.
  const isNight = Number(isDay) === 0
  const details = { code, isNight }

  // Map WMO codes to concise labels and icon keys consumed by WeatherIcon.
  if (code === 0) return { ...details, label: isNight ? 'Clear night' : 'Clear sky', icon: isNight ? 'moon' : 'sun' }
  if ([1, 2].includes(code)) return { ...details, label: isNight ? 'Partly cloudy night' : 'Partly cloudy', icon: isNight ? 'partlyCloudyNight' : 'partlyCloudyDay' }
  if (code === 3) return { ...details, label: 'Overcast', icon: 'cloudy' }
  if ([45, 48].includes(code)) return { ...details, label: 'Fog', icon: 'fog' }
  if ([51, 53, 55, 56, 57].includes(code)) return { ...details, label: 'Drizzle', icon: 'drizzle' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { ...details, label: 'Rain', icon: 'rain' }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { ...details, label: 'Snow', icon: 'snow' }
  if ([95, 96, 99].includes(code)) return { ...details, label: 'Thunderstorm', icon: 'storm' }
  return { ...details, label: isNight ? 'Cloudy night' : 'Cloudy', icon: 'cloudy' }
}

export async function searchPlaces(query, signal) {
  const params = new URLSearchParams({ name: query, count: '5', language: 'en', format: 'json' })
  const response = await fetch(`${geocodingUrl}?${params}`, { signal })
  if (!response.ok) throw new Error('Unable to find that location.')
  const { results = [] } = await response.json()
  // Keep only the fields the UI needs from the larger geocoding response.
  return results.map((place) => ({
    id: String(place.id),
    name: place.name,
    region: place.admin1,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone,
  }))
}

export async function getForecast(place, units, signal) {
  // Send display-unit preferences to Open-Meteo so no client-side conversion is needed.
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    timezone: 'auto',
    forecast_days: '7',
    temperature_unit: units.temperature === 'fahrenheit' ? 'fahrenheit' : 'celsius',
    wind_speed_unit: units.windSpeed === 'mph' ? 'mph' : 'kmh',
    precipitation_unit: units.precipitation === 'inches' ? 'inch' : 'mm',
    // Current precipitation represents the most recent 15-minute interval.
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day',
    hourly: 'temperature_2m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  })
  const response = await fetch(`${forecastUrl}?${params}`, { signal })
  if (!response.ok) throw new Error('Unable to load the weather forecast.')
  return response.json()
}

export function formatDate(date) {
  // A midday time avoids rendering a date on the prior day in negative UTC offsets.
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00`))
}

export function formatDay(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(`${date}T12:00:00`))
}

export function formatHour(dateTime) {
  // The forecast request uses timezone=auto, so these ISO strings represent local time.
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).format(new Date(dateTime))
}
