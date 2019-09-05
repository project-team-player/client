import React from 'react';
import { AuthContext } from '../contexts/UserContext';

import LeaderboardTable from '../components/LeaderboardTable';
import FriendboardTable from '../components/FriendboardTable';
import WeeklyTable from '../components/WeeklyTable';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekly: false,
      weeklytext: 'Season',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(weekly, weeklytext) {
    this.setState({ weekly, weeklytext });
  }

  render() {
    const { weekly, weeklytext } = this.state;
    return (
      <div>
        <div className="top">
          <div className="leftside">
            <h2 className="leaderboardtext">{`Leaderboard ${weeklytext}`}</h2>
            <div className="filterbuttons">
              <button id="season" onClick={() => this.handleClick(false, 'Season')}>
                Season
              </button>
              <button id="weekly" onClick={() => this.handleClick(true, 'Weekly')}>
                Weekly
              </button>
            </div>
          </div>
          <div className="Searchform">
            <span className="LeaderboardSearchIcon" role="img" aria-label="glass">
              🔍
            </span>
            <input type="text" placeholder="Search for Player" />
          </div>
        </div>
        <div className="boards">
          <div className="leader-board">
            {weekly === true ? <WeeklyTable /> : <LeaderboardTable />}
          </div>
          {/* <div className="friend-board">
            <div className="flist">Friends</div>
            <FriendboardTable />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
