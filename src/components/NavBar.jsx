import logo from '../assets/images/logo.svg'
import unitsIcon from '../assets/images/icon-units.svg'
import dropdownIcon from '../assets/images/icon-dropdown.svg'

function NavBar() {
  return (
    <nav className='flex items-center justify-between gap-4'>
      <div className='flex items-center gap-3'>
        <img src={logo} alt='Weather Now logo' className='' />
      </div>

      <button
        type='button'
        className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1d2345] px-3.5 py-2 text-sm font-medium text-white shadow-[0_8px_25px_rgba(15,12,38,0.25)] transition hover:border-white/20 hover:bg-[#232b52] focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:ring-offset-2 focus:ring-offset-[#111b3a]'
        aria-label='Choose units'
      >
        <img src={unitsIcon} alt='' className='h-4 w-4 opacity-90' aria-hidden='true' />
        <span>Units</span>
        <img src={dropdownIcon} alt='' className='h-3.5 w-3.5 opacity-80' aria-hidden='true' />
      </button>
    </nav>
  )
}

export default NavBar