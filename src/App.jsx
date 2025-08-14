import React, { useState, useEffect } from 'react'
import DateRangeSelector from './components/DateRangeSelector'
import CitySelector from './components/CitySelector'
import TempChart from './components/TempChart'
import { fetchAllCities } from './api'
import { formatDateConditionally } from './components/TempChart'

export default function App(){
  const [citiesData, setCitiesData] = useState({})
  const [selectedCity, setSelectedCity] = useState(null)
  const [range, setRange] = useState({ start: new Date(Date.now() - 24*3600*1000).toISOString(), end: new Date().toISOString() })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load(){
      setLoading(true); setError(null)
      try{
        const j = await fetchAllCities()
        if (cancelled) return
        setCitiesData(j)
        const keys = Object.keys(j)
        if (keys.length > 0) setSelectedCity(prev => prev || keys[0])
      }catch(err){ if (!cancelled) setError(String(err)) }
      finally{ if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // computes hourly averages from raw readings for the selected city and date range
  useEffect(() => {
    if (!selectedCity) return
    const readings = citiesData[selectedCity] || []
    const s = range.start ? new Date(range.start) : null
    const e = range.end ? new Date(range.end) : null

    // group by UTC hour
    const groups = new Map()
    for (const r of readings) {
      const d = new Date(r.observationTime)
      if (isNaN(d)) continue
      if (s && d < s) continue
      if (e && d > e) continue
      const h = new Date(d)
      h.setUTCMinutes(0,0,0)
      const key = h.toISOString()
      const arr = groups.get(key) || []
      arr.push(typeof r.tempC === 'number' ? r.tempC : parseFloat(r.tempC))
      groups.set(key, arr)
    }

    const out = [...groups.entries()].map(([time, vals]) => ({ time, avg_temp: vals.reduce((a,b)=>a+b,0)/vals.length }))
    out.sort((a,b) => new Date(a.time) - new Date(b.time))
    setData(out)
  }, [citiesData, selectedCity, range])

  const cityList = Object.keys(citiesData)

  return (
    <div className="app">
      <div className="header">
        <h1>Weather — Temperature</h1>
        <div className="small">Data source: OpenWeatherMap (via own backend)</div>
      </div>

      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <CitySelector cities={cityList} value={selectedCity || ''} onChange={setSelectedCity} />
            <DateRangeSelector onChange={(r) => typeof r === 'function' ? setRange(r(range)) : setRange(r)} />
          </div>
          <div className="small">Showing: <strong>{selectedCity || '—'}</strong></div>
        </div>

        {loading && <div className="small">Loading…</div>}
        {error && <div style={{color:'crimson'}}>{error}</div>}

        <TempChart data={data} />

        <div className="table">
          <strong>Latest points</strong>
            <ul>
              {data.slice(-20).reverse().map((d, i) => {
                //code could go here
                return (
                  <li key={i}>
                    {formatDateConditionally(new Date(d.time))} — {d.avg_temp != null ? d.avg_temp.toFixed(1) + ' °C' : '—'}
                  </li>
                );
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}