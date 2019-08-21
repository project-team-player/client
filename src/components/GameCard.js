import React from 'react';

// CSS
import '../styles/GameCard.css';

// Components

class GameCard extends React.Component {
  render() {
    // consts here
    const { gameDetails } = this.props;
    return (
      <div className='GameCard' onClick={this.props.showGameThread}>
        <div
          className='Away'
          style={{
            backgroundColor: '#' + gameDetails.awayTeam.primaryColor
          }}
        >
          <img className='AwayImg' src={gameDetails.awayTeam.logo} alt='Logo' />
          ;
        </div>
        <div
          className='Home'
          style={{
            backgroundColor: '#' + gameDetails.homeTeam.primaryColor
          }}
        >
          <img className='HomeImg' src={gameDetails.homeTeam.logo} alt='Logo' />
        </div>
        <div className='GameInfo'>
          <div className='Title'>
            <b className='TeamKey'>{gameDetails.awayTeam.key}</b>
            <b className='Versus'>VS</b>
            <b className='TeamKey'>{gameDetails.homeTeam.key}</b>
          </div>
          {/* TODO: Create date parse for below Ex.2019-09-05T20:20:00 */}
          <div className='Date'>{gameDetails.dateTime.toString()}</div>
        </div>
      </div>
    );
  }
}

export default GameCard;
