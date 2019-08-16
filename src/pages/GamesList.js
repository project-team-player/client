import React from 'react';
import GameCard from '../components/GameCard';

// CSS
import '../styles/GamesList.css';

// Components

class GamesList extends React.Component {
  render() {
    return (
      <main>
        {/* Ambigious Title Here */}
        <h2 className='GamesListTitle'>Game Threads Week 1</h2>
        <body className='GamesListGrid'>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </body>
        {/* Components being maped out here 
            Map out an array of objects
            Destructure their attributes and pass them as state
            */}
      </main>
    );
  }
}

export default GamesList;
