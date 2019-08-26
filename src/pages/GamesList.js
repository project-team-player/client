import React from 'react';
import GameCard from '../components/GameCard';
import GameThread from '../components/GameThread';
// import GameThread from "../components/GameThread";
// Import Axios Library
import axios from 'axios';

// CSS
import '../styles/GamesList.css';
import { async } from 'q';
// import { thisExpression, switchStatement } from "@babel/types";

// Components

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGameThread: false,
      currentGame: {},
      games: []
    };

    this.openGameThread = this.openGameThread.bind(this);
    this.closeGameThread = this.closeGameThread.bind(this);
  }

  componentDidMount() {
    this.getListOfGames();
  }

  openGameThread = async () => {
    console.log('hey hey');
    await this.setState({ showGameThread: true });
  };

  closeGameThread = async () => {
    console.log('closing');
    await this.setState({ showGameThread: false });
  };

  setCurrentGame = async game => {
    await this.setState({ currentGame: game });
  };

  // Sets state of
  getListOfGames = async () => {
    console.log('Getting List of Games');
    await axios
      .get('https://pecorina-development.herokuapp.com/games/week/1')
      .then(response => {
        this.setState({ games: response.data.gamesList });
      });
    console.log(this.state.games);
  };

  testFunction = () => {
    console.log('TEST TEST TEST TEST TEST');
  };

  render() {
    return (
      <main>
        {!this.state.showGameThread ? (
          <div className='GameListHeader'>
            <h2 className='GamesListTitle'>Week 1 Games</h2>
            {/* Slices from Data in this header */}
            <h2 className=''>Slices</h2>
            <form onSubmit={this.testFunction()}>
              <select name='cars'>
                <option value='week 1'>week 1</option>
                <option value='week 2'>week 2</option>
              </select>
              <input type='submit' />
            </form>
          </div>
        ) : (
          <></>
        )}

        <body className='GamesListGrid'>
          {!this.state.showGameThread ? (
            this.state.games.map(game => (
              <GameCard
                gameDetails={game}
                showGameThread={this.state.showGameThread}
                openGameThread={this.openGameThread}
                closeGameThread={this.closeGameThread}
                setCurrentGame={this.setCurrentGame}
              />
            ))
          ) : (
            <GameThread
              showModal={this.state.showGameThread}
              closeGameThread={this.closeGameThread}
              gameDetails={this.state.currentGame}
            />
          )}
        </body>
      </main>
    );
  }
}

export default GamesList;
