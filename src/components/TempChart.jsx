import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function TempChart({ data }){
  return (
    <div className="card chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          
          {/* Use the helper function for the X-axis ticks */}
          <XAxis 
            dataKey="time" 
            tickFormatter={formatDateConditionally} 
            minTickGap={40} // Increased gap for better readability
            dy={5} // Move tick labels down slightly
          />
          
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          
          {/* Use the helper function for the tooltip label */}
          <Tooltip 
          labelFormatter={[formatDateConditionally, 'Time']} 
          formatter={(value) => [`${value.toFixed(1)} °C`, 'Temperature']}
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--accent)',
            color: 'var(--text)' // main text color
          }}
          labelStyle={{
            color: 'var(--accent)', // date label color
            fontWeight: 600
          }}
          itemStyle={{
            color: 'var(--text)' // temperature text color
          }}
        />
          
          <Line type="monotone" dataKey="avg_temp" dot={false} stroke="#14b8a6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const formatDateConditionally = (time) => {
  const date = new Date(time);
  const currentYear = new Date().getFullYear();
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  if (currentYear !== year) {
    // Only show the year for different years
    return `${day}.${month}.${year}`;
  } else {
    // For the current year, show day/month and time on separate lines for clarity in the chart
    // Recharts handles the newline character '\n' for multi-line labels in tooltips
    // For the X-axis, it will likely just show the first line.
    return `${day}.${month},\n${hours}:${minutes}`;
  }
};