import React from 'react';
import Slider from './Slider';
import TeamChoice from './TeamChoice';
import '../styles/BetForm.css';
import PizzaSlice from '../images/pizza-slice.svg';
import { UserContext } from '../contexts/UserContext';
import UserPredictions from './UserPredictions';

// Indicates how many slices the user has bet on the current game, or let's the user know if the game has finished.
const BetIndicator = ({ bet, gameHasFinished }) => {
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

    this.state = {
      showPredictions: false,
    };
  }

  render() {
    const {
      makeGameBet,
      errorMessage,
      gameDetails,
      percentages,
      handleBetChanges,
      handleSliceChanges,
      userDidBet,
      userBet,
      gameHasFinished,
      context: { state: { isLoggedIn }, showModal },
    } = this.props;
    const { showPredictions } = this.state;
    return (
      <div className='betForm card'>
          <div className="tabContainer">
            <span onClick={() => this.setState({ showPredictions: false }) } className={`tabToggle ${!showPredictions ? 'active' : ''}`}>Bet</span>
            <span onClick={() => this.setState({ showPredictions: true }) } className={`tabToggle ${showPredictions ? 'active' : ''}`}>Predictions</span>
          </div>
        <div className="betFormContent">
          {showPredictions ?
            <UserPredictions percentages={percentages} gameDetails={gameDetails} />
            :
            <>
          {
          userDidBet || gameHasFinished ? 
            <BetIndicator bet={userBet} gameHasFinished={gameHasFinished} />
          : 
            <>
              <h2>Bet slices on your winner</h2>
              { errorMessage && <p className="bet-error-message">{errorMessage}</p> }
              <div className='bettingContainer'>
                <div className='bettingContainerInner'>
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
          </>
          }
        </div>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <BetForm {...props} context={context} />}
  </UserContext.Consumer>
);
