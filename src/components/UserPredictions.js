import React, { useState, useEffect } from 'react';
import '../styles/UserPredictions.css';

const UserPredictions = ({ percentages, gameDetails }) => {
  const [awayPercentage, setAwayPercentage] = useState(50);
  const [homePercentage, setHomePercentage] = useState(50);

  useEffect(() => {
    setAwayPercentage(percentages.awayTeam);
    setHomePercentage(percentages.homeTeam);
  });

  return (
    <div className="predictions card">
      <h2 className="predictionsTitle">Who's Got Sauce?</h2>

      <div className="pie">
        <div
          className="pie-segment"
          style={{
            '--offset': `${homePercentage}`, '--percent': `${awayPercentage}`, '--over50': `${awayPercentage > 50 ? 1 : 0}`, '--teamColor': `#${gameDetails.awayTeam.primaryColor}`,
          }}
        />
        <div
          className="pie-segment"
          style={{
            '--offset': 0, '--percent': `${homePercentage}`, '--over50': `${homePercentage > 50 ? 1 : 0}`, '--teamColor': `#${gameDetails.homeTeam.primaryColor}`,
          }}
        />
      </div>

      <div className="teamPercentages">
        <div className="awayTeamPercentage">
          <span className="awayTeamName">{gameDetails.awayTeam.key}</span>
          <div className="teamColorBlock" style={{ '--teamColor': `#${gameDetails.awayTeam.primaryColor}` }}>
            {percentages.awayTeam}
%
          </div>
        </div>
        <span className="dot" />
        <div className="homeTeamPercentage">
          <div className="teamColorBlock" style={{ '--teamColor': `#${gameDetails.homeTeam.primaryColor}` }}>
            {percentages.homeTeam}
%
          </div>
          <span className="homeTeamName">{gameDetails.homeTeam.key}</span>
        </div>

      </div>

      <p>* Based on user bets</p>
    </div>
  );
};

export default UserPredictions;
