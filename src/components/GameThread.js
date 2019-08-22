import React from "react";
import "../styles/GameThread.css";
import BearsLogo from "../images/bears-logo.svg";
import PatriotsLogo from "../images/patriots-logo.svg";
import PizzaSlice from "../images/pizza-slice.svg";
import TeamChoice from "./TeamChoice";
import UserAvatar from "../images/user-avatar.jpg";
import Slider from "./Slider";

class GameThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      condition: false
    };
  }

  componentDidMount() {
    const { showModal } = this.props;
    if (showModal) {
      this.setState({ isVisible: true });
    }
  }

  render() {
    const { showModal } = this.props;
    if (!showModal) {
      return <></>;
    }
    return (
      <div className="game-thread">
        <nav className="game-thread-nav">
          <div>
            <button
              className="game-thread-close-btn"
              onClick={this.props.closeGameThread}
            >
              {"<<< Back to Games List"}
            </button>
          </div>

          <ul className="game-thread-nav-items">
            <li className="game-thread-nav-item">
              <a>Discussion</a>
            </li>
            <li className="game-thread-nav-item">
              <a>Players</a>
            </li>
            <li className="game-thread-nav-item">
              <a>Standings</a>
            </li>
          </ul>
        </nav>

        <div className="game-thread-content">
          <div className="teams">
            <img src={this.props.gameDetails.awayTeam.logo} />
            <div className="team-text">
              <span className="team-name">
                {this.props.gameDetails.awayTeam.name}
              </span>
              <span className="vs">VS</span>
              <span className="team-name">
                {this.props.gameDetails.homeTeam.name}
              </span>
            </div>
            <img src={this.props.gameDetails.homeTeam.logo} />
          </div>

          <div className="predictions">
            <h2>Who's Got Sauce?</h2>
            <div className="prediction-counter">
              {/* Just use template literals with the prediction value as width to change poll */}
              <div className="home-team-prediction" style={{ width: "55%" }}>
                <span>55%</span>
              </div>
              {/* Just use template literals with the prediction value as width to change poll */}
              <div className="away-team-prediction" style={{ width: "45%" }}>
                <span>45%</span>
              </div>
            </div>
          </div>

          <div className="discussion-container">
            <h2>Place Your Slices On Your Favorite Team</h2>
            <hr />
            <form>
              <div className="betting-container">
                <TeamChoice gameDetails={this.props.gameDetails} />

                <div className="slice-allocation">
                  <h3>2. Place Your Slices</h3>
                  <div className="bet-size-slider">
                    {/* <img src={PizzaWheel} /> */}
                    {/* <input type="range" min="1" max="8" /> */}
                    {/* <span className="bet-size-indicator">8</span> */}
                    <Slider />
                  </div>
                </div>

                <div className="comment-input">
                  <h3>3. Throw A Cheesy Comment</h3>
                  <textArea
                    type="text"
                    name="comment"
                    className="input-comment-field"
                  />
                  <button className="button">Slice It</button>
                </div>
              </div>
            </form>
            <h2>Discussion</h2>
            <hr />
            <div className="comment">
              <img className="user-avatar" src={UserAvatar} />
              <div className="comment-body">
                <div className="comment-details">
                  <span className="username">ninjajon</span>
                  <img src={PizzaSlice} />
                  <span>5</span>
                  <span> on</span>
                  <img className="bet-logo" src={BearsLogo} />
                  <span>5 minutes ago</span>
                </div>
                <div className="comment-text">
                  <p>Tom Brady is going to take this one home!!!</p>
                </div>
              </div>
            </div>

            <div className="comment">
              <img className="user-avatar" src={UserAvatar} />
              <div className="comment-body">
                <div className="comment-details">
                  <span className="username">ninjajon</span>
                  <img src={PizzaSlice} />
                  <span>5</span>
                  <span> on</span>
                  <img className="bet-logo" src={BearsLogo} />
                  <span>5 minutes ago</span>
                </div>
                <div className="comment-text">
                  <p>Tom Brady is going to take this one home!!!</p>
                </div>
              </div>
            </div>

            <div className="comment">
              <img className="user-avatar" src={UserAvatar} />
              <div className="comment-body">
                <div className="comment-details">
                  <span className="username">ninjajon</span>
                  <img src={PizzaSlice} />
                  <span>5</span>
                  <span> on</span>
                  <img className="bet-logo" src={BearsLogo} />
                  <span>5 minutes ago</span>
                </div>
                <div className="comment-text">
                  <p>Tom Brady is going to take this one home!!!</p>
                </div>
              </div>
            </div>

            <div className="comment">
              <img className="user-avatar" src={UserAvatar} />
              <div className="comment-body">
                <div className="comment-details">
                  <span className="username">ninjajon</span>
                  <span> 5</span>
                  <img src={PizzaSlice} />
                  <span> on</span>
                  <img className="bet-logo" src={BearsLogo} />
                  <span> 5 minutes ago</span>
                </div>
                <div className="comment-text">
                  <p>Tom Brady is going to take this one home!!!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameThread;
