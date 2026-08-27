import cloudyIcon from '../assets/images/icon-overcast.webp'
import drizzleIcon from '../assets/images/icon-drizzle.webp'
import fogIcon from '../assets/images/icon-fog.webp'
import partlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp'
import rainIcon from '../assets/images/icon-rain.webp'
import snowIcon from '../assets/images/icon-snow.webp'
import stormIcon from '../assets/images/icon-storm.webp'
import sunnyIcon from '../assets/images/icon-sunny.webp'

const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search'
const forecastUrl = 'https://api.open-meteo.com/v1/forecast'

export function getWeatherDetails(code, isDay = 1) {
  if (code === 0) return { label: 'Clear sky', icon: sunnyIcon }
  if ([1, 2].includes(code)) return { label: 'Partly cloudy', icon: partlyCloudyIcon }
  if (code === 3) return { label: 'Overcast', icon: cloudyIcon }
  if ([45, 48].includes(code)) return { label: 'Fog', icon: fogIcon }
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: drizzleIcon }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain', icon: rainIcon }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: snowIcon }
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: stormIcon }
  return { label: isDay ? 'Clear sky' : 'Cloudy', icon: isDay ? sunnyIcon : cloudyIcon }
}

export async function searchPlaces(query, signal) {
  const params = new URLSearchParams({ name: query, count: '5', language: 'en', format: 'json' })
  const response = await fetch(`${geocodingUrl}?${params}`, { signal })
  if (!response.ok) throw new Error('Unable to find that location.')
  const { results = [] } = await response.json()
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
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    timezone: 'auto',
    forecast_days: '7',
    temperature_unit: units.temperature === 'fahrenheit' ? 'fahrenheit' : 'celsius',
    wind_speed_unit: units.windSpeed === 'mph' ? 'mph' : 'kmh',
    precipitation_unit: units.precipitation === 'inches' ? 'inch' : 'mm',
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day',
    hourly: 'temperature_2m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  })
  const response = await fetch(`${forecastUrl}?${params}`, { signal })
  if (!response.ok) throw new Error('Unable to load the weather forecast.')
  return response.json()
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00`))
}

export function formatDay(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(`${date}T12:00:00`))
}

export function formatHour(dateTime) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).format(new Date(dateTime))
}
