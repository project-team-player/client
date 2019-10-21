import React from 'react';
import Slider from './Slider';
import TeamChoice from './TeamChoice';
import '../styles/BetForm.css';
import PizzaSlice from '../images/pizza-slice.svg';
import { UserContext } from '../contexts/UserContext';

const BetIndicator = ({ bet, gameHasFinished }) => {
  console.log('has the game truly finished?', gameHasFinished);
  return (
    <div className="bet-message-container">
    {
      gameHasFinished ?
      <h2 className="bet-message">This game is over and no further bets are allowed</h2>
      :
      <h2 className="bet-message">You have bet <img src={PizzaSlice} />{bet.slicesBet} slices on {bet.key}. Good luck!</h2>
    }
    </div>
  )
}

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
      handleSliceChanges,
      userDidBet,
      userBet,
      gameHasFinished,
      context: { state: { isLoggedIn }, showModal },
    } = this.props;
    console.log('Has the game ended?', gameHasFinished);
    return (
      <div className='betForm card'>
          {
          userDidBet || gameHasFinished ? 
            <BetIndicator bet={userBet} gameHasFinished={gameHasFinished} />
          :
          <>
            <h2>Bet slices on your winner</h2>

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
                <button className='betFormButton' onClick={() => { 
                  isLoggedIn ? makeGameBet() : showModal('Please login to make a bet') 
                  }}>
                  Slice It
                </button>
              </div>
            </div>
          </>
          }
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <BetForm {...props} context={context} />}
  </UserContext.Consumer>
);
