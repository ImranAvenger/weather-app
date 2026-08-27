import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Moon, Sun } from 'lucide-react'

const icons = {
  cloudy: Cloud,
  drizzle: CloudDrizzle,
  fog: CloudFog,
  moon: Moon,
  partlyCloudyDay: CloudSun,
  partlyCloudyNight: CloudMoon,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
  sun: Sun,
}

export default function WeatherIcon({ condition, className = '' }) {
  const Icon = icons[condition.icon] || Cloud
  return <Icon role='img' aria-label={condition.label} className={className} strokeWidth={1.8} />
}
