import React from "react";
import { AuthContext } from "../contexts/UserContext";

import LeaderboardTable from '../components/LeaderboardTable';
// import FriendboardTable from '../components/FriendboardTable';
import WeeklyTable from '../components/WeeklyTable';
import '../styles/Leaderboard.css';

function formLoader() {
  const x = document.getElementById('weekform');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'block';
  }
}

function formCloser() {
  const x = document.getElementById('weekform');
  x.style.display = 'none';
}

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
            <h2 className="leaderboardtext">{`Leaderboard - ${weeklytext}`}</h2>
            <div id="weekform">
              <form action="/action_page.php" />

              <select>
                <option value="one">1</option>
              </select>
            </div>

            <div className="filterbuttons">
              <button
                id="season"
                onClick={() => {
                  this.handleClick(false, 'Season');
                  formCloser();
                }}
              >
                Season
              </button>
              <button
                id="weekly"
                onClick={() => {
                  this.handleClick(true, 'Week');
                  formLoader();
                }}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className="Searchform">
            <span className="LeaderboardSearchIcon" role="img" aria-label="glass">
              🔍
            </span>
            <input type="text" placeholder="Search player feature currently WIP" disabled />
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
