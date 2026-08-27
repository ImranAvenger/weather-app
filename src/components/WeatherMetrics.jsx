function WeatherMetrics({ units, weather }) {
  const current = weather?.current
  const tempUnit = weather?.current_units?.temperature_2m || '°C'
  const windUnit = weather?.current_units?.wind_speed_10m || (units.windSpeed === 'mph' ? 'mph' : 'km/h')
  const precipitationUnit = weather?.current_units?.precipitation || (units.precipitation === 'inches' ? 'in' : 'mm')
  const metrics = [
    { label: 'Feels Like', value: current ? `${Math.round(current.apparent_temperature)}${tempUnit}` : '—' },
    { label: 'Humidity', value: current ? `${current.relative_humidity_2m}%` : '—' },
    { label: 'Wind', value: current ? `${Math.round(current.wind_speed_10m)} ${windUnit}` : '—' },
    { label: 'Precipitation', value: current ? `${current.precipitation} ${precipitationUnit}` : '—' },
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
