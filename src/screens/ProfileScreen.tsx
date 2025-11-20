import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Storage } from '../services/storage';
import { signInAnonymouslySafe } from '../services/firebase';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const p = await Storage.load('profile', null);
      setProfile(p);
    })();
  }, []);

  async function signIn() {
    await signInAnonymouslySafe();
    alert('Signed in anonymously (see console).');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profile ? (
        <>
          <Text>Name: {profile.name}</Text>
          <Text>Daily target: {profile.dailyCalorieTarget} kcal</Text>
        </>
      ) : (
        <Text>No profile saved</Text>
      )}
      <Button title="Sign in anonymously" onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: '700' } });
