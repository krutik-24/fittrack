import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WorkoutTrackerScreen from '../screens/WorkoutTrackerScreen';
import MealPlannerScreen from '../screens/MealPlannerScreen';
import CalorieTrackerScreen from '../screens/CalorieTrackerScreen';
import WorkoutPlannerScreen from '../screens/WorkoutPlannerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export type RootStackParamList = {
  Home: undefined;
  WorkoutTracker: undefined;
  MealPlanner: undefined;
  CalorieTracker: undefined;
  WorkoutPlanner: undefined;
  Profile: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WorkoutTracker" component={WorkoutTrackerScreen} />
      <Stack.Screen name="MealPlanner" component={MealPlannerScreen} />
      <Stack.Screen name="CalorieTracker" component={CalorieTrackerScreen} />
      <Stack.Screen name="WorkoutPlanner" component={WorkoutPlannerScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
