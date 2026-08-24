import { useState } from 'react'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import WeatherWidget from './components/WeatherWidget'
import WeatherMetrics from './components/WeatherMetrics'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='bg-neutral-900 h-screen'>
      <NavBar />
      <h1 className='text-white text-center'>How's the sky looking today?</h1>
      <div className='flex justify-center'>
        <SearchBar />
      </div>
      <div className='flex gap-6 justify-center mt-6 px-4'>
        <div>
          <WeatherWidget />
          <WeatherMetrics />
          <DailyForecast />
        </div>
        <div>
          <HourlyForecast />
        </div>
      </div>
    </main>
  )
}

export default App
