import React from 'react'

function SearchBar() {
  return (
    <div className='flex items-center gap-3 w-full max-w-lg'>
      {/* Search Input Container */}
      <div className='relative grow'>
        {/* Leading Search Icon */}
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <img 
            src="./src/assets/images/icon-search.svg" 
            alt="Search" 
            className="w-5 h-5 opacity-60" 
          />
        </div>

        {/* Input Field with fully rounded corners */}
        <input
          type="text"
          className='block w-full p-2.5 pl-10 text-white bg-neutral-800 border border-neutral-700 rounded-lg outline-none focus:ring-1 focus:ring-blue-500'
          placeholder="Search for a place..."
        />
      </div>

      {/* Separate Search Button */}
      <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap shadow-sm'>
        Search
      </button>
    </div>
  )
}

export default SearchBar
