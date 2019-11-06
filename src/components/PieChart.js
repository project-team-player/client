import React, { useState, useEffect, useRef } from 'react';

const PieChart = ({ homePercentage, awayColor = 'black', homeColor = 'red', width = '100%' }) => {
  const [homePercent, setHomePercentage] = useState(50);
  const svgRef = useRef(null);

  // Checks if percentage of home bets have changed and reflects this in state. SetTimeout is used to give enough delay that the animation will run when component mounts for the first time. 
  useEffect(() => {
    if (homePercentage !== homePercent) {
      if (homePercentage > 99) {
        setTimeout(() => setHomePercentage(parseFloat(homePercentage)), 1) 
      } else {
        setTimeout(() => setHomePercentage(parseFloat(homePercentage)), 1) 
      }
    }
  }, [homePercentage])

  return (
    <svg viewBox="0 0 32 32" className="pie-chart" style={{ borderRadius: '50%', transform: 'rotate(-90deg)' }}>
      <circle r="16" cx="16" cy="16" fill={awayColor} stroke={homeColor} 
      // Stroke-dasharray consist of two props, stroke length and gap like stroke-dasharray="length gap". 2 *π * r is equal to circle circumfrence. If we divide circumfrene with 100 we can easily multiply with the wanted circle fill percentage.
      // stroke-width="32" stroke-dasharray={`${(2 * Math.PI * 16 / 100) * homePercent} 100`}  ref={svgRef} style={{ transition: '1.5s stroke-dasharray', border: 'none' }} />
      stroke-width="32" stroke-dasharray={`${(2 * Math.PI * 16 / 100) * homePercent} ${2 * Math.PI * 16}`}  ref={svgRef} style={{ transition: '1.5s stroke-dasharray', border: 'none' }} />

    </svg>  
  )
}

export default PieChart;