import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GameHeader.css';
import { convertToDate } from '../utils/helpers';

const GameHeader = ({ device, gameDetails, gameDetails: { awayScore, homeScore, homeTeam: { name: homeTeamName } } }) => {

  return (
    <div className="gameHeader card">
    <div className="cardHeader">
      <h2 className="gameDate cardTitle">{`${convertToDate(gameDetails.dateTime, 'est')} @ ${homeTeamName.split(' ').slice(-1)}`}</h2>
    </div>
    <div className="cardContent gameHeaderContent">
      <div className="team-container team-container-away">
        <div className="logoContainer">
          <img
            className="teamLogo"
            src={gameDetails.awayTeam.logo}
            alt="logo"
          />
        </div>

        <span className="teamName away">
          {device.mobile ? gameDetails.awayTeam.name.split(' ').slice(-1) : gameDetails.awayTeam.name}
        </span>
        {/* <span>{awayRecord}</span> */}

      </div>

      <div className="score-container">
        <span className="score-text">
        {awayScore} : {homeScore}
        </span>
      </div>

      <div className="team-container team-container-home">
        <span className="teamName home">
        {device.mobile ? gameDetails.homeTeam.name.split(' ').slice(-1) : gameDetails.homeTeam.name}
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
  </div>
  )
};

GameHeader.propTypes = {
  gameDetails: PropTypes.shape({}).isRequired,
};

export default GameHeader;
