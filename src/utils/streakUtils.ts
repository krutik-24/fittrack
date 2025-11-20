import dayjs from 'dayjs';

export function isSameDayISO(a: string, b: string) {
  return dayjs(a).isSame(b, 'day');
}

/**
 * Compute new streak given last workout dates and today's date.
 * @param lastWorkoutIso last workout ISO string or undefined
 * @param todayIso today's ISO string
 * @param currentStreak current streak number
 */
export function computeStreak(lastWorkoutIso: string | undefined, todayIso: string, currentStreak: number) {
  const today = dayjs(todayIso).startOf('day');
  if (lastWorkoutIso && dayjs(lastWorkoutIso).isSame(today, 'day')) {
    return currentStreak; // already recorded today
  }
  if (lastWorkoutIso && dayjs(lastWorkoutIso).isSame(today.subtract(1, 'day'), 'day')) {
    return currentStreak + 1;
  }
  return 1;
}
