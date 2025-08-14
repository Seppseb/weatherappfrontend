const DEFAULT_API = import.meta.env.VITE_API_BASE || 'https://weather.backendsepp.org'
export const API_BASE = DEFAULT_API

/**
 * Fetch all city data from /api/get
 * Expected shape: { "CityA": [ { observationTime, tempC }, ... ], ... }
 */
export async function fetchAllCities(){
  const url = `${API_BASE}/api/get`
  const res = await fetch(url)
  if (!res.ok) throw new Error('API fetch failed: ' + res.status)
  const json = await res.json()
  return json
}