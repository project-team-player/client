import React from 'react';
// import GameThread from "../components/GameThread";
// Import Axios Library
import axios from 'axios';

// CSS
import '../styles/GamesList.css';

// Components
import GameCard from '../components/GameCard';
import GameThread from '../components/GameThread';
import OptionsButton from '../components/OptionsButton';

// Helpers
import { getCurrentGameWeek } from '../utils/nfl';

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGameThread: false,
      currentWeek: String,
      currentGame: {},
      games: [],
      totalWeeks: 0
    };

    this.openGameThread = this.openGameThread.bind(this);
    this.closeGameThread = this.closeGameThread.bind(this);
  }

  componentDidMount() {
    this.getListOfGames(getCurrentGameWeek());
    this.getTotalWeeks();
  }

  openGameThread = async () => {
    await this.setState({ showGameThread: true });
  };

  closeGameThread = async () => {
    await this.setState({ showGameThread: false });
  };

  setCurrentGame = async game => {
    await this.setState({ currentGame: game });
  };

  // Sets state of
  getListOfGames = async number => {
    await axios
      .get(`https://pecorina-development.herokuapp.com/games/week/${number}`)
      .then(response => {
        this.setState({ games: response.data.gamesList });
      });
    this.setState({ currentWeek: number });
  };

  getTotalWeeks = async () => {
    await axios
      .get('https://pecorina-development.herokuapp.com/games/weekTotal/NFL')
      .then(response => {
        this.setState({ totalWeeks: response.data.totalWeeksNFL });
      });
  };

  generateOptions = () => {
    let optionsList = [];
    for (let i = 1; i < this.state.totalWeeks + 1; i++) {
      optionsList.push(<OptionsButton weekNumber={i} key={i} />);
    }
    return optionsList;
  };

  // Functions for options
  getGamesForWeek = e => {
    e.preventDefault();
    const weekNumber = document.getElementById('weekSelection').elements[
      'weeks'
    ].value;
    this.getListOfGames(parseInt(weekNumber));
  };

  render() {
    return (
      <main>
        {!this.state.showGameThread ? (
          <div className='gamesListHeader'>
            <h2 className='gamesListTitle'>
              NFL Games 2019 - Week {this.state.currentWeek}
            </h2>
            <div className='gamesListHeaderRight'>
              <div className='sliceNumberHeader'>
                <img src={require('../images/logo.svg')} alt='slice-it-logo' />
                <p className='sliceNumber'>200</p>
              </div>

              <form id='weekSelection'>
                <select
                  id='weeks'
                  onChange={event => this.getGamesForWeek(event)}
                >
                  {this.generateOptions()}
                </select>
              </form>
              <div>
                <button className='changeViewButton' id='listButton'></button>
                <button className='changeViewButton' id='columnButton'></button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

          {!this.state.showGameThread ? (
          <div className='gamesListGrid'>
            {this.state.games.map(game => (
              <GameCard
                key={game._id}
                gameDetails={game}
                showGameThread={this.state.showGameThread}
                openGameThread={this.openGameThread}
                closeGameThread={this.closeGameThread}
                setCurrentGame={this.setCurrentGame}
              />
            ))}
        </div>
          )
          : (
            <GameThread
              showModal={this.state.showGameThread}
              closeGameThread={this.closeGameThread}
              gameDetails={this.state.currentGame}
            />
          )}
      </main>
    );
  }
}

export default GamesList;
