import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GameHeader.css';
import { convertToDate } from '../utils/helpers';

const GameHeader = ({ gameDetails, gameDetails: { awayScore, homeScore} }) => (
  <div className="gameHeader card">
    <h3 className="gameDate">{convertToDate(gameDetails.dateTime, 'est')}</h3>
    <div className="teams">
      <div className="team-container team-container-away">
        <div className="logoContainer">
          <img
            className="teamLogo"
            src={gameDetails.awayTeam.logo}
            alt="logo"
          />
        </div>

        <span className="teamName away">
          {gameDetails.awayTeam.name}
        </span>

      </div>

      <div className="vs-container">
        <span className="vs-text">AT</span>
      </div>

      <div className="team-container team-container-home">
        <span className="teamName home">
          {gameDetails.homeTeam.name}
        </span>
        <div className="logoContainer">
          <img
            className="teamLogo"
            src={gameDetails.homeTeam.logo}
            alt="alt"
          />
        </div>
      </div>
    </div>

    <div className="game-score-container"><span className="game-score">{homeScore} : {awayScore}</span></div>
  </div>
);

GameHeader.propTypes = {
  gameDetails: PropTypes.shape({}).isRequired,
};

export default GameHeader;
