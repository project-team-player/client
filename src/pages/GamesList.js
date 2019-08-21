import React from 'react';
import GameCard from '../components/GameCard';
import GameThread from '../components/GameThread';
// Import Axios Library
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
      games: [
        {
          isFinished: false,
          _id: '5d5ade7a89fca31ad06e8df8',
          week: 1,
          slug: 'GB-vs-CHI-2019-week-1',
          awayTeam: {
            key: 'GB',
            awayID: '5d5325666e95508d94ecb829',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Bay_Packers_logo.svg',
            name: 'Green Bay Packers',
            primaryColor: '203731',
            secondaryColor: 'FFB612'
          },
          homeTeam: {
            key: 'CHI',
            homeID: '5d5325666e95508d94ecb823',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chicago_Bears_logo.svg',
            name: 'Chicago Bears',
            primaryColor: '0B162A',
            secondaryColor: 'C83803'
          },
          awayScore: 0,
          homeScore: 0,
          date: '2019-09-05T00:00:00',
          dateTime: '2019-09-05T20:20:00',
          gameThreadReference: {
            gameThreadID: '5d5aded03712403404f82806',
            objectReference: '5d5aded03712403404f82806'
          }
        }
      ]
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
          {this.state.games.map(game => (
            <GameCard gameDetails={game} showGameThread={this.showGameThread} />
          ))}
          {/* <GameCard showGameThread={this.showGameThread} /> */}
        </body>
      </main>
    );
  }
}

export default GamesList;
