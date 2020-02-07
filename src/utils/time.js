import moment from 'moment';

/**
 * Outpouts the difference on time from given time to today 
 * @param {String} time time used to compare with today
 * @returns {String} Outputs in format 1 minute(s), 2 days etc.
 */
export const timeAgo = (time) => {
  const today = new Date();
  const commentedTime = new Date(time);
  const difference = Math.abs(today - commentedTime);

  const secondsAgo = Math.floor(difference / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);

  // Some extra calculation for months
  function monthDiff(now, commented) {
    const year1 = now.getFullYear();
    const year2 = commented.getFullYear();
    const month1 = now.getMonth();
    const month2 = commented.getMonth();
    const numberOfMonths = Math.abs((year2 - year1) * 12 + (month2 - month1));
    return numberOfMonths;
  }

  const monthsAgo = weeksAgo < 4 ? 0 : Math.floor(monthDiff(today, commentedTime));
  const yearsAgo = Math.floor(monthsAgo / 12);
  
  if (yearsAgo >=1) return formatTime(yearsAgo, 'year')
  else if (monthsAgo >= 1) return formatTime(monthsAgo, 'month');
  else if (weeksAgo >= 1) return formatTime(weeksAgo, 'week');
  else if (daysAgo >= 1) return formatTime(daysAgo, 'day');
  else if (hoursAgo >= 1) return formatTime(hoursAgo, 'hour');
  else if (minutesAgo >= 1) return formatTime(minutesAgo, 'minute');
  else return formatTime(1, 'minute');
} 

/**
 * 
 * @param {Number} number the amount of given type. For example amount of hours.
 * @param {String} type the type of given number e.g. hour or minute in singular format.
 */
export const formatTime = (number, type) => {
  if (number < 1) return undefined;
  if (number === 1) {
    return `${number} ${type}`
  } else {
    return `${number} ${type}s`
  }
}

export const convertToDate = (dateTime, timeZone) => {
  const date = moment(dateTime.toString()).format('ddd, MMM Do h:mm A');
  return `${date} ${timeZone ? timeZone.toUpperCase() : ''}`;
};