import searchIcon from '../assets/images/icon-search.svg'

function SearchBar() {
  return (
    <div className='flex w-full max-w-[680px] items-center gap-3'>
      <label className='relative block h-14 flex-1'>
        <span className='sr-only'>Search for a place</span>
        <img
          src={searchIcon}
          alt=''
          aria-hidden='true'
          className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-70'
        />
        <input
          type='text'
          aria-label='Search for a place'
          placeholder='Search for a place...'
          className='block h-full w-full rounded-2xl border border-[#2d447b] bg-[#1d2345] pl-12 pr-4 text-base text-white placeholder:text-[#d7d4ef]/70 outline-none transition focus:border-blue-400/80 focus:ring-2 focus:ring-blue-400/40'
        />
      </label>

      <button
        type='button'
        className='h-14 rounded-2xl bg-[#505fe7] px-6 text-base font-medium text-white shadow-[0_8px_18px_rgba(80,95,231,0.35)] transition hover:bg-[#4757d9] focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:ring-offset-2 focus:ring-offset-[#111b3a]'
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
