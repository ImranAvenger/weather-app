import { useMemo, useState } from 'react'
import ForecastDaySelector from './ForecastDaySelector'
import { formatHour, getWeatherDetails } from '../lib/weather'
import WeatherIcon from './WeatherIcon'

export default function HourlyForecastCard({ weather, isLoading }) {
  // Daily dates populate the selector; hourly values populate rows for the active date.
  const days = weather?.daily?.time || []
  const [selectedDay, setSelectedDay] = useState('')
  const temperatureUnit = weather?.hourly_units?.temperature_2m || '°C'

  // The selected day can disappear when a new forecast arrives; fall back to day one.
  const activeDay = days.includes(selectedDay) ? selectedDay : (days[0] || '')

  const currentHourlyList = useMemo(() => {
    const hourly = weather?.hourly
    if (!hourly || !activeDay) return []
    // Open-Meteo supplies one flat hourly timeline, so group it by its YYYY-MM-DD prefix.
    return hourly.time.reduce((items, time, index) => {
      if (!time.startsWith(activeDay)) return items
      items.push({ time, temp: hourly.temperature_2m[index], ...getWeatherDetails(hourly.weather_code[index], hourly.is_day[index]) })
      return items
    }, [])
  }, [weather, activeDay])

  return (
    // This aside is the secondary, scrollable forecast panel.
    <aside className='hourly-panel flex w-full flex-col rounded-[22px] border border-white/10 bg-[#131d3b]/90'>
      <div className='hourly-header flex items-center justify-between gap-3'>
        <h3 className='brand-heading font-bold text-white'>Hourly forecast</h3>

        <ForecastDaySelector days={days} selectedDay={activeDay} onChange={setSelectedDay} formatDay />
      </div>

      <div className='hourly-list flex min-h-0 flex-1 flex-col overflow-y-auto'>
        {/* Empty rows preserve the panel height while the forecast request is in flight. */}
        {isLoading ? Array.from({ length: 8 }, (_, index) => (
          <div key={index} aria-hidden='true' className='hourly-row min-h-11 rounded-2xl border border-white/8 bg-[#1a2240]' />
        )) : currentHourlyList.map((item) => (
          <div
            key={item.time}
            className='hourly-row flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-[#1a2240] transition hover:bg-[#1e2948]'
          >
            <div className='flex items-center gap-2.5'>
              <WeatherIcon condition={item} className='h-6 w-6' />
              <span className='text-sm text-[#dfe6ff]'>{formatHour(item.time)}</span>
            </div>

            <span className='text-sm font-semibold text-white'>{Math.round(item.temp)}{temperatureUnit}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
