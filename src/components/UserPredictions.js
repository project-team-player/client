import React, { useState, useEffect, useRef } from 'react';
import PieChart from './PieChart';
import '../styles/UserPredictions.css';

/**
 * 
 * @param {object} percentages How many percent of users voted on each team
 * @param {object} gameDetails Game specific information like teams, scores etc. 
 */
const UserPredictions = ({ percentages, gameDetails, classes = '', withHeader, isCard }) => {
  // See React docs on hooks if this looks unfamiliar https://reactjs.org/docs/hooks-intro.html  
  const [awayPercentage, setAwayPercentage] = useState(50.00);
  const [homePercentage, setHomePercentage] = useState(50.00);
  const [winningTeamColor, setWinningTeamColor] = useState('');
  const [winByPercentage, setWinByPercentage] = useState(50);
  const [homeAnimation, startHomeAnimation] = useState(false);
  const [awayAnimation, startAwayAnimation] = useState(false);

  /**
   * In this case UseEffect works similar to ComponentDidMount and ComponentDidUpdate
   */
  useEffect(() => {
    setAwayPercentage(percentages.awayTeam);
    setHomePercentage(percentages.homeTeam);
    setWinByPercentage(getWinByPercentage());
    setWinningTeamColor(getWinningTeamColor());
  });

  /**
   * Gets the winning team color 
   * @returns {string} winning team primary color code in hexformat
   */
  const getWinningTeamColor = () => {
    if (awayPercentage > homePercentage) {
      return `#${gameDetails.awayTeam.primaryColor}`;
    } else if (homePercentage > awayPercentage) {
      return `#${gameDetails.homeTeam.primaryColor}`;
    } else {
      return `#${gameDetails.awayTeam.primaryColor}`;
    }
  }

  /**
   * Get how many percentage the winning team is winning by as a number
   * @returns {number} win-by percentage
   */ 
  const getWinByPercentage = () => {
    let winPercent = 0;
    if (awayPercentage > homePercentage) {
      winPercent = awayPercentage - homePercentage;
      startAwayAnimation(true);
    } else if (homePercentage > awayPercentage) {
      winPercent = homePercentage - awayPercentage;
      startHomeAnimation(true);
    } else {
      winPercent = 50;      
    }
    return winPercent;
  }
  return (
    <div className={`${isCard ? 'card' : ''} ${classes}`}>
    {withHeader &&
      <div className="cardHeader">
        <h2 className="cardTitle">Who's Got Sauce?</h2>
      </div>
    }
      <div className='cardContent predictions'>
      <PieChart 
        homePercentage={homePercentage} 
        homeColor={`#${gameDetails.homeTeam.primaryColor}`} 
        awayColor={`#${gameDetails.awayTeam.primaryColor}`}
        width='80%'
      />

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
    </div>
  );
};



export default UserPredictions;
