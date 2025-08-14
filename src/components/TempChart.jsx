import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function TempChart({ data }){
  return (
    <div className="card chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          <XAxis dataKey="time" tickFormatter={(t)=> new Date(t).toLocaleString()} minTickGap={20} />
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip labelFormatter={t => new Date(t).toLocaleString()} />
          <Line type="monotone" dataKey="avg_temp" dot={false} stroke="#14b8a6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}