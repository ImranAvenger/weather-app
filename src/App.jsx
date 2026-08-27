import { useEffect, useRef, useState } from 'react'

import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import WeatherWidget from './components/WeatherWidget'
import WeatherMetrics from './components/WeatherMetrics'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { getForecast, searchPlaces } from './lib/weather'

const defaultPlace = { id: 'berlin-de', name: 'Berlin', region: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.41 }

function App() {
  const [units, setUnits] = useState({ temperature: 'celsius', windSpeed: 'kmh', precipitation: 'mm' })
  const [place, setPlace] = useState(defaultPlace)
  const [places, setPlaces] = useState([])
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const searchController = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    getForecast(place, units, controller.signal)
      .then((forecast) => {
        setWeather(forecast)
        setStatus('success')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setStatus('error')
        }
      })
    return () => controller.abort()
  }, [place, units])

  const beginLoading = () => {
    setStatus('loading')
    setError('')
  }

  const handleUnitsChange = (nextUnits) => {
    beginLoading()
    setUnits(nextUnits)
  }

  const handlePlaceSelect = (nextPlace) => {
    beginLoading()
    setPlace(nextPlace)
  }

  const handleQueryChange = async (query) => {
    searchController.current?.abort()
    if (query.trim().length < 2) {
      setPlaces([])
      return
    }
    const controller = new AbortController()
    searchController.current = controller
    try {
      const results = await searchPlaces(query, controller.signal)
      if (searchController.current === controller) setPlaces(results)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setPlaces([])
    }
  }

  const handleSearch = async (query) => {
    try {
      const [firstResult] = await searchPlaces(query)
      if (firstResult) handlePlaceSelect(firstResult)
      else setError('No matching location was found.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <main className='app-page text-white'>
      <div className='app-shell'>
        <NavBar units={units} onUnitsChange={handleUnitsChange} />

        <header className='app-hero mx-auto text-center'>
          <h1 className='brand-heading app-title font-bold leading-[1.05] text-white'>
            How&apos;s the sky looking today?
          </h1>
        </header>

        <div className='search-wrap flex justify-center'>
          <SearchBar places={places} onPlaceSelect={handlePlaceSelect} onSearch={handleSearch} onQueryChange={handleQueryChange} />
        </div>

        {status === 'loading' && <p className='mt-4 text-center text-sm text-[#d6d8ed]' role='status'>Loading weather for {place.name}…</p>}
        {error && <p className='mt-4 text-center text-sm text-red-200' role='alert'>{error}</p>}

        <div className='dashboard-grid grid'> {/* dashboard */}
          <div className='content-stack min-w-0 w-full'> {/* left column */}
            <WeatherWidget place={place} weather={weather} />
            <WeatherMetrics units={units} weather={weather} />
            <DailyForecast weather={weather} />
          </div>

          <div className='hourly-column min-h-0'> {/* right column */}
            <HourlyForecast weather={weather} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
