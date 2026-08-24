import React from 'react';

function WeatherMetrics() {
  const metrics = [
    { label: "Feels Like", value: "32°C" },
    { label: "Humidity", value: "78%" },
    { label: "Wind", value: "14 km/h" },
    { label: "Precipitation", value: "20mm" }
  ];

  return (
    <div className="text-white">

      <div className="flex gap-4 min-w-max">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="flex flex-col shrink-0 justify-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-200 min-w-[120px]"
          >
            <div>
              <p className="text-xs text-slate-300 font-medium whitespace-nowrap">{item.label}</p>
              <p className="text-lg font-bold mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherMetrics;
