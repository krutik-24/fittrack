import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Storage } from '../services/storage';
import { Workout } from '../models';
import dayjs from 'dayjs';
import { computeStreak } from '../utils/streakUtils';

export default function WorkoutTrackerScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const w = (await Storage.load<Workout[]>('workouts', [])) || [];
      setWorkouts(w);
      const s = await Storage.load<number>('streak', 0);
      setStreak(s ?? 0);
    })();
  }, []);

  async function addTodayWorkout() {
    const today = dayjs().toISOString();
    const newWorkout: Workout = {
      id: Math.random().toString(36).slice(2),
      name: 'Workout',
      date: today,
      durationMinutes: 30,
    };
    const newList = [newWorkout, ...workouts];
    await Storage.save('workouts', newList);
    setWorkouts(newList);

    const lastWorkoutDate = workouts.length ? workouts[0].date : undefined;
    const newStreak = computeStreak(lastWorkoutDate, today, streak);
    await Storage.save('streak', newStreak);
    setStreak(newStreak);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>
      <Text>Current streak: {streak}</Text>
      <Button title="Add today's workout" onPress={addTodayWorkout} />
      <FlatList
        style={{ marginTop: 16 }}
        data={workouts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{dayjs(item.date).format('YYYY-MM-DD HH:mm')}</Text>
            <Text>{item.durationMinutes} min</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
});
