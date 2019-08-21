import React from "react";

class TeamChoice extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      condition: false
    };
  }

  handleChange(event) {
    event.preventDefault();
    const activeName = event.target.name;
    this.setState({
      activeName
    });
  }

  render() {
    return (
      <div className="selectionContainer">
        <h3>1. Choose Winner</h3>
        <button
          name="winning-team-home"
          value="home-team"
          id="home-team-selector"
          className={
            this.state.activeName === "winning-team-home"
              ? "bet-selector-btn toggle"
              : "bet-selector-btn"
          }
          onClick={this.handleChange}
        >
          CHI
        </button>

        <button
          type="radio"
          name="winning-team-away"
          value="away-team"
          id="away-team-selector"
          className={
            this.state.activeName === "winning-team-away"
              ? "bet-selector-btn toggle"
              : "bet-selector-btn"
          }
          onClick={this.handleChange}
        >
          NE
        </button>
      </div>
    );
  }
}

export default TeamChoice;
