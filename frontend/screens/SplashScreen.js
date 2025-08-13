import React, {useEffect, useState} from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import storage from "../utils/AsyncStorage"; 


export default function SplashScreen({navigation}) {
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const user = await storage.getItem("user");
                if (user) {
                    navigation.replace("Main", { screen: "Home" }); // Navigate to MainTabs if logged in
                } else {
                    navigation.replace("Login"); // Navigate to Login if not logged in
                }
            }
            catch (error) {
                console.error("Error checking login status:", error);
                
            } finally {
                SetLoading(false); // Stop loading after checking login status
            }
        };
        checkLoginStatus();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{flex:1,justifyContent:"center",alignItems:"center"},
    loadingText:{color:"#000",fontSize:16,marginTop:10}
})