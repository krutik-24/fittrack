export type Workout = {
  id: string;
  name: string;
  date: string; // ISO
  durationMinutes: number;
  caloriesBurned?: number;
  exercises?: Array<{ name: string; sets?: number; reps?: number }>;
};

export type MealLog = {
  id: string;
  name: string;
  calories: number;
  date: string; // ISO
  notes?: string;
};

export type UserProfile = {
  id?: string;
  name?: string;
  sex?: 'male' | 'female' | 'other';
  age?: number;
  weightKg?: number;
  heightCm?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal?: 'surplus' | 'deficit' | 'maintenance';
  dailyCalorieTarget?: number;
};

export type MealPlan = {
  createdAt: string;
  input: { calories: number; goal: string; preferences?: string };
  meals: Array<{ name: string; calories: number; items?: string[] }>;
  totalCalories?: number;
};

export type WorkoutPlan = {
  createdAt: string;
  input: { goal: string; level: string; days: number };
  plan: any;
};
