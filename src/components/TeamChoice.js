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
    const { 
      context: { state: { isLoggedIn }, showModal }, 
      gameDetails: { awayTeam: { primaryColor: awayColor }, homeTeam: { primaryColor: homeColor } }
    } = this.props;
    return (
      <>
        <input
          type='button'
          name='winning-team-away'
          value={this.props.gameDetails.awayTeam.key}
          id='away-team-selector'
          className={
            this.state.activeName === 'winning-team-away'
              ? 'bet-selector-btn active-btn'
              : 'bet-selector-btn'
          }
          style={{ '--teamColor': `#${awayColor}` }}
          onClick={(e) => isLoggedIn ? this.handleChange(e) : showModal('Please login to make a bet') }
        />

        <input
          type='button'
          name='winning-team-home'
          value='home-team'
          id='home-team-selector'
          className={
            this.state.activeName === 'winning-team-home'
              ? 'bet-selector-btn active-btn'
              : 'bet-selector-btn'
          }
          style={{ '--teamColor': `#${homeColor}` }}
          onClick={(e) => isLoggedIn ? this.handleChange(e) : showModal('Please login to make a bet') }
          value={this.props.gameDetails.homeTeam.key}
        />
      </>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <TeamChoice {...props} context={context} />}
  </UserContext.Consumer>
);