import React from 'react';
import '../styles/TeamChoice.css';
import '../styles/GameThread.css';
import { UserContext } from '../contexts/UserContext';


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
    const { context: { state: { isLoggedIn }, showModal } } = this.props;

    return (
      <div className='selectionContainer'>
        <button
          type='radio'
          name='winning-team-away'
          value='away-team'
          id='away-team-selector'
          className={
            this.state.activeName === 'winning-team-away'
              ? 'bet-selector-btn active-btn'
              : 'bet-selector-btn'
          }
          onClick={(e) => isLoggedIn ? this.handleChange(e) : showModal('Please login to make a bet') }
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
              ? 'bet-selector-btn active-btn'
              : 'bet-selector-btn'
          }
          onClick={(e) => isLoggedIn ? this.handleChange(e) : showModal('Please login to make a bet') }
        >
          {this.props.gameDetails.homeTeam.key}
        </button>
      </div>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <TeamChoice {...props} context={context} />}
  </UserContext.Consumer>
);