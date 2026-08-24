function WeatherMetrics() {
  const metrics = [
    { label: 'Feels Like', value: '18°' },
    { label: 'Humidity', value: '46%' },
    { label: 'Wind', value: '14 km/h' },
    { label: 'Precipitation', value: '0 mm' },
  ]

  return (
    <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
      {metrics.map((item) => (
        <div
          key={item.label}
          className='h-[104px] w-full rounded-2xl border border-white/8 bg-[#1d2345]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
        >
          <p className='text-xs font-medium uppercase tracking-[0.12em] text-[#d6d8ed]'>{item.label}</p>
          <p className='mt-2 text-xl font-bold text-white sm:text-[1.7rem]'>{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default WeatherMetrics
