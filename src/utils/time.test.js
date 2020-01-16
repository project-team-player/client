import { convertToDate, formatTime, timeAgo } from './time';

describe('timeAgo', () => {

  it('should return minutes', () => {
    let tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
    let oneMinuteAgo = new Date();
    oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

    // expect(timeAgo(tenMinutesAgo)).toBe('10 minutes');
    expect(timeAgo(oneMinuteAgo)).toBe('1 minute');
  });

  it('should return hours', () => {
    let tenHoursAgo = new Date();
    tenHoursAgo.setHours(tenHoursAgo.getHours() - 10);
    let oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    expect(timeAgo(tenHoursAgo)).toBe('10 hours');
    expect(timeAgo(oneHourAgo)).toBe('1 hour');
  });

  it('should return day(s)', () => {
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    let oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    expect(timeAgo(twoDaysAgo)).toBe('2 days');
    expect(timeAgo(oneDayAgo)).toBe('1 day');
  });

  it('should return weeks', () => {
    let twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    expect(timeAgo(twoWeeksAgo)).toBe('2 weeks');
    expect(timeAgo(oneWeekAgo)).toBe('1 week');
  });

  it('should return months', () => {
    let twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    expect(timeAgo(twoMonthsAgo)).toBe('2 months');
    expect(timeAgo(oneMonthAgo)).toBe('1 month');
  });

  it('should return years', () => {
    let twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    let oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    expect(timeAgo(twoYearsAgo)).toBe('2 years');
    expect(timeAgo(oneYearAgo)).toBe('1 year');
  });
});

describe('convertToDate', () => {
  it('should ', () => {
    
  });
});

describe('formatTime', () => {
  it('should add plural s', () => {
    expect(formatTime(2, 'month')).toBe('2 months');
    expect(formatTime(100, 'week')).toBe('100 weeks');
  });

  it('should not add plural s on input 1', () => {
    expect(formatTime(1, 'day')).toBe('1 day');
    expect(formatTime(1, 'year')).toBe('1 year');
  })

  it('should return undefined if input lower than 1', () => {
    expect(formatTime(0, 'year')).toBe(undefined);
  });
});