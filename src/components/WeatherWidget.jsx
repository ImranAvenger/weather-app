import weatherBg from '../assets/images/bg-today-large.svg'
import sunnyIcon from '../assets/images/icon-sunny.webp'

function WeatherWidget() {
  return (
    <section
      aria-label='Current weather overview'
      className='w-full overflow-hidden rounded-[20px] border border-white/10 text-white shadow-[0_12px_32px_rgba(9,13,31,0.3)]'
      style={{
        backgroundImage: `url(${weatherBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex flex-col gap-5 px-5 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between md:px-7 md:py-14'>
        <div className='space-y-2'>
          <h2 className='brand-heading text-[2.1rem] font-bold leading-none tracking-tighter'>Berlin, Germany</h2>
          <p className='text-[0.95rem] text-[#ececff]'>Tuesday, Aug 5, 2025</p>
        </div>

        <div className='flex items-center justify-between gap-5 md:justify-end'>
          <img src={sunnyIcon} alt='Sunny conditions' className='h-13 w-13 sm:h-16 sm:w-16' />

          <div className='text-right'>
            <span className='brand-heading block text-[4rem] font-bold leading-none tracking-[-0.08em] sm:text-[4.7rem]'>20°</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherWidget