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
    // this.setState({ week: this.props.week });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/leaderboard/week/${this.props.week}`)
      .then(response => {
        this.setState({ users: response.data.users });
      })
      .catch(error => {
        console.log(error);
      });
    // console.log(this.props.week);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.week !== prevProps.week) {
      console.log('Getting data');
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
  // componentWillUnmount() {
  //   this.state.week = this.state.week.destroy();
  // }
  renderTableData() {
    // const weekIndicator = `slicesWeek${this.state.week}`;
    console.log('weekly rendered');
    const filteredUsers = this.state.users.filter(user => user.name.includes(this.props.query));
    return filteredUsers.map((user, index) => {
      const { name, slicesWeek5, pizzaSlicesWeekly } = user; // destructuring
      return (
        <tr>
          <td className="index">{index + 1}</td>
          <td className="table-items">{name}</td>
          {/* <td className="table-items">{wins}</td> */}
          <td className="table-items">{slicesWeek5}</td>
          <td>{pizzaSlicesWeekly}</td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    const header = [
      'Rank 🏅',
      'Username 👻',
      // '# of Wins per Week 🏆',
      'Slices Won 🎉',
      'Slices Left 🍕',
    ];
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
