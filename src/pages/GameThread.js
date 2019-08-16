import React from "react";
import GameThread from '../components/GameThread';
import "../styles/GameThread.css";

class Games extends React.Component {
  render() {
    return (
      <div className="weirdContainer">
                <GameThread showModal={true}/>

        <div className="title">PUT GAMETHREAD HERE
        </div>
        <div className="imageContainer">
          <img src="https://miro.medium.com/max/1200/1*X4KCCUruyku7-EQnr-EFmg.jpeg" />
        </div>
      </div>
    );
  }
}

export default Games;
