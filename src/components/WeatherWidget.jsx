import weatherBg from '../assets/images/bg-today-large.svg'
import sunnyIcon from '../assets/images/icon-sunny.webp'
import { formatDate, getWeatherDetails } from '../lib/weather'

function WeatherWidget({ place, weather }) {
  const current = weather?.current
  const condition = current ? getWeatherDetails(current.weather_code, current.is_day) : { label: 'Loading weather', icon: sunnyIcon }
  return (
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
          <h2 className='brand-heading current-city font-bold leading-none'>{place.name}, {place.country}</h2>
          <p className='text-[0.95rem] text-[#ececff]'>{weather?.current?.time ? formatDate(weather.current.time.slice(0, 10)) : 'Loading…'}</p>
        </div>

        <div className='flex items-center justify-between gap-5 md:justify-end'>
          <img src={condition.icon} alt={condition.label} className='current-icon object-contain' />

          <div className='text-right'>
            <span className='brand-heading current-temp inline-block -skew-x-6 font-bold leading-none'>{current ? `${Math.round(current.temperature_2m)}°` : '—'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherWidget
