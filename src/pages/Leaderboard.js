import React from 'react';
import axios from 'axios';
import { getCurrentGameWeek } from '../utils/nfl';
import LeaderboardTable from '../components/LeaderboardTable';
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
      week: '',
      users: [],
      weekly: false,
      weeklytext: '2019 Season',
      query: '',
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.setState({ week: getCurrentGameWeek() });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/leaderboard/global`)
      .then(response => {
        this.setState({ users: response.data.users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSwitch(weekly, weeklytext) {
    this.setState({ weekly, weeklytext });
  }
  handleSearch(event) {
    this.setState({ query: [...event.currentTarget.value].join('') });
  }

  render() {
    const { weekly, weeklytext } = this.state;
    return (
      <div>
        <div className="top">
          <div className="leftside">
            <h2 className="leaderboardtext">{`${weeklytext}`}</h2>
            <div id="weekform">
              <form />
              <select onChange={e => this.setState({ week: e.target.value })}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option selected>Current</option>
              </select>
            </div>
            <div className="filterbuttons">
              <button
                id="season"
                onClick={() => {
                  this.handleSwitch(false, '2019 Season');
                  formCloser();
                }}
              >
                Season
              </button>
              <button
                id="weekly"
                onClick={() => {
                  this.handleSwitch(true, 'Week');
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
            <input
              type="search"
              placeholder="Search players here"
              value={this.state.query}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="boards">
          {weekly === true ? (
            <WeeklyTable query={this.state.query} week={this.state.week} />
          ) : (
            <LeaderboardTable users={this.state.users} query={this.state.query} />
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
