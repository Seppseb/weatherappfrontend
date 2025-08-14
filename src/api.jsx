const DEFAULT_API = import.meta.env.VITE_API_BASE || 'https://weather.backendsepp.org'
export const API_BASE = DEFAULT_API

/**
 * Fetch all city data from /api/get
 * Expected shape: { "CityA": [ { observationTime, tempC }, ... ], ... }
 */
export async function fetchAllCities(){
  return {"Saarbrücken":[{"observationTime":"2025-08-14T18:04:29Z","tempC":31.34},{"observationTime":"2025-08-14T17:05:00Z","tempC":33.05},{"observationTime":"2025-08-14T16:04:25Z","tempC":34.46},{"observationTime":"2025-08-14T15:03:44Z","tempC":35.0},{"observationTime":"2025-08-14T14:05:00Z","tempC":35.02},{"observationTime":"2025-08-14T13:05:00Z","tempC":34.16},{"observationTime":"2025-08-14T12:01:46Z","tempC":33.76},{"observationTime":"2025-08-14T11:00:01Z","tempC":31.97}],"Trier":[{"observationTime":"2025-08-14T18:03:03Z","tempC":30.13},{"observationTime":"2025-08-14T17:00:39Z","tempC":33.36},{"observationTime":"2025-08-14T16:04:14Z","tempC":36.8},{"observationTime":"2025-08-14T15:05:00Z","tempC":35.69},{"observationTime":"2025-08-14T14:01:38Z","tempC":35.13},{"observationTime":"2025-08-14T13:05:00Z","tempC":34.58},{"observationTime":"2025-08-14T12:01:50Z","tempC":32.91},{"observationTime":"2025-08-14T11:00:53Z","tempC":28.36}]}
  const url = `${API_BASE}/api/get`
  const res = await fetch(url)
  if (!res.ok) throw new Error('API fetch failed: ' + res.status)
  const json = await res.json()
  return json
}