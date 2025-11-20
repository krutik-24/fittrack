import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Storage } from '../services/storage';
import StreakBadge from '../components/StreakBadge';

export default function HomeScreen() {
  const nav = useNavigation();
  const [streak, setStreak] = useState<number>(0);
  const [profileName, setProfileName] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const s = await Storage.load<number>('streak', 0);
      setStreak(s ?? 0);
      const profile = await Storage.load<any>('profile');
      setProfileName(profile?.name);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fit Track</Text>
      {profileName ? <Text>Welcome, {profileName}</Text> : null}
      <StreakBadge streak={streak} />
      <View style={styles.buttons}>
        <Button title="Workout Tracker" onPress={() => nav.navigate('WorkoutTracker' as any)} />
        <Button title="Meal Planner" onPress={() => nav.navigate('MealPlanner' as any)} />
        <Button title="Calorie Tracker" onPress={() => nav.navigate('CalorieTracker' as any)} />
        <Button title="Workout Planner" onPress={() => nav.navigate('WorkoutPlanner' as any)} />
        <Button title="Profile" onPress={() => nav.navigate('Profile' as any)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  buttons: { width: '90%', gap: 8, marginTop: 20 },
});
