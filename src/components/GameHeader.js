import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GameHeader.css';
import { convertToDate } from '../utils/helpers';

const GameHeader = ({ gameDetails }) => (
  <div className="gameHeader card">
    <h3 className="gameDate">{convertToDate(gameDetails.dateTime, 'est')}</h3>
    <div className="teams">
      <div className="teamContainer">
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

      <div className="teamText">
        <span className="vs">AT</span>
      </div>


      <div className="teamContainer">
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

    <div className="gameScore">0 : 0</div>
  </div>
);

GameHeader.propTypes = {
  gameDetails: PropTypes.shape({}).isRequired,
};

export default GameHeader;
