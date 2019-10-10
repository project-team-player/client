import moment from 'moment';

export const convertToDate = (dateTime, timeZone) => {
  const date = moment(dateTime.toString()).format('ddd, MMM Do h:mm A');
  return `${date} ${timeZone ? timeZone.toUpperCase() : ''}`;
};
