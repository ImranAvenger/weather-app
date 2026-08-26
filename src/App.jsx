import { useState } from 'react'

import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import WeatherWidget from './components/WeatherWidget'
import WeatherMetrics from './components/WeatherMetrics'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'

function App() {
  const [units, setUnits] = useState({ temperature: 'celsius', windSpeed: 'kmh', precipitation: 'mm' })

  return (
    <main className='app-page text-white'>
      <div className='app-shell'>
        <NavBar units={units} onUnitsChange={setUnits} />

        <header className='app-hero mx-auto text-center'>
          <h1 className='brand-heading app-title font-bold leading-[1.05] text-white'>
            How&apos;s the sky looking today?
          </h1>
        </header>

        <div className='search-wrap flex justify-center'>
          <SearchBar />
        </div>

        <div className='dashboard-grid grid'> {/* dashboard */}
          <div className='content-stack min-w-0 w-full'> {/* left column */}
            <WeatherWidget units={units} />
            <WeatherMetrics units={units} />
            <DailyForecast units={units} />
          </div>

          <div className='hourly-column min-h-0'> {/* right column */}
            <HourlyForecast units={units} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App

