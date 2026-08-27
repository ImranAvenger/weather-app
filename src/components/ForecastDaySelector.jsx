import { useEffect, useRef, useState } from 'react'

export default function ForecastDaySelector({ days, selectedDay, onChange, formatDay = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!selectorRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const chooseDay = (day) => {
    onChange(day)
    setIsOpen(false)
  }

  return (
    <div ref={selectorRef} className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className='inline-flex min-w-28 items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#242f53] px-3 py-2 text-sm font-medium text-[#edf1ff] transition hover:bg-[#29355d] focus:outline-none focus:ring-2 focus:ring-blue-400/60'
      >
        <span>{selectedDay ? (formatDay ? new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(`${selectedDay}T12:00:00`)) : selectedDay) : '—'}</span>
        <svg className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
          <path d='M5 7.5L10 12.5L15 7.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>

      {isOpen && (
        <div role='listbox' aria-label='Forecast day' className='absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#202b4e] p-1.5 shadow-[0_14px_32px_rgba(5,9,28,0.45)]'>
          {days.map((day) => {
            const isSelected = day === selectedDay

            return (
              <button
                key={day}
                type='button'
                role='option'
                aria-selected={isSelected}
                onClick={() => chooseDay(day)}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${isSelected ? 'bg-[#505fe7]/25 font-semibold text-white' : 'text-[#dfe6ff] hover:bg-white/8'}`}
              >
                <span>{formatDay ? new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date(`${day}T12:00:00`)) : day}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
