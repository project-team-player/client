import React from 'react';
import '../styles/TeamChoice.css';
import '../styles/GameThread.css';

class TeamChoice extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      condition: false
    };
  }

  handleChange(event) {
    event.preventDefault();
    const activeName = event.target.name;
    this.setState({
      activeName
    });
    this.props.handleBetChanges(event);
  }

  render() {
    return (
      <div className='selectionContainer'>
        <button
          type='radio'
          name='winning-team-away'
          value='away-team'
          id='away-team-selector'
          className={
            this.state.activeName === 'winning-team-away'
              ? 'bet-selector-btn toggle'
              : 'bet-selector-btn'
          }
          onClick={this.handleChange}
        >
          {this.props.gameDetails.awayTeam.key}
        </button>

        <button
          type='radio'
          name='winning-team-home'
          value='home-team'
          id='home-team-selector'
          className={
            this.state.activeName === 'winning-team-home'
              ? 'bet-selector-btn toggle'
              : 'bet-selector-btn'
          }
          onClick={this.handleChange}
        >
          {this.props.gameDetails.homeTeam.key}
        </button>
      </div>
    );
  }
}

export default TeamChoice;
