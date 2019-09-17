import React from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/UserContext';
import LeaderboardTable from '../components/LeaderboardTable';
import WeeklyTable from '../components/WeeklyTable';
import '../styles/Leaderboard.css';
import { thisExpression } from '@babel/types';

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
      users: [],
      weekly: false,
      weeklytext: '2019 Season',
      query: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://pecorina-development.herokuapp.com/users/leaderboard/global')
      .then(response => {
        this.setState({ users: response.data.users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick(weekly, weeklytext) {
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
              <form action="/action_page.php" />
              <select>
                <option value="one">1</option>
                <option value="two">2</option>
              </select>
            </div>

            <div className="filterbuttons">
              <button
                id="season"
                onClick={() => {
                  this.handleClick(false, '2019 Season');
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
            <WeeklyTable users={this.state.users} query={this.state.query} />
          ) : (
            <LeaderboardTable users={this.state.users} query={this.state.query} />
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
