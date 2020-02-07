import React from "react";
// import GameThread from "../components/GameThread";
// Import Axios Library
import axios from "axios";
import ReactGA from "react-ga";

// CSS
import "../styles/GamesList.css";

// Components
import GameCard from "../components/GameCard";
import GameThread from "../components/GameThread";
import GameWeekOptions from '../components/GameWeekOptions';

// Helpers
import { getCurrentGameWeek } from "../utils/nfl";

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
    ReactGA.pageview(window.location.pathname + window.location.search);
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
      .get(`${process.env.REACT_APP_SERVER_URL}/games/week/${number}`)
      .then(response => {
        this.setState({ games: response.data.gamesList });
      });
    this.setState({ currentWeek: number });
  };

  getTotalWeeks = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/games/weekTotal/NFL`)
      .then(response => {
        this.setState({ totalWeeks: response.data.totalWeeksNFL });
      });
  };
  // Functions for options
  getGamesForWeek = e => {
    e.preventDefault();
    const weekNumber = e.target.value;
    this.getListOfGames(parseInt(weekNumber));
  };

  render() {
    return (
      <main className="gameListContainer">
        {!this.state.showGameThread ? (
          <div className="gamesListHeader">
            <h2 className="gamesListTitle">NFL Games - 2019</h2>
            <form id="weekSelection">
                <select
                  id="weeks"
                  onChange={event => this.getGamesForWeek(event)}
                >
                  <GameWeekOptions totalWeeks="17" explicitWeek={true} />
                </select>
              </form>
          </div>
        ) : (
          <></>
        )}

        {!this.state.showGameThread ? (
          <div className="gamesListGrid">
            {this.state.games.sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            }).map(game => (
              <GameCard
                key={game._id}
                gameDetails={game}
                showGameThread={this.state.showGameThread}
                openGameThread={this.openGameThread}
                closeGameThread={this.closeGameThread}
                setCurrentGame={this.setCurrentGame}
                linkToModal={true}
                isALink={true}
              />
            ))}
          </div>
        ) : (
          <>
            <GameThread
              showModal={this.state.showGameThread}
              closeGameThread={this.closeGameThread}
              gameDetails={this.state.currentGame}
            />
          </>
        )}
      </main>
    );
  }
}

export default GamesList;
