import { useState } from 'react'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='bg-neutral-900 h-screen'>
      <NavBar />
      <h1 className='text-white text-center'>How's the sky looking today?</h1>
      <div className='flex justify-center'>
        <SearchBar />
      </div>
    </main>
  )
}

export default App
