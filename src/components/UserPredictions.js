import React, { useState, useEffect } from 'react';
import '../styles/UserPredictions.css';

const UserPredictions = ({ percentages, gameDetails }) => {
  const [awayPercentage, setAwayPercentage] = useState(50.00);
  const [homePercentage, setHomePercentage] = useState(50.00);
  const [winningTeamColor, setWinningTeamColor] = useState('');
  const [winByPercentage, setWinByPercentage] = useState(50);
  const [homeAnimation, startHomeAnimation] = useState(false);
  const [awayAnimation, startAwayAnimation] = useState(false);


  useEffect(() => {
    console.log('I ran and updated');
    setAwayPercentage(percentages.awayTeam);
    setHomePercentage(percentages.homeTeam);
    setWinByPercentage(getWinByPercentage());
    setWinningTeamColor(calculateWinningTeamColor());
    if (winByPercentage !== 50) {
      console.log('The winning side is winning by', winByPercentage, '%');
    }
  });

  const calculateWinningTeamColor = () => {
    console.log('calculating winning team where the away team has', awayPercentage, 'And the home team has', homePercentage);
    if (awayPercentage > homePercentage) {
      console.log('away wins');
      return `#${gameDetails.awayTeam.primaryColor}`;
    } else if (homePercentage > awayPercentage) {
      console.log('home wins');
      return `#${gameDetails.homeTeam.primaryColor}`;
    } else {
      console.log('Its a tie');
      return `#${gameDetails.awayTeam.primaryColor}`;
    }
  }

  const getWinByPercentage = () => {
    let losingPercent = 0;
    if (awayPercentage > homePercentage) {
      losingPercent = awayPercentage - homePercentage;
      startAwayAnimation(true);
    } else if (homePercentage > awayPercentage) {
      losingPercent = homePercentage - awayPercentage;
      startHomeAnimation(true);
    } else {
      losingPercent = 50;      
    }
    return losingPercent;
  }

  return (
    <div className="predictions card">
      <h2 className="predictionsTitle">Who's Got Sauce?</h2>

      <div className={`pie ${homeAnimation ? 'animated-pie-home' : ''} ${awayAnimation ? 'animated-pie-away' : ''}`} style={{ '--away-color': `#${gameDetails.awayTeam.primaryColor}`, '--home-color': `#${gameDetails.homeTeam.primaryColor}`, '--winning-team-color': winningTeamColor, '--win-by-percentage': winByPercentage }}>
      </div>

      <div className="teamPercentages">
        <div className="awayTeamPercentage">
          <span className="awayTeamName">{gameDetails.awayTeam.key}</span>
          <div className="teamColorBlock" style={{ '--teamColor': `#${gameDetails.awayTeam.primaryColor}` }}>
            {parseFloat(percentages.awayTeam).toFixed(2)}
%
          </div>
        </div>
        <span className="dot" />
        <div className="homeTeamPercentage">
          <div className="teamColorBlock" style={{ '--teamColor': `#${gameDetails.homeTeam.primaryColor}` }}>
            {parseFloat(percentages.homeTeam).toFixed(2)}
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
