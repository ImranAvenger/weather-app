import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import WeatherWidget from './components/WeatherWidget'
import WeatherMetrics from './components/WeatherMetrics'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'

function App() {
  return (
    <main className='min-h-screen bg-[#111b3a] px-4 py-8 text-white sm:px-6 lg:px-10'>
      <div className='mx-auto w-full max-w-[1020px] rounded-[28px] px-6 pb-7 pt-5 shadow-[0_18px_40px_rgba(17,27,58,0.18)] sm:px-8 lg:px-10'>
        <NavBar />

        <header className='mx-auto mt-8 max-w-[820px] text-center'>
          <h1 className='brand-heading text-[2.2rem] font-bold leading-[1.05] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.3rem]'>
            How&apos;s the sky looking today?
          </h1>
        </header>

        <div className='mt-6 flex justify-center'>
          <SearchBar />
        </div>

        <div className='mt-8 grid items-start gap-6 lg:h-[480px] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch'>
          <div className='min-w-0 w-full space-y-6'>
            <WeatherWidget />
            <WeatherMetrics />
            <DailyForecast />
          </div>

          <div className='min-h-0 lg:self-stretch'>
            <HourlyForecast />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
