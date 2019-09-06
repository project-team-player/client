import moment from 'moment';

export const convertDate = date => {
  return moment(date).format('ddd, MMM Do h:mm A');
};

