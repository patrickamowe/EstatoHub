import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
   async setItem(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {   
        console.error("Storage setItem error:", error);
    }
   },
   
   async getItem(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        console.error("Storage getItem error:", error);
        return null;
    }
   },

   async deleteItem(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Storage removeItem error:", error);
    }
   },

    async clearAll() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error("Storage clearAll error:", error);
        }
    },
};

export default storage;