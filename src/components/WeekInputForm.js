import React, { Component } from 'react';
import '../styles/Leaderboard.css';

class WeekInputForm extends Component {
  render() {
    return (
      <div id="weekform">
        <form action="/action_page.php" />
        <select>
          <option value="one">1</option>
          <option value="two">2</option>
        </select>
      </div>
    );
  }
}

export default WeekInputForm;
