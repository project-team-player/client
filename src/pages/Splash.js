import React from "react";
import axios from "axios";
import fball from "../images/main-bg.jpg";
import box from "../images/Divider_background.svg";
import secondFball from "../images/bottom-bg.jpg";
import pizzaSlice from "../images/pizza-slice.svg";
import doubleSlice from "../images/double-slice.svg";
import rainCloud from "../images/pizza-cloud.svg";
import "../styles/Splash.css";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="splashContainer">
        <div className="firstSplash">
          <img src={fball} id="mainSplash" />
          <div className="infoBox">
            <h1 id="joinCommunity">Join the Community</h1>
            <ol id="fullHomeList">
              <li className="homeList">
                <div className="numberList">1</div>
                <p className="listText">Sign up and create an account.</p>
              </li>
              <li className="homeListRunOn">
                <div className="numberList">2</div>
                <p className="listText">
                  Recieve weekly pizza slices and
                  <p className="runOn">use them to bet on NFL games.</p>
                </p>
              </li>
              <li className="homeList">
                <div className="numberList">3</div>
                <p className="listText">
                  Trash talk with other slice it users!
                </p>
              </li>
            </ol>
            <div id="buttonContainer">
              <button id="signUpButton">Sign up</button>
            </div>
          </div>
        </div>
        <div id="blackboxSplash">
          <img id="blackboxDivider" src={box} />
          <div id="gameSquaresContainer">
            <h1 id="gameSquareTitle">CHECKOUT THESE GAMES</h1>
            <div id="squareContainer">
              <div className="gameSquare"></div>
              <div className="gameSquare"></div>
              <div className="gameSquare"></div>
            </div>
          </div>
        </div>
        <div className="secondSplash">
          <img id="bottomSplash" src={secondFball} />
          <div id="aboutContainer">
            <h1 id="aboutHeader">How to Score</h1>
            <div id="aboutLandingContainer">
              <section className="aboutLanding">
                <p className="aboutTitle">
                  <img className="aboutIcon" src={pizzaSlice} />
                  Bet Slices
                </p>
                <div className="aboutWords">
                  Log in or create an account in order to bet up to 8 slices of
                  pizza on a game inside any game thread.
                </div>
              </section>
              <section className="aboutLanding">
                <p className="aboutTitle">
                  <img className="aboutIcon" src={doubleSlice} />
                  Win Slices
                </p>
                <div className="aboutWords">
                  When the game has ended, we’ll calculate how many pizza slices
                  you’ve won. If you win, we’ll double the slices you bet.
                </div>
              </section>
              <section className="aboutLanding">
                <p className="aboutTitle">
                  <img className="aboutIcon" src={rainCloud} />
                  Make it Rain!
                </p>
                <div className="aboutWords">
                  After each week, we multiply your winnings according to our
                  multiplier bonus system. The more correct bets, the more pizza
                  you’ll win!
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
