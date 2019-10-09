import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Leaderboard.css';

class LeaderboardTable extends Component {
  renderTableData() {
    const filteredUsers = this.props.users.filter(user =>
      user.name.toLowerCase().includes(this.props.query.toLowerCase())
    );
    return filteredUsers.map((user, index) => {
      const { name, wins, pizzaSlicesTotal } = user; // destructuring
      return (
        <tr>
          <td className="index">{index + 1}</td>
          <td className="table-items">{name}</td>
          <td className="table-items">{wins}</td>
          <td className="table-items">{pizzaSlicesTotal}</td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    const header = ['Rank 🏅', 'Username 👻', '# of Wins per Week 🏆', 'Total Slices 🍕'];
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

LeaderboardTable.propTypes = {
  users: PropTypes.object,
  query: PropTypes.string,
};

export default LeaderboardTable;
