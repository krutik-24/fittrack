import { computeStreak } from '../src/utils/streakUtils';
import dayjs from 'dayjs';

describe('computeStreak', () => {
  const today = dayjs().startOf('day').toISOString();
  const yesterday = dayjs().subtract(1, 'day').toISOString();
  const twoDaysAgo = dayjs().subtract(2, 'day').toISOString();

  it('increments streak when last workout was yesterday', () => {
    expect(computeStreak(yesterday, today, 3)).toBe(4);
  });

  it('resets streak when last workout was two days ago', () => {
    expect(computeStreak(twoDaysAgo, today, 5)).toBe(1);
  });

  it('keeps streak if workout already done today', () => {
    expect(computeStreak(today, today, 2)).toBe(2);
  });

  it('sets streak to 1 if no last workout', () => {
    expect(computeStreak(undefined, today, 0)).toBe(1);
  });
});
