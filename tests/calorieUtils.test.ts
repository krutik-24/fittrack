import { calculateDailyCaloriesTarget } from '../src/utils/calorieUtils';

describe('calculateDailyCaloriesTarget', () => {
  it('calculates maintenance calories for male', () => {
    const profile = { sex: 'male', age: 30, weightKg: 70, heightCm: 175, activityLevel: 'moderate', goal: 'maintenance' };
    const calories = calculateDailyCaloriesTarget(profile);
    expect(typeof calories).toBe('number');
    expect(calories).toBeGreaterThan(1200);
  });

  it('reduces ~500 calories for deficit', () => {
    const base = calculateDailyCaloriesTarget({ sex: 'male', age: 30, weightKg: 70, heightCm: 175, activityLevel: 'moderate', goal: 'maintenance' });
    const deficit = calculateDailyCaloriesTarget({ sex: 'male', age: 30, weightKg: 70, heightCm: 175, activityLevel: 'moderate', goal: 'deficit' });
    expect(base - deficit).toBeGreaterThanOrEqual(450);
  });
});
