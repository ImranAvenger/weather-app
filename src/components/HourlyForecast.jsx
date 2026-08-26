import { useState } from 'react'
import cloudyIcon from '../assets/images/icon-overcast.webp'
import rainIcon from '../assets/images/icon-rain.webp'
import sunnyIcon from '../assets/images/icon-sunny.webp'
import ForecastDaySelector from './ForecastDaySelector'

const mockHourlyData = {
  Tuesday: [
    { hour: '3 PM', status: 'Sun', temp: 20, icon: sunnyIcon },
    { hour: '4 PM', status: 'Sun', temp: 20, icon: sunnyIcon },
    { hour: '5 PM', status: 'Sun', temp: 20, icon: sunnyIcon },
    { hour: '6 PM', status: 'Cloudy', temp: 19, icon: cloudyIcon },
    { hour: '7 PM', status: 'Cloudy', temp: 18, icon: cloudyIcon },
    { hour: '8 PM', status: 'Cloudy', temp: 18, icon: cloudyIcon },
    { hour: '9 PM', status: 'Cloudy', temp: 17, icon: cloudyIcon },
    { hour: '10 PM', status: 'Cloudy', temp: 17, icon: cloudyIcon },
  ],
  Wednesday: [
    { hour: '3 PM', status: 'Sun', temp: 22, icon: sunnyIcon },
    { hour: '4 PM', status: 'Sun', temp: 21, icon: sunnyIcon },
    { hour: '5 PM', status: 'Cloudy', temp: 19, icon: cloudyIcon },
    { hour: '6 PM', status: 'Cloudy', temp: 18, icon: cloudyIcon },
    { hour: '7 PM', status: 'Rain', temp: 17, icon: rainIcon },
    { hour: '8 PM', status: 'Rain', temp: 16, icon: rainIcon },
    { hour: '9 PM', status: 'Cloudy', temp: 15, icon: cloudyIcon },
    { hour: '10 PM', status: 'Cloudy', temp: 15, icon: cloudyIcon },
    { hour: '8 PM', status: 'Rain', temp: 16, icon: rainIcon },
    { hour: '9 PM', status: 'Cloudy', temp: 15, icon: cloudyIcon },
    { hour: '10 PM', status: 'Cloudy', temp: 15, icon: cloudyIcon },
  ],
}

export default function HourlyForecastCard({ data = mockHourlyData, units }) {
  const [selectedDay, setSelectedDay] = useState('Tuesday')
  const days = Object.keys(data)
  const currentHourlyList = data[selectedDay] || []
  const formatTemperature = (temperature) => units.temperature === 'fahrenheit'
    ? `${Math.round((temperature * 9) / 5 + 32)}°`
    : `${temperature}°`

  return (
    <aside className='hourly-panel flex w-full flex-col rounded-[22px] border border-white/10 bg-[#131d3b]/90'>
      <div className='hourly-header flex items-center justify-between gap-3'>
        <h3 className='brand-heading font-bold text-white'>Hourly forecast</h3>

        <ForecastDaySelector days={days} selectedDay={selectedDay} onChange={setSelectedDay} />
      </div>

      <div className='hourly-list flex min-h-0 flex-1 flex-col overflow-y-auto'>
        {currentHourlyList.map((item, index) => (
          <div
            key={`${selectedDay}-${item.hour}-${index}`}
            className='hourly-row flex items-center justify-between gap-3 rounded-[16px] border border-white/8 bg-[#1a2240] transition hover:bg-[#1e2948]'
          >
            <div className='flex items-center gap-2.5'>
              <img src={item.icon} alt={item.status} className='h-6 w-6 object-contain' />
              <span className='text-sm text-[#dfe6ff]'>{item.hour}</span>
            </div>

            <span className='text-sm font-semibold text-white'>{formatTemperature(item.temp)}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
