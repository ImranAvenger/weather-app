function WeatherMetrics({ units }) {
  const feelsLike = units.temperature === 'fahrenheit' ? 64 : 18
  const wind = units.windSpeed === 'mph' ? 9 : 14
  const precipitation = units.precipitation === 'inches' ? 0 : 0
  const metrics = [
    { label: 'Feels Like', value: `${feelsLike}°` },
    { label: 'Humidity', value: '46%' },
    { label: 'Wind', value: `${wind} ${units.windSpeed === 'mph' ? 'mile/h' : 'km/h'}` },
    { label: 'Precipitation', value: `${precipitation} ${units.precipitation === 'inches' ? 'in' : 'mm'}` },
  ]

  return (
    <div className='metrics-grid grid grid-cols-2 lg:grid-cols-4'>
      {metrics.map((item) => (
        <div
          key={item.label}
          className='metric-card w-full rounded-2xl border border-white/8 bg-[#1d2345]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
        >
          <p className='text-xs font-medium uppercase tracking-[0.12em] text-[#d6d8ed]'>{item.label}</p>
          <p className='metric-value font-bold text-white'>{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default WeatherMetrics
