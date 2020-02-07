import React from 'react';

const OptionsButton = ({ isCurrentWeek, weekNumber, explicitWeek }) => {
  return (
    <option id='weekNumber' value={weekNumber} selected={isCurrentWeek}>
      {explicitWeek && "Week"} {weekNumber}
    </option>
  );
};

export default OptionsButton;
