import React from "react";
import GameThread from "../components/GameThread";

// CSS
import "../styles/GameCard.css";

// Components

class GameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showGameThread: false
    };

    this.showGameThread = this.showGameThread.bind(this);
    this.closeGameThread = this.closeGameThread.bind(this);
  }

  showGameThread() {
    console.log("hey hey");
    this.setState({ showGameThread: true });
  }

  closeGameThread() {
    console.log("closing");
    this.setState({ showGameThread: false });
  }

  render() {
    // consts here
    const { gameDetails } = this.props;
    return (
      <div className="modal-page-container">
        <div className="thefuckingthreadcontainer">
          {this.state.showGameThread ? (
            <GameThread
              showModal={this.showGameThread}
              closeGameThread={this.closeGameThread}
              gameDetails={gameDetails}
            />
          ) : (
            <></>
          )}
        </div>
        {!this.state.showGameThread ? (
          <div className="GameCard" onClick={this.showGameThread}>
            <div
              className="Away"
              style={{
                backgroundColor: "#" + gameDetails.awayTeam.primaryColor
              }}
            >
              <img
                className="AwayImg"
                src={gameDetails.awayTeam.logo}
                alt="Logo"
              />
              ;
            </div>
            <div
              className="Home"
              style={{
                backgroundColor: "#" + gameDetails.homeTeam.primaryColor
              }}
            >
              <img
                className="HomeImg"
                src={gameDetails.homeTeam.logo}
                alt="Logo"
              />
            </div>
            <div className="GameInfo">
              <div className="Title">
                <b className="TeamKey">{gameDetails.awayTeam.key}</b>
                <b className="Versus">VS</b>
                <b className="TeamKey">{gameDetails.homeTeam.key}</b>
              </div>
              {/* TODO: Create date parse for below Ex.2019-09-05T20:20:00 */}
              <div className="Date">{gameDetails.dateTime.toString()}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default GameCard;
