/**
 * Outpouts the difference on time from given time to today 
 * @param {String} time time used to compare with today
 * @returns {String} Outputs in format 1 minute(s), 2 days etc.
 */
export const timeAgo = (time) => {
  const today = new Date();
  const commentedTime = new Date(time);

  const millisecondsAgo = Math.floor(today - commentedTime);
  let secondsAgo = Math.floor(millisecondsAgo / 1000);
  let minutesAgo = Math.floor(secondsAgo / 60);
  let hoursAgo = Math.floor(minutesAgo / 60);
  let daysAgo = Math.floor(hoursAgo / 24);
  let weeksAgo = Math.floor(daysAgo / 7);
  let monthsAgo = Math.floor(daysAgo / 31);
  let yearsAgo = Math.floor(monthsAgo / 12);

  // Decides wether to display minutes, hours, days etc. based on how long ago the comparison time is.
  if (minutesAgo === 0) return formatTime(1, 'minute');
  if (minutesAgo > 0 && minutesAgo < 60) return formatTime(minutesAgo, 'minute');
  if (minutesAgo > 59 && hoursAgo < 24) return formatTime(hoursAgo, 'hour')
  if (hoursAgo > 24 && daysAgo < 7 ) return formatTime(daysAgo, 'day')
  if (daysAgo > 6 && weeksAgo < 4 ) return formatTime(weeksAgo, 'week')
  if (weeksAgo > 3 && monthsAgo < 12) return formatTime(monthsAgo, 'month')
  if (monthsAgo > 11) return formatTime(yearsAgo, 'year');
} 

/**
 * 
 * @param {Number} number the amount of given type. For example amount of hours.
 * @param {String} type the type of given number e.g. hour or minute in singular format.
 */
const formatTime = (number, type) => {
  if (number === 1) {
    return `${number} ${type}`
  } else {
    return `${number} ${type}s`
  }
}