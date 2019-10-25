import React from "react";
// import GameThread from "../components/GameThread";
// Import Axios Library
import axios from "axios";

// CSS
import "../styles/GamesList.css";

// Components
import GameCard from "../components/GameCard";
import GameThread from "../components/GameThread";
import OptionsButton from "../components/OptionsButton";

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

  generateOptions = () => {
    const optionsList = [];
    const currentGameWeek = getCurrentGameWeek();
    for (let i = 1; i < this.state.totalWeeks + 1; i++) {
      optionsList.push(
        <OptionsButton
          weekNumber={i}
          key={i}
          isCurrentWeek={currentGameWeek === i}
        />
      );
    }
    return optionsList;
  };

  // Functions for options
  getGamesForWeek = e => {
    e.preventDefault();
    const weekNumber = document.getElementById("weekSelection").elements.weeks
      .value;
    this.getListOfGames(parseInt(weekNumber));
  };

  render() {
    return (
      <main className="gameListContainer">
        {!this.state.showGameThread ? (
          <div className="gamesListHeader">
            <div className="gamesListTitle">
              <h2>NFL Games 2019 -</h2>
              <form id="weekSelection">
                <select
                  id="weeks"
                  onChange={event => this.getGamesForWeek(event)}
                >
                  {this.generateOptions()}
                </select>
              </form>
            </div>
            {/* <div className="gamesListHeaderRight">
              <div className="sliceNumberHeader">
                <img src={require('../images/logo.svg')} alt="slice-it-logo" />
                <p className="sliceNumber">200</p>
              </div>

              <div>
                <button className="changeViewButton" id="listButton" />
                <button className="changeViewButton" id="columnButton" />
              </div>
            </div> */}
          </div>
        ) : (
          <></>
        )}

        {!this.state.showGameThread ? (
          <div className="gamesListGrid">
            {this.state.games.map(game => (
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
