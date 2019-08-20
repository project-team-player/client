import React from 'react';
import GameCard from '../components/GameCard';
import GameThread from '../components/GameThread';
import axios from 'axios';

// CSS
import '../styles/GamesList.css';
import { thisExpression, switchStatement } from '@babel/types';

// Components

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGameThread: false,
      games: []
    };

    this.showGameThread = this.showGameThread.bind(this);
    this.closeGameThread = this.closeGameThread.bind(this);
  }

  showGameThread() {
    console.log('hey hey');
    this.setState({ showGameThread: true });
  }

  closeGameThread() {
    console.log('closing');
    this.setState({ showGameThread: false });
  }

  getListOfGames = () => {
    console.log('Getting List of Games');
    axios
      .get('https://pecorina-development.herokuapp.com/games/week/1')
      .then(response => {
        this.setState({ games: response.data.gamesList });
      });
    console.log(this.state.games);
  };

  render() {
    return (
      <main>
        <GameThread
          showModal={this.state.showGameThread}
          closeGameThread={this.closeGameThread}
        />
        <h2 className='GamesListTitle'>Game Threads Week 1</h2>

        <nav className='WeeksButtonContainer'>
          <button className='WeeksButton' onClick={this.getListOfGames}>
            Week 1
          </button>
        </nav>

        <body className='GamesListGrid'>
          {/* Components being maped out here 
          Map out an array of objects
            take out their attributes and pass them as state
            */}
          {this.state.games.map(game => {
            `<h2>game.week</h2>`;
          })}
          <GameCard showGameThread={this.showGameThread} />
        </body>
      </main>
    );
  }
}

export default GamesList;
