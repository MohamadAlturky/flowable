"use client"
import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count:2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx })),
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx })),
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

const Demo = () => {
  const [range, setRange] = useState(2.9)
  return (
      <HeatMap
        value={value}
        width={"100%"}
        style={{ '--rhm-rect': '#b9b9b9' }}
        startDate={new Date('2016/01/01')}
        legendRender={(props) => <rect {...props} y={props.y + 10} rx={range} />}
        rectProps={{
          rx: range
        }}
        panelColors={{
          0: '#eef2ff',
          2: '#e0e7ff',
          4: '#c7d2fe',
          10: '#a5b4fc',
          20: '#818cf8',
          30: '#6366f1',
        }}
      />
  )
};
export default Demo
function generateRandomContributionData(days) {
  const contributionData = {};
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Format date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    // Generate a random contribution count (0 to 10)
    const contributionCount = Math.floor(Math.random() * 11); // Random number between 0 and 10
    contributionData[formattedDate] = contributionCount;
  }

  return contributionData;
}
