import { getCurrentGameWeek } from './nfl';

describe('getCurrentGameWeek', () => {
  it('should return a number between 1 and 17', () => {
    expect(getCurrentGameWeek()).toBeGreaterThanOrEqual(1);
    expect(getCurrentGameWeek()).toBeLessThanOrEqual(17);
  })
  
  it('should return a number', () => {
    expect(typeof getCurrentGameWeek()).toBe('number');  
  });

  it('should not return NaN', () => {
    expect(getCurrentGameWeek()).not.toBe(NaN);
  })
});