import cloudyIcon from '../assets/images/icon-overcast.webp'
import rainIcon from '../assets/images/icon-rain.webp'
import sunnyIcon from '../assets/images/icon-sunny.webp'

const forecastData = [
  { day: 'Tue', status: 'Cloudy', maxTemp: 20, minTemp: 14, icon: cloudyIcon },
  { day: 'Wed', status: 'Cloudy', maxTemp: 21, minTemp: 15, icon: cloudyIcon },
  { day: 'Thu', status: 'Sunny', maxTemp: 24, minTemp: 14, icon: sunnyIcon },
  { day: 'Fri', status: 'Sunny', maxTemp: 25, minTemp: 16, icon: sunnyIcon },
  { day: 'Sat', status: 'Rain', maxTemp: 16, minTemp: 15, icon: rainIcon },
  { day: 'Sun', status: 'Cloudy', maxTemp: 16, minTemp: 14, icon: cloudyIcon },
  { day: 'Mon', status: 'Rain', maxTemp: 15, minTemp: 13, icon: rainIcon },
]

export default function DailyForecast({ units }) {
  const formatTemperature = (temperature) => units.temperature === 'fahrenheit'
    ? `${Math.round((temperature * 9) / 5 + 32)}°`
    : `${temperature}°`
  return (
    <section className='daily-section rounded-[20px]'>
      <div className='daily-heading'>
        <h2 className='brand-heading font-bold text-white'>Daily forecast</h2>
      </div>

      <div className='daily-grid grid'>
        {forecastData.map((item) => (
          <div
            key={item.day}
            className='daily-card flex w-full flex-col items-center justify-between gap-2 rounded-[18px] border border-white/8 bg-[#1b2243] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
          >
            <span className='text-sm font-medium text-[#eaf0ff]'>{item.day}</span>
            <img src={item.icon} alt={item.status} className='h-8 w-8 object-contain' />
            <div className='flex items-center gap-2 text-sm font-semibold text-white'>
              <span>{formatTemperature(item.maxTemp)}</span>
              <span className='text-[#d6d8e9]'>{formatTemperature(item.minTemp)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
