import React from "react";
import Slider from './Slider';
import TeamChoice from './TeamChoice';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  makeGameBet(){
      console.log('Game Bet Made');
  }

  render() {
    const { makeGameBet, gameDetails, handleBetChanges } = this.props;
    return (
      <div className="betForm">
          <h2>Make A Bet</h2>
            <form onSubmit={makeGameBet}>
                  <div className="betting-container">
                    <TeamChoice gameDetails={gameDetails} handleBetChanges={handleBetChanges} />

                    <div className="slice-allocation">
                      <h3>2. Place Your Slices</h3>
                      <div className="bet-size-slider">
                        {/* <img src={PizzaWheel} /> */}
                        {/* <input type="range" min="1" max="8" /> */}
                        {/* <span className="bet-size-indicator">8</span> */}
                        <Slider handleBetChanges={handleBetChanges}/>
                      </div>
                    </div>

                    <div className="comment-input">
                      <h3>3. Throw A Cheesy Comment</h3>
                      <textarea
                        type="text"
                        name="comment"
                        className="input-comment-field"
                        onChange={handleBetChanges}
                      />
                      
                      <button className="button">Slice It</button>
                      
                    </div>
                </div>
            </form>
            <hr />
      </div>
    );
  }
}

export default Comments;
