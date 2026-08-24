import React from 'react';

const forecastData = [
  { day: 'Mon', status: 'Rain', maxTemp: 32, minTemp: 26 },
  { day: 'Tue', status: 'Thunderstorm', maxTemp: 31, minTemp: 25 },
  { day: 'Wed', status: 'Rain', maxTemp: 30, minTemp: 26 },
  { day: 'Thu', status: 'Cloudy', maxTemp: 33, minTemp: 27 },
  { day: 'Fri', status: 'Sunny', maxTemp: 34, minTemp: 27 },
  { day: 'Sat', status: 'Rain', maxTemp: 31, minTemp: 26 },
  { day: 'Sun', status: 'Thunderstorm', maxTemp: 30, minTemp: 25 }
];

export default function DailyForecast() {
  return (
    <div>
      <h2>Daily Forecast</h2>
      <div className="flex gap-3 p-4 text-white rounded-xl overflow-x-auto w-fit">
        {forecastData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors w-24 gap-2"
          >
            {/* Day */}
            <span className="font-medium text-slate-200 text-sm">{item.day}</span>

            {/* Status Text */}
            <span className="text-xs text-slate-300 font-medium bg-slate-700/50 px-2 py-1 rounded w-full text-center truncate">
              {item.status}
            </span>

            {/* [max temp - min temp] */}
            <div className="flex gap-4 items-center font-semibold">
              <span className="text-white">{item.maxTemp}°</span>
              <span className="text-white">{item.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}