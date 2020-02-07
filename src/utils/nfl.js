// TODO: Include playoffs 
export const getCurrentGameWeek = () => {
  const today = Date.now();

  const lastGameOfWeek = {
    1: new Date('September 09, 2019'),
    2: new Date('September 16, 2019'),
    3: new Date('September 23, 2019'),
    4: new Date('September 30, 2019'),
    5: new Date('October 07, 2019'),
    6: new Date('October 14, 2019'),
    7: new Date('October 21, 2019'),
    8: new Date('October 28, 2019'),
    9: new Date('November 04, 2019'),
    10: new Date('November 11, 2019'),
    11: new Date('November 18, 2019'),
    12: new Date('November 25, 2019'),
    13: new Date('December 02, 2019'),
    14: new Date('December 09, 2019'),
    15: new Date('December 16, 2019'),
    16: new Date('December 23, 2019'),
    17: new Date('December 29, 2019'),
  }

  // Creates a new array with all the week numbers 1-17
  const weeks = Object.keys(lastGameOfWeek);

  // Iterates over each week and sets the current week accordingly
  const currentWeek = () => {
    for(let week of weeks) {
      if (today <= lastGameOfWeek[week]) {
        return 'week'; // Return last week if end of season
      }
    }
  }

  return parseInt(currentWeek() || 17); // Return 17 if season is over (last round)
}