import React from 'react'

function NavBar() {
  return (
    <div className='flex justify-between'>
      <div> {/* logo */}
        <img src="./src/assets/images/logo.svg" alt="Weather Now Logo" />
      </div>
      <div className='inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-neutral-800'>
        <img src="./src/assets/images/icon-units.svg" alt="Unit Gear" /><span className='text-white'>Units</span><img src="./src/assets/images/icon-dropdown.svg" alt="Dropdown" />
      </div>

    </div>
  )
}

export default NavBar