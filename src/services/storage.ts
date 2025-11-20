import AsyncStorage from '@react-native-async-storage/async-storage';
const PREFIX = '@fittrack:';

export const Storage = {
  async save<T>(key: string, value: T) {
    try {
      await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  },
  async load<T>(key: string, defaultValue?: T): Promise<T | undefined> {
    try {
      const raw = await AsyncStorage.getItem(PREFIX + key);
      if (!raw) return defaultValue;
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn('Storage load error', e);
      return defaultValue;
    }
  },
  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(PREFIX + key);
    } catch (e) {
      console.warn('Storage remove error', e);
    }
  },
};
