import { useState } from 'react'
import cloudyIcon from '../assets/images/icon-overcast.webp'
import rainIcon from '../assets/images/icon-rain.webp'
import sunnyIcon from '../assets/images/icon-sunny.webp'

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

export default function HourlyForecastCard({ data = mockHourlyData }) {
  const [selectedDay, setSelectedDay] = useState('Tuesday')
  const days = Object.keys(data)
  const currentHourlyList = data[selectedDay] || []

  return (
    <aside className='hourly-panel flex w-full flex-col rounded-[22px] border border-white/10 bg-[#131d3b]/90'>
      <div className='hourly-header flex items-center justify-between gap-3'>
        <h3 className='brand-heading font-bold text-white'>Hourly forecast</h3>

        <div className='relative'>
          <select
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
            className='appearance-none rounded-xl border border-white/10 bg-[#242f53] px-3 py-2 pr-8 text-sm font-medium text-[#edf1ff] outline-none transition hover:bg-[#29355d] focus:border-blue-400/80 focus:ring-2 focus:ring-blue-400/60'
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <svg
            className='pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#dfe4ff]'
            viewBox='0 0 20 20'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            aria-hidden='true'
          >
            <path d='M5 7.5L10 12.5L15 7.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
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

            <span className='text-sm font-semibold text-white'>{item.temp}°</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
