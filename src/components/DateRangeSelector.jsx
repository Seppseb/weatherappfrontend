import React from 'react'

function isoNow(){ return new Date().toISOString() }
function isoHoursAgo(h){ const d = new Date(); d.setHours(d.getHours() - h); return d.toISOString(); }
function isoDaysAgo(d){ const dd = new Date(); dd.setDate(dd.getDate() - d); return dd.toISOString(); }

export default function DateRangeSelector({ onChange }){
  return (
    <div className="controls">
      <button className="card" onClick={() => onChange({ start: isoHoursAgo(24), end: isoNow() })}>Last 24h</button>
      <button className="card" onClick={() => onChange({ start: isoDaysAgo(7), end: isoNow() })}>Last 7 days</button>
      <button className="card" onClick={() => onChange({ start: isoDaysAgo(30), end: isoNow() })}>Last 30 days</button>
      {/* Simple manual date inputs (date only) */}
      <label className="small">Start
        <input type="date" onChange={e => {
          const s = e.target.value ? new Date(e.target.value).toISOString() : null
          onChange(prev => ({ ...prev, start: s }))
        }} />
      </label>
      <label className="small">End
        <input type="date" onChange={e => {
          const s = e.target.value ? new Date(e.target.value).toISOString() : null
          onChange(prev => ({ ...prev, end: s }))
        }} />
      </label>
    </div>
  )
}