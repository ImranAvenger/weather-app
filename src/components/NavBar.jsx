import logo from '../assets/images/logo.svg'
import UnitSelector from './UnitSelector'

function NavBar({ units, onUnitsChange }) {
  return (
    <nav className='flex items-center justify-between gap-4'>
      <div className='flex items-center gap-3'>
        <img src={logo} alt='Weather Now logo' className='' />
      </div>

      <UnitSelector units={units} onChange={onUnitsChange} />
    </nav>
  )
}

export default NavBar
