import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakBadge({ streak }: { streak: number }) {
  return (
    <View style={[styles.container, streak >= 7 ? styles.gold : styles.normal]}>
      <Text style={styles.text}>{streak} day{streak !== 1 ? 's' : ''} streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  text: { color: '#fff', fontWeight: '600' },
  gold: { backgroundColor: '#f6b93b' },
  normal: { backgroundColor: '#0984e3' },
});
