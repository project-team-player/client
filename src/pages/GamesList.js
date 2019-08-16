import React from 'react';
import GameCard from '../components/GameCard';
import GameThread from '../components/GameThread';

// CSS
import '../styles/GamesList.css';
import { thisExpression, switchStatement } from '@babel/types';

// Components

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGameThread: false,
    }

    this.showGameThread = this.showGameThread.bind(this);
    this.closeGameThread = this.closeGameThread.bind(this);
  }

  showGameThread() {
    console.log('hey hey');
    this.setState({ showGameThread: true});
  }

  closeGameThread() {
    console.log('closing');
    this.setState({ showGameThread: false});
  }

  render() {
    return (
      <main>
        <GameThread showModal={this.state.showGameThread} closeGameThread={this.closeGameThread} />
        {/* Ambigious Title Here */}
        <h2 className='GamesListTitle'>Game Threads Week 1</h2>
        <body className='GamesListGrid'>
          <GameCard showGameThread={this.showGameThread} />
          <GameCard onClick={this.showGameThread} />
          <GameCard onClick={this.showGameThread} />
          <GameCard onClick={this.showGameThread} />
          <GameCard onClick={this.showGameThread} />
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
