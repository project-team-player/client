import React from 'react';
import GameThread from '../components/GameThread';

// CSS
import '../styles/GameCard.css';

// Components

class GameCard extends React.Component {
  render() {
    // consts here
    const {
      gameDetails,
      showGameThread,
      openGameThread,
      closeGameThread,
      setCurrentGame
    } = this.props;
    return (
      <div className='modal-page-container'>
        <div className='thefuckingthreadcontainer'>
          {showGameThread ? (
            <GameThread
              showModal={showGameThread}
              closeGameThread={closeGameThread}
              gameDetails={gameDetails}
            />
          ) : (
            <></>
          )}
        </div>
        {!showGameThread ? (
          <div
            className='GameCard'
            role='button'
            onClick={() => setCurrentGame(gameDetails).then(openGameThread)}
            onKeyPress={event => {
              this.handleKeyPress(event);
              openGameThread();
            }}
          >
            <div
              className='Away'
              style={{
                backgroundColor: '#' + gameDetails.awayTeam.primaryColor
              }}
            >
              <img
                className='AwayImg'
                src={gameDetails.awayTeam.logo}
                alt='Logo'
              />
              ;
            </div>
            <div
              className='Home'
              style={{
                backgroundColor: '#' + gameDetails.homeTeam.primaryColor
              }}
            >
              <img
                className='HomeImg'
                src={gameDetails.homeTeam.logo}
                alt='Logo'
              />
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
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default GameCard;
