import React from 'react'

function WeatherWidget() {
  return (
    <div className="flex items-center justify-center gap-4 p-6 rounded-lg shadow-md bg-neutral-800 text-white max-w-sm mx-auto mt-6 bg-[url('./src/assets/images/bg-today-large.svg')] bg-no-repeat bg-cover">
      <div className="text-white">
        <h2>Dhaka, Bangladesh</h2>
        <p>Monday, August 24, 2026</p>
      </div>
      <div>
        <img src="../src/assets/images/icon-sunny.webp" alt="Weather Icon" />
      </div>
      <div>
        <p>25°</p>
      </div>
    </div>
  )
}

export default WeatherWidget