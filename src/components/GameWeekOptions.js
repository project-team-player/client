import React from 'react';
import { getCurrentGameWeek } from '../utils/nfl';
import OptionsButton from './OptionsButton';

const GameWeekOptions = ({ totalWeeks, explicitWeek, onChangeFunction }) => {
  const optionsList = [];
  const currentGameWeek = getCurrentGameWeek();
  for (let i = 1; i <= totalWeeks; i++) {
    optionsList.push(
      <OptionsButton
        weekNumber={i}
        key={i}
        isCurrentWeek={currentGameWeek === i}
        explicitWeek={explicitWeek}
      />
    );
  }
  return optionsList;
}

export default GameWeekOptions;