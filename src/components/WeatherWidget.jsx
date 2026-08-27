import weatherBg from '../assets/images/bg-today-large.svg'
import { formatDate, getWeatherDetails } from '../lib/weather'
import WeatherIcon from './WeatherIcon'

function WeatherWidget({ place, weather, isLoading }) {
  // Resolve the API condition into a label and a Lucide icon identifier.
  const current = weather?.current
  const condition = current ? getWeatherDetails(current.weather_code, current.is_day) : { label: 'Loading weather', icon: 'cloudy' }
  return (
    // The background artwork is applied here so card content remains accessible HTML.
    <section
      aria-label='Current weather overview'
      className='w-full overflow-hidden rounded-[20px] border border-white/10 text-white shadow-[0_12px_32px_rgba(9,13,31,0.3)]'
      style={{
        backgroundImage: `url(${weatherBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='weather-widget-body flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
        <div className='space-y-2'>
          <h2 className='brand-heading current-city font-bold leading-none'>{isLoading ? 'Loading…' : `${place.name}, ${place.country}`}</h2>
          <p className='text-[0.95rem] text-[#ececff]'>{isLoading ? '' : weather?.current?.time ? formatDate(weather.current.time.slice(0, 10)) : '—'}</p>
        </div>

        <div className='flex items-center justify-between gap-5 md:justify-end'>
          {/* Hide values during loading instead of briefly showing the previous location. */}
          {!isLoading && <WeatherIcon condition={condition} className='current-icon' />}

          <div className='text-right'>
            {!isLoading && <span className='brand-heading current-temp inline-block -skew-x-6 font-bold leading-none'>{current ? `${Math.round(current.temperature_2m)}°` : '—'}</span>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherWidget
