import React, {useState} from "react";
import {Text, View, Button, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';

import COLORS from "../constants/colors";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here you would call your backend API to login
    console.log("Logging in with:", { email, password });

    // If login is successful, navigate to the main app
    // navigation.replace("home");
    navigation.replace("Main", { screen: "Home" }); // Navigate to MainTabs if logged in
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.links} onPress={() => navigation.navigate("ForgotPassword")} >
        Forgot Password?
      </Text>
      <Text style={styles.links} onPress={() => navigation.navigate("Signup")} >
        Don't have an account? Sign up
      </Text>
      <TouchableOpacity style={styles.googleButton}>
        <AntDesign 
          name="google" 
          size={20} 
          color={COLORS.white} 
          style={styles.googleIcon} 
        />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: "center",
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderRadius: 5,
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    loginButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
    },
    loginText: {
      color: COLORS.white,
      fontSize: 16,
    },
    links: {
      color: COLORS.primary,
      fontSize: 16,
      marginTop: 10,
      textAlign: "center",
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    googleIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    googleButtonText: {
      fontSize: 16,
      color: COLORS.white,
    },
  });