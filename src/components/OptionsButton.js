import React from 'react';
import { getCurrentGameWeek } from '../utils/nfl';

// CSS

// Components

const OptionsButton = ({ isCurrentWeek, weekNumber }) => {
  return (
    <option id='weekNumber' value={weekNumber} selected={isCurrentWeek}>
      Week {weekNumber}
    </option>
  );
};

export default OptionsButton;
