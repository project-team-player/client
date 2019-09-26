import React from 'react';
import '../styles/UserPredictions.css';

const UserPredictions = ({ percentages, gameDetails }) => (
  <div className="predictions card">
    {console.log(gameDetails)}

    <h2 className="predictionsTitle">Who's Got Sauce?</h2>

    <div className="pie">
      <div
        className="pie-segment"
        style={{
          '--offset': 0, '--percent': `${percentages.awayTeam}`, '--over50': 1, '--teamColor': `#${gameDetails.awayTeam.primaryColor}`,
        }}
      />
      <div
        className="pie-segment"
        style={{
          '--offset': `${percentages.awayTeam}`, '--percent': `${percentages.homeTeam}`, '--over50': 1, '--teamColor': `#${gameDetails.homeTeam.primaryColor}`,
        }}
      />
    </div>

    <div className="teamPercentages">
      <div className="awayTeamPercentage">
        <span className="awayTeamName">{gameDetails.awayTeam.key}</span>
        <div className="teamColorBlock">
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

export default UserPredictions;
