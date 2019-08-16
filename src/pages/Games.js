import React from 'react';
import GameThread from '../components/GameThread';
import '../styles/GameThread.css';

class Games extends React.Component {
  render() {
    return (
      <div className='weirdContainer'>
        <GameThread showModal={true} />

        <div className='title'>PUT GAMETHREAD HERE</div>
      </div>
    );
  }
}

export default Games;
