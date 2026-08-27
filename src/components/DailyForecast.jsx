import { formatDay, getWeatherDetails } from '../lib/weather'
import WeatherIcon from './WeatherIcon'

export default function DailyForecast({ weather, isLoading }) {
  // Daily arrays share matching indexes, so combine each date with its weather values.
  const daily = weather?.daily
  const temperatureUnit = weather?.daily_units?.temperature_2m_max || '°C'
  const forecast = daily?.time?.map((date, index) => ({
    date,
    maxTemp: daily.temperature_2m_max[index],
    minTemp: daily.temperature_2m_min[index],
    ...getWeatherDetails(daily.weather_code[index]),
  })) || []
  return (
    // Show fixed-size blank cards while data is loading to preserve the dashboard layout.
    <section className='daily-section rounded-[20px]' aria-label='Daily forecast'>
      <div className='daily-heading'>
        <h2 className='brand-heading font-bold text-white'>Daily forecast</h2>
      </div>

      <div className='daily-grid grid'>
        {isLoading ? Array.from({ length: 7 }, (_, index) => (
          <div key={index} aria-hidden='true' className='daily-card w-full rounded-[18px] border border-white/8 bg-[#1b2243] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' />
        // Once loaded, render the API-provided forecast for each day.
        )) : forecast.map((item) => (
          <div
            key={item.date}
            className='daily-card flex w-full flex-col items-center justify-between gap-2 rounded-[18px] border border-white/8 bg-[#1b2243] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
          >
            <span className='text-sm font-medium text-[#eaf0ff]'>{formatDay(item.date)}</span>
            <WeatherIcon condition={item} className='h-8 w-8' />
            <div className='flex items-center gap-2 text-sm font-semibold text-white'>
              <span>{Math.round(item.maxTemp)}{temperatureUnit}</span>
              <span className='text-[#d6d8e9]'>{Math.round(item.minTemp)}{temperatureUnit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
