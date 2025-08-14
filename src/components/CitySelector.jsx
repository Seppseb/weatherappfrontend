import React from 'react'

export default function CitySelector({ cities, value, onChange }){
  if (!cities || cities.length === 0) return null
  return (
    <select className="select" value={value} onChange={e => onChange(e.target.value)}>
      {cities.map((c, i) => (
        <option key={i} value={c}>{c}</option>
      ))}
    </select>
  )
}