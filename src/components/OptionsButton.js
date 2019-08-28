import React from 'react';

// CSS

// Components

class OptionsButton extends React.Component {
  render() {
    // consts here
    const { weekNumber } = this.props;
    return (
      <option id='weekNumber' value={weekNumber}>
        week {weekNumber}
      </option>
    );
  }
}

export default OptionsButton;
