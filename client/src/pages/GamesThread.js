import React from 'react';
import GameCard from '../components/GameCard';

// Components

class GamesThread extends React.Component {
  render() {
    return (
      <main>
        {/* Ambigious Title Here */}
        <h2>Game Threads Week 1</h2>
        {/* Components being maped out here */}
        <GameCard />
      </main>
    );
  }
}

export default GamesThread;
