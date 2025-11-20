import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { generateWorkoutPlan } from '../services/aiService';
import { Storage } from '../services/storage';

export default function WorkoutPlannerScreen() {
  const [goal, setGoal] = useState('build muscle');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [days, setDays] = useState('3');
  const [result, setResult] = useState<string | null>(null);

  async function createPlan() {
    setResult('Generating...');
    const res: any = await generateWorkoutPlan({ goal, experienceLevel: level, daysPerWeek: Number(days) });
    if (res.error) {
      setResult('AI unavailable. Try again later.');
    } else {
      setResult(JSON.stringify(res.parsed ?? res.raw, null, 2));
      await Storage.save('last_workout_plan', { createdAt: new Date().toISOString(), input: { goal, level, days }, raw: res.raw });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Workout Planner</Text>
      <TextInput placeholder="Goal (e.g., build muscle, lose fat)" value={goal} onChangeText={setGoal} style={styles.input} />
      <Text>Level</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Beginner" onPress={() => setLevel('beginner')} color={level === 'beginner' ? '#0984e3' : undefined} />
        <Button title="Intermediate" onPress={() => setLevel('intermediate')} color={level === 'intermediate' ? '#0984e3' : undefined} />
        <Button title="Advanced" onPress={() => setLevel('advanced')} color={level === 'advanced' ? '#0984e3' : undefined} />
      </View>
      <TextInput placeholder="Days per week" value={days} onChangeText={setDays} style={styles.input} keyboardType="numeric" />
      <Button title="Generate Workout Plan" onPress={createPlan} />
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: '700' }}>Result</Text>
        <Text selectable>{result || 'No plan yet.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 6 },
});
