import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { Storage } from '../services/storage';
import { calculateDailyCaloriesTarget } from '../utils/calorieUtils';
import type { UserProfile } from '../models';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'other'>('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState<'moderate' | any>('moderate');
  const [goal, setGoal] = useState<'maintenance' | 'deficit' | 'surplus'>('maintenance');

  async function finish() {
    const profile: UserProfile = {
      name,
      sex,
      age: Number(age),
      weightKg: Number(weight),
      heightCm: Number(height),
      activityLevel: activity,
      goal,
    };
    profile.dailyCalorieTarget = calculateDailyCaloriesTarget(profile);
    await Storage.save('profile', profile);
    await Storage.save('onboarded', true);
    nav.navigate('Home' as any);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fit Track</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <Text>Sex</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Male" onPress={() => setSex('male')} color={sex === 'male' ? '#0984e3' : undefined} />
        <Button title="Female" onPress={() => setSex('female')} color={sex === 'female' ? '#0984e3' : undefined} />
        <Button title="Other" onPress={() => setSex('other')} color={sex === 'other' ? '#0984e3' : undefined} />
      </View>
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" style={styles.input} />
      <Text>Activity Level</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Light" onPress={() => setActivity('light')} color={activity === 'light' ? '#0984e3' : undefined} />
        <Button title="Moderate" onPress={() => setActivity('moderate')} color={activity === 'moderate' ? '#0984e3' : undefined} />
        <Button title="Active" onPress={() => setActivity('active')} color={activity === 'active' ? '#0984e3' : undefined} />
      </View>
      <Text>Goal</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Deficit" onPress={() => setGoal('deficit')} color={goal === 'deficit' ? '#0984e3' : undefined} />
        <Button title="Maintenance" onPress={() => setGoal('maintenance')} color={goal === 'maintenance' ? '#0984e3' : undefined} />
        <Button title="Surplus" onPress={() => setGoal('surplus')} color={goal === 'surplus' ? '#0984e3' : undefined} />
      </View>
      <Button title="Finish" onPress={finish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 6 },
});
