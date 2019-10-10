import React from 'react';
import Slider from './Slider';
import TeamChoice from './TeamChoice';
import '../styles/BetForm.css';

class BetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  makeGameBet() {
    console.log('Game Bet Made');
  }

  render() {
    const {
      makeGameBet,
      gameDetails,
      handleBetChanges,
      handleSliceChanges
    } = this.props;
    return (
      <div className='betForm'>
        <h2>Make A Bet</h2>
        
          <div className='bettingContainer'>
            <div className='betTopContainer'>
              <Slider
                handleBetChanges={handleBetChanges}
                handleSliceChanges={handleSliceChanges}
              />
              <div className='divider'></div>
              <TeamChoice
                gameDetails={gameDetails}
                handleBetChanges={handleBetChanges}
              />
              <div className='divider'></div>
              <button className='betFormButton' onClick={()=>makeGameBet()}>
                Slice It
              </button>
            </div>
          </div>
        <hr />
      </div>
    );
  }
}

export default BetForm;
