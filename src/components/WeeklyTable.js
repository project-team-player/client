import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/Leaderboard.css';

class WeeklyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/leaderboard/week/${this.props.week}`)
      .then(response => {
        this.setState({ users: response.data.users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.week !== prevProps.week) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/leaderboard/week/${this.props.week}`)
        .then(response => {
          this.setState({ users: response.data.users });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  renderTableData() {
    const slicesForWeek = `slicesWeek${this.props.week}`;
    const filteredUsers = this.state.users.filter(user => user.name.includes(this.props.query));
    console.log('FILTERED USERS', filteredUsers);
    return filteredUsers.map((user, index) => {
      const { name, pizzaSlicesWeekly } = user; // destructuring // {user[slicesForWeek]}
      return (
        <tr>
          <td className="index">{index + 1}</td>
          <td className="table-items">{name}</td>
          {/* <td className="table-items">{wins}</td> */}
          <td className="table-items">{user[slicesForWeek]}</td>
          <td>{pizzaSlicesWeekly}</td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    const header = ['Rank 🏅', 'Username 👻', 'Slices Won 🎉', 'Slices Left 🍕'];
    return header.map((key, index) => <th key={index}>{key}</th>);
  }

  render() {
    return (
      <div className="leader-table">
        <table id="users">
          <tbody>
            <tr className="table-header">{this.renderTableHeader()}</tr>
          </tbody>
          <tbody className="table-items">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

WeeklyTable.propTypes = {
  week: PropTypes.number,
  query: PropTypes.string,
};

export default WeeklyTable;
