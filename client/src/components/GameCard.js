import React from 'react';

// CSS
import '../styles/GameCard.css';

// Components

class GameCard extends React.Component {
  render() {
    return (
      <div className='GameCard'>
        <div className='Away'>Away</div>
        <div className='Home'>Home</div>
      </div>
    );
  }
}

export default GameCard;
