import React, { useState } from 'react';

const mockHourlyData = {
    Monday: [
        { hour: '12:00 AM', status: 'Cloudy', temp: 27 },
        { hour: '03:00 AM', status: 'Light Rain', temp: 26 },
        { hour: '06:00 AM', status: 'Cloudy', temp: 27 },
        { hour: '09:00 AM', status: 'Heavy Rain', temp: 29 },
        { hour: '12:00 PM', status: 'Thunderstorm', temp: 31 },
        { hour: '03:00 PM', status: 'Light Rain', temp: 30 },
        { hour: '06:00 PM', status: 'Cloudy', temp: 28 },
        { hour: '09:00 PM', status: 'Clear', temp: 27 },
    ],
    Tuesday: [
        { hour: '12:00 AM', status: 'Cloudy', temp: 28 },
        { hour: '03:00 AM', status: 'Light Rain', temp: 28 },
        { hour: '06:00 AM', status: 'Cloudy', temp: 27 },
        { hour: '09:00 AM', status: 'Light Rain', temp: 29 },
        { hour: '12:00 PM', status: 'Cloudy', temp: 31 },
        { hour: '03:00 PM', status: 'Thunderstorm', temp: 31 },
        { hour: '06:00 PM', status: 'Light Rain', temp: 29 },
        { hour: '09:00 PM', status: 'Thunderstorm', temp: 28 },
    ],
    Wednesday: [
        { hour: '12:00 AM', status: 'Clear', temp: 26 },
        { hour: '03:00 AM', status: 'Clear', temp: 25 },
        { hour: '06:00 AM', status: 'Sunny', temp: 27 },
        { hour: '09:00 AM', status: 'Sunny', temp: 30 },
        { hour: '12:00 PM', status: 'Cloudy', temp: 32 },
        { hour: '03:00 PM', status: 'Light Rain', temp: 31 },
        { hour: '06:00 PM', status: 'Cloudy', temp: 29 },
        { hour: '09:00 PM', status: 'Clear', temp: 27 },
    ]
};

export default function HourlyForecastCard({ data = mockHourlyData }) {
    const [selectedDay, setSelectedDay] = useState('Tuesday');
    const days = Object.keys(data);
    const currentHourlyList = data[selectedDay] || [];

    return (
        <div className="w-full max-w-md bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-800 font-sans">
            {/* Header & Pure CSS Dropdown */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Hourly Forecast
                </h3>

                <div className="relative inline-block">
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="appearance-none bg-slate-800 text-slate-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-slate-700 cursor-pointer focus:outline-none focus:border-slate-500"
                    >
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    {/* Custom SVG Icon instead of Lucide */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Hourly List: [ status | hour | temp ] */}
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                {currentHourlyList.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors border border-slate-700/30"
                    >
                        {/* Status Text */}
                        <span className="text-xs text-slate-300 font-medium bg-slate-700/50 px-2.5 py-1 rounded w-36 text-left truncate">
                            {item.status}
                        </span>

                        {/* Hour */}
                        <span className="text-xs font-medium text-slate-400 text-center">
                            {item.hour}
                        </span>

                        {/* Temp */}
                        <span className="text-sm font-semibold text-white w-10 text-right">
                            {item.temp}°
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}