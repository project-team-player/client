import React from 'react';
import Slider from './Slider';
import TeamChoice from './TeamChoice';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  makeGameBet() {
    console.log('Game Bet Made');
  }

  render() {
    const { makeGameBet, gameDetails, handleBetChanges } = this.props;
    return (
      <div className='betForm'>
        <h2>Make A Bet</h2>
        <form onSubmit={makeGameBet}>
          <div className='bettingContainer'>
            <Slider handleBetChanges={handleBetChanges} />
            <div className='verticalLine'></div>
            <TeamChoice
              gameDetails={gameDetails}
              handleBetChanges={handleBetChanges}
            />

            <div className='comment-input'>
              <h3>3. Throw A Cheesy Comment</h3>
              <textarea
                type='text'
                name='comment'
                className='input-comment-field'
                onChange={handleBetChanges}
              />

              <button className='button'>Slice It</button>
            </div>
          </div>
        </form>
        <hr />
      </div>
    );
  }
}

export default Comments;
