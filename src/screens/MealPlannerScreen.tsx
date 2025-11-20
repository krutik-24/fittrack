import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { generateMealPlan } from '../services/aiService';
import { Storage } from '../services/storage';

export default function MealPlannerScreen() {
  const [goal, setGoal] = useState<'surplus' | 'deficit' | 'maintenance'>('maintenance');
  const [calories, setCalories] = useState<string>('');
  const [preferences, setPreferences] = useState('');
  const [result, setResult] = useState<string | null>(null);

  async function createPlan() {
    const calNum = Number(calories) || 2000;
    setResult('Generating...');
    const res: any = await generateMealPlan({ calories: calNum, goal, preferences });
    if (res.error) {
      setResult('AI unavailable. Try again later.');
    } else {
      setResult(JSON.stringify(res.parsed ?? res.raw, null, 2));
      await Storage.save('last_meal_plan', { createdAt: new Date().toISOString(), input: { calNum, goal, preferences }, raw: res.raw });
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Meal Planner</Text>
      <Text>Goal</Text>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <Button title="Deficit" onPress={() => setGoal('deficit')} color={goal === 'deficit' ? '#0984e3' : undefined} />
        <Button title="Maintenance" onPress={() => setGoal('maintenance')} color={goal === 'maintenance' ? '#0984e3' : undefined} />
        <Button title="Surplus" onPress={() => setGoal('surplus')} color={goal === 'surplus' ? '#0984e3' : undefined} />
      </View>
      <TextInput placeholder="Daily calories (e.g., 2000)" value={calories} onChangeText={setCalories} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Diet preferences (e.g., vegetarian)" value={preferences} onChangeText={setPreferences} style={styles.input} />
      <Button title="Generate Meal Plan" onPress={createPlan} />
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
