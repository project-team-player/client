import React from "react";
import { AuthContext } from "../contexts/UserContext";

import LeaderboardTable from "../components/LeaderboardTable";
import FriendboardTable from "../components/FriendboardTable";

class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        <div className="top">
          <div className="leftside">
            <h2 className="leaderboardtext">Leaderboard - Season</h2>
            <div className="filterbuttons">
              <button id="season">Season</button>
              <button id="weekly">Weekly</button>
            </div>
          </div>
          <div className="Searchform">
            <span className="LeaderboardSearchIcon">🔍</span>
            <input type="text" placeholder="Search for Player" />
          </div>
        </div>
        <div className="boards">
          <div className="leader-board">
            <LeaderboardTable />
          </div>
          <div className="friend-board">
            <div className="flist">Friends</div>
            <FriendboardTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
