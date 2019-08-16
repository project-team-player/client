import React from 'react';

// CSS
import '../styles/GameCard.css';

// Components

class GameCard extends React.Component {
  render() {
    return (
      <div className='GameCard'>
        <div className='Away'>
          <img
            className='AwayImg'
            src={
              'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chicago_Bears_logo.svg'
            }
            alt='Logo'
          />
          ;
        </div>
        <div className='Home'>
          <img
            className='HomeImg'
            src={
              'https://upload.wikimedia.org/wikipedia/en/b/b9/New_England_Patriots_logo.svg'
            }
            alt='Logo'
          />
        </div>
        <div className='GameInfo'>
          <div className='Title'>
            <b className='TeamKey'>CHI</b>
            <b className='Versus'>VS</b>
            <b className='TeamKey'>GB</b>
          </div>
          <div className='Date'>Sun, Aug 17th 7pm PST</div>
        </div>
      </div>
    );
  }
}

export default GameCard;
