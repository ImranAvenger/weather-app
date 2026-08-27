import { useEffect, useRef, useState } from 'react'

import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import WeatherWidget from './components/WeatherWidget'
import WeatherMetrics from './components/WeatherMetrics'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { getForecast, searchPlaces } from './lib/weather'
import errorIcon from './assets/images/icon-error.svg'
import retryIcon from './assets/images/icon-retry.svg'


function App() {
  // App owns the data shared by search, unit selection, and every forecast widget.
  const [units, setUnits] = useState({ temperature: 'celsius', windSpeed: 'kmh', precipitation: 'mm' })
  const [place, setPlace] = useState(null)
  const [places, setPlaces] = useState([])
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('empty')
  const [requestNonce, setRequestNonce] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  // Cancels stale autocomplete requests as the user continues typing.
  const searchController = useRef(null)
  // Records the last failed operation so Retry repeats the right request type.
  const failedRequest = useRef(null)

  useEffect(() => {
    if (!place) return undefined

    // A new place, unit selection, or nonce value starts a fresh forecast request.
    const controller = new AbortController()
    getForecast(place, units, controller.signal)
      .then((forecast) => {
        setWeather(forecast)
        setStatus('success')
        setIsRetrying(false)
        failedRequest.current = null
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setStatus('error')
          setIsRetrying(false)
          failedRequest.current = { type: 'forecast' }
        }
      })
    return () => controller.abort()
  }, [place, units, requestNonce])

  const beginLoading = () => {
    // Clear stale values so each widget renders its loading state immediately.
    setStatus('loading')
    setWeather(null)
    failedRequest.current = null
  }

  const handleUnitsChange = (nextUnits) => {
    // Unit changes trigger a new API request because Open-Meteo converts values server-side.
    if (place) beginLoading()
    setUnits(nextUnits)
  }

  const handlePlaceSelect = (nextPlace) => {
    // Selecting a suggestion makes it the active location for the forecast effect.
    setIsRetrying(false)
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
      // Ignore a response if a newer query has already replaced this controller.
      if (searchController.current === controller) setPlaces(results)
    } catch (requestError) {
      if (requestError.name !== 'AbortError' && searchController.current === controller) setPlaces([])
    }
  }

  const handleSearch = async (query) => {
    // A direct search uses the first geocoding result as Open-Meteo's best match.
    try {
      const [firstResult] = await searchPlaces(query)
      if (firstResult) handlePlaceSelect(firstResult)
      else {
        setPlace(null)
        setWeather(null)
        setStatus('empty')
        setIsRetrying(false)
        failedRequest.current = null
      }
    } catch {
      setStatus('error')
      setIsRetrying(false)
      failedRequest.current = { type: 'search', query }
    }
  }

  const retryRequest = async () => {
    const retryTarget = failedRequest.current
    if (!retryTarget) return

    setIsRetrying(true)
    if (retryTarget.type === 'forecast') {
      // The nonce forces the forecast effect to run again for the same place/units.
      beginLoading()
      setRequestNonce((value) => value + 1)
      return
    }

    await handleSearch(retryTarget.query)
  }

  return (
    <main className='app-page text-white'>
      <div className='app-shell'>
        {/* Global navigation controls stay above all forecast states. */}
        <NavBar units={units} onUnitsChange={handleUnitsChange} />

        <header className='app-hero mx-auto text-center'>
          <h1 className='brand-heading app-title font-bold leading-[1.05] text-white'>
            How&apos;s the sky looking today?
          </h1>
        </header>

        <div className='search-wrap flex justify-center'>
          <SearchBar places={places} onPlaceSelect={handlePlaceSelect} onSearch={handleSearch} onQueryChange={handleQueryChange} />
        </div>

        {/* Exactly one state is visible: error/retry, forecast dashboard, or no result. */}
        {status === 'error' || isRetrying ? (
          <section className='mt-8 rounded-[20px] border border-white/10 bg-[#1d2345]/80 px-6 py-14 text-center shadow-[0_12px_32px_rgba(9,13,31,0.3)]' role='alert'>
            <img src={errorIcon} alt='' aria-hidden='true' className='mx-auto h-10 w-10' />
            <h2 className='brand-heading mt-5 text-2xl font-bold text-white'>{isRetrying ? 'Retrying…' : 'Something went wrong.'}</h2>
            <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-[#cbd1ea]'>{isRetrying ? 'Trying to reconnect to the weather service.' : 'We couldn\'t connect to the server (API error). Please try again in a few moments.'}</p>
            <button type='button' onClick={retryRequest} disabled={isRetrying} aria-busy={isRetrying} className='mx-auto mt-6 inline-flex items-center gap-2 rounded-xl bg-[#505fe7] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4757d9] focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:ring-offset-2 focus:ring-offset-[#1d2345] disabled:cursor-wait disabled:opacity-70'>
              <img src={retryIcon} alt='' aria-hidden='true' className={`h-4.5 w-4.5 brightness-0 invert ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying…' : 'Retry'}
            </button>
          </section>
        ) : place ? (
          // Every forecast component consumes the same API response and loading state.
          <div className='dashboard-grid grid'> {/* dashboard */}
            <div className='content-stack min-w-0 w-full'> {/* left column */}
              <WeatherWidget place={place} weather={weather} isLoading={status === 'loading'} />
              <WeatherMetrics units={units} weather={weather} />
              <DailyForecast weather={weather} isLoading={status === 'loading'} />
            </div>

            <div className='hourly-column min-h-0'> {/* right column */}
              <HourlyForecast weather={weather} isLoading={status === 'loading'} />
            </div>
          </div>
        ) : (
          <section className='mt-8 rounded-[20px] border border-dashed border-white/15 bg-[#1d2345]/60 px-6 py-14 text-center shadow-[0_12px_32px_rgba(9,13,31,0.2)]' aria-live='polite'>
            <p className='brand-heading text-2xl font-bold text-white'>No search result found!</p>
            <p className='mt-2 text-sm text-[#cbd1ea]'>Search for a city to view its weather forecast.</p>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
