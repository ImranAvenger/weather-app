import { useEffect, useRef, useState } from 'react'
import unitsIcon from '../assets/images/icon-units.svg'

// Each group maps directly to one property in the shared units state object.
const unitOptions = [
  { key: 'temperature', label: 'Temperature', options: [{ value: 'celsius', label: 'Celsius (°C)' }, { value: 'fahrenheit', label: 'Fahrenheit (°F)' }] },
  { key: 'windSpeed', label: 'Wind speed', options: [{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mile/h' }] },
  { key: 'precipitation', label: 'Precipitation', options: [{ value: 'mm', label: 'Millimeters (mm)' }, { value: 'inches', label: 'Inches (in)' }] },
]

export default function UnitSelector({ units, onChange }) {
  // Only this menu's open state is local; unit values belong to App.
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)
  const isImperial = units.temperature === 'fahrenheit' && units.windSpeed === 'mph' && units.precipitation === 'inches'

  const switchUnitSystem = () => {
    // Toggle all three values together for a conventional metric/imperial shortcut.
    onChange(isImperial
      ? { temperature: 'celsius', windSpeed: 'kmh', precipitation: 'mm' }
      : { temperature: 'fahrenheit', windSpeed: 'mph', precipitation: 'inches' })
  }

  useEffect(() => {
    // Dismiss the popover when users click elsewhere on the page.
    const closeOnOutsideClick = (event) => {
      if (!selectorRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  return (
    <div ref={selectorRef} className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1d2345] px-3.5 py-2 text-sm font-medium text-white shadow-[0_8px_25px_rgba(15,12,38,0.25)] transition hover:border-white/20 hover:bg-[#232b52] focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:ring-offset-2 focus:ring-offset-[#111b3a]'
      >
        <img src={unitsIcon} alt='' className='h-4 w-4 opacity-90' aria-hidden='true' />
        <span>Units</span>
        <svg className={`h-3.5 w-3.5 opacity-80 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
          <path d='M5 7.5L10 12.5L15 7.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>

      {/* Render individual controls as radios, plus a shortcut for all-unit switching. */}
      {isOpen && (
        <div role='dialog' aria-label='Unit selection' className='absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-white/10 bg-[#1d2345] p-3 shadow-[0_16px_40px_rgba(9,13,31,0.45)]'>
          {unitOptions.map((group) => (
            <fieldset key={group.key} className='border-0 p-0 not-last:mb-4'>
              <legend className='mb-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[#bfc5e4]'>{group.label}</legend>
              <div className='space-y-1'>
                {group.options.map((option) => (
                  <label key={option.value} className='flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-sm text-[#edf1ff] hover:bg-white/8'>
                    <span>{option.label}</span>
                    <input
                      type='radio'
                      name={group.key}
                      value={option.value}
                      checked={units[group.key] === option.value}
                      onChange={() => onChange({ ...units, [group.key]: option.value })}
                      className='sr-only'
                    />
                    {units[group.key] === option.value && (
                      <svg className='h-4 w-4 text-[#8c97ff]' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='2.5' aria-hidden='true'>
                        <path d='M4.5 10.5L8 14L15.5 6.5' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <button
            type='button'
            onClick={switchUnitSystem}
            className='mt-1 w-full rounded-xl bg-[#505fe7] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#4757d9] focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:ring-offset-2 focus:ring-offset-[#1d2345]'
          >
            {isImperial ? 'Switch to metric' : 'Switch to imperial'}
          </button>
        </div>
      )}
    </div>
  )
}
