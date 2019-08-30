import React from 'react';
import { AuthContext } from '../contexts/UserContext';

const TwoLevelsDeep = () => (
  <AuthContext>
    {context => (
      <div>
        <div className="imageContainer">
          <p>This stuff is rendered three levels deep</p>
          <p>My name is {context.state.name}</p>
          <p>My password token is {context.state.passwordToken}</p>
        </div>
      </div>
    )}
  </AuthContext>
);

const InsideLeaderboard = () => (
  <div>
    <p>I'm rendered two levels deep from App.js!</p>
    <TwoLevelsDeep />
  </div>
);

class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        <div className="imageContainer">
          <InsideLeaderboard />
        </div>
      </div>
    );
  }
}

export default Leaderboard;
