import { useEffect, useId, useMemo, useRef, useState } from 'react'
import searchIcon from '../assets/images/icon-search.svg'

function SearchBar({ places = [], onPlaceSelect, onSearch, onQueryChange }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef(null)
  const searchRequestId = useRef(0)
  const listboxId = useId()

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return places.slice(0, 5)

    return places.filter((place) =>
      [place.name, place.region, place.country]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
    ).slice(0, 5)
  }, [places, query])

  useEffect(() => {
    const closeOnOutsidePointerDown = (event) => {
      if (!searchRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePointerDown)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown)
  }, [])

  const selectPlace = (place) => {
    setQuery(place.name)
    setIsOpen(false)
    setActiveIndex(-1)
    onPlaceSelect?.(place)
  }

  const submitSearch = () => {
    const selectedSuggestion = suggestions[activeIndex]
    if (selectedSuggestion) {
      selectPlace(selectedSuggestion)
      return
    }

    const trimmedQuery = query.trim()
    if (trimmedQuery) onSearch?.(trimmedQuery)
    setIsOpen(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      submitSearch()
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div ref={searchRef} className='search-bar relative flex w-full max-w-[680px] items-center gap-3 max-[479px]:flex-col max-[479px]:items-stretch'>
      <label className='search-field relative block h-14 flex-1 max-[479px]:w-full max-[479px]:flex-none'>
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
          value={query}
          role='combobox'
          aria-autocomplete='list'
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          onChange={(event) => {
            const nextQuery = event.target.value
            setQuery(nextQuery)
            setIsOpen(true)
            setActiveIndex(-1)
            const requestId = ++searchRequestId.current

            if (nextQuery.trim().length < 2) {
              setIsSearching(false)
              onQueryChange?.(nextQuery)
              return
            }

            setIsSearching(true)
            Promise.resolve(onQueryChange?.(nextQuery)).finally(() => {
              if (searchRequestId.current === requestId) setIsSearching(false)
            })
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className='block h-full w-full rounded-2xl border border-[#2d447b] bg-[#1d2345] pl-12 pr-4 text-base text-white placeholder:text-[#d7d4ef]/70 outline-none transition focus:border-blue-400/80 focus:ring-2 focus:ring-blue-400/40'
        />

        {isOpen && (
          <ul id={listboxId} role='listbox' aria-label='Place suggestions' className='absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1d2345] p-1.5 shadow-[0_16px_40px_rgba(9,13,31,0.45)]'>
            {isSearching ? (
              <li className='flex items-center gap-3 px-3 py-2.5 text-sm text-[#bfc5e4]' role='status'>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-[#8c97ff]/30 border-t-[#8c97ff]' aria-hidden='true' />
                Searching for places…
              </li>
            ) : suggestions.length > 0 ? suggestions.map((place, index) => (
              <li key={place.id || `${place.name}-${place.country}`} id={`${listboxId}-${index}`} role='option' aria-selected={activeIndex === index}>
                <button
                  type='button'
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectPlace(place)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition focus:outline-none ${activeIndex === index ? 'bg-[#505fe7] text-white' : 'text-[#edf1ff] hover:bg-white/8'}`}
                >
                  <svg className='h-5 w-5 shrink-0 opacity-75' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
                    <path d='M12 21s7-5.3 7-12a7 7 0 1 0-14 0c0 6.7 7 12 7 12Z' />
                    <circle cx='12' cy='9' r='2.3' />
                  </svg>
                  <span className='min-w-0'>
                    <span className='block truncate text-sm font-semibold'>{place.name}</span>
                    <span className='block truncate text-xs opacity-75'>{[place.region, place.country].filter(Boolean).join(', ')}</span>
                  </span>
                </button>
              </li>
            )) : (
              <li className='px-3 py-2.5 text-sm text-[#bfc5e4]'>No search result found!</li>
            )}
          </ul>
        )}
      </label>

      <button
        type='button'
        onClick={submitSearch}
        className='search-button h-14 rounded-2xl bg-[#505fe7] px-6 text-base font-medium text-white shadow-[0_8px_18px_rgba(80,95,231,0.35)] transition hover:bg-[#4757d9] focus:outline-none focus:ring-2 focus:ring-blue-300/70 focus:ring-offset-2 focus:ring-offset-[#111b3a] max-[479px]:w-full'
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
