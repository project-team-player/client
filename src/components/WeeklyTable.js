import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Leaderboard.css';

class WeeklyTable extends Component {
  renderTableData() {
    return this.props.users.map((user, index) => {
      const { name, wins, pizzaSlicesWeekly } = user; // destructuring
      return (
        <tr>
          <td className="index">{index}</td>
          <td className="table-items">{name}</td>
          <td className="table-items">{wins}</td>
          <td>{pizzaSlicesWeekly}</td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    const header = ['Rank 🏅', 'Username 👻', '# of Wins per Week 🏆', 'Weekly Slices 🍕'];
    return header.map((key, index) => <th key={index}>{key}</th>);
  }

  render() {
    return (
      <div className="leader-table">
        <table id="users">
          <tr className="table-header">{this.renderTableHeader()}</tr>
          <tbody className="table-items">{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

WeeklyTable.propTypes = {
  users: PropTypes.object,
};

export default WeeklyTable;
