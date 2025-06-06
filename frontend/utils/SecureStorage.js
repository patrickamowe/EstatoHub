import * as SecureStore from 'expo-secure-store';

const storage = {
  async setItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStorage setItem error:", error);
    }
  },

  async getItem(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStorage getItem error:", error);
      return null;
    }
  },

  async deleteItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("SecureStorage removeItem error:", error);
    }
  },

  async clearAll() {
    try {
      await SecureStore.deleteItemAsync('all'); // Note: SecureStore does not support clearing all items at once
    } catch (error) {
      console.error("SecureStorage clearAll error:", error);
    }
  },
};

export default storage;