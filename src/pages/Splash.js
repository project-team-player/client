import React from "react";
import axios from "axios";
import fball from "../images/main-bg.jpg";
import box from "../images/Divider_background.svg";
import secondFball from "../images/bottom-bg.jpg";
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
          <div className="gameSquare">CHECKOUT THESE GAMES</div>
        </div>
        <div className="secondSplash">
          <img id="bottomSplash" src={secondFball} />
        </div>
      </div>
    );
  }
}

export default Splash;
