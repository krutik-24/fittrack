export function calculateDailyCaloriesTarget(profile: {
  sex?: 'male' | 'female' | 'other';
  age?: number;
  weightKg?: number;
  heightCm?: number;
  activityLevel?: string;
  goal?: 'surplus' | 'deficit' | 'maintenance';
}) {
  // Mifflin-St Jeor
  const weight = profile.weightKg ?? 70;
  const height = profile.heightCm ?? 175;
  const age = profile.age ?? 30;
  const sex = profile.sex ?? 'male';
  const activity = profile.activityLevel ?? 'moderate';
  const goal = profile.goal ?? 'maintenance';

  let s = sex === 'female' ? -161 : 5;
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + s);

  let activityFactor = 1.55;
  switch (activity) {
    case 'sedentary':
      activityFactor = 1.2;
      break;
    case 'light':
      activityFactor = 1.375;
      break;
    case 'moderate':
      activityFactor = 1.55;
      break;
    case 'active':
      activityFactor = 1.725;
      break;
    case 'very_active':
      activityFactor = 1.9;
      break;
  }

  let calories = Math.round(bmr * activityFactor);
  if (goal === 'deficit') calories = Math.round(calories - 500);
  if (goal === 'surplus') calories = Math.round(calories + 400);
  return calories;
}
