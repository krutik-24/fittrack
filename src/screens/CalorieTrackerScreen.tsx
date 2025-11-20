import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Storage } from '../services/storage';
import { MealLog } from '../models';
import dayjs from 'dayjs';

export default function CalorieTrackerScreen() {
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [name, setName] = useState('');
  const [cal, setCal] = useState('');

  useEffect(() => {
    (async () => {
      const m = (await Storage.load<MealLog[]>('meals', [])) || [];
      setMeals(m);
    })();
  }, []);

  async function addMeal() {
    const item: MealLog = {
      id: Math.random().toString(36).slice(2),
      name: name || 'Meal',
      calories: Number(cal) || 0,
      date: dayjs().toISOString(),
    };
    const newList = [item, ...meals];
    await Storage.save('meals', newList);
    setMeals(newList);
    setName('');
    setCal('');
  }

  const todayTotal = meals.filter((m) => dayjs(m.date).isSame(dayjs(), 'day')).reduce((s, v) => s + v.calories, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Tracker</Text>
      <Text>Today's total: {todayTotal} kcal</Text>
      <View style={styles.form}>
        <TextInput placeholder="Meal name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Calories" value={cal} onChangeText={setCal} style={styles.input} keyboardType="numeric" />
        <Button title="Add meal" onPress={addMeal} />
      </View>

      <FlatList
        data={meals}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{dayjs(item.date).format('HH:mm')} — {item.calories} kcal</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  form: { marginVertical: 12 },
  input: { borderWidth: 1, padding: 8, marginVertical: 6, borderRadius: 6 },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
});
