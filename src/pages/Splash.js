import React from "react";
import axios from "axios";
import fball from "../images/main-bg.jpg";
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
            <h1>Join the Community</h1>
            <ol>
              <li className="homeList">Sign up and create an account.</li>
              <li className="homeList">
                Recieve weekly pizza slices and use them to bet on NFL games.
              </li>
              <li className="homeList">
                Trash talk with other slice it users!
              </li>
              <button id="signUpButton">Sign up</button>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
