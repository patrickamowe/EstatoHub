import React, {useState} from "react";
import {Text, View, Button, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';

import COLORS from "../constants/colors";
import LoginAPi from "../services/LoginApi";
import SecureStorage from "../utils/SecureStorage";

export default function LoginScreen({navigation}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    if (!userName || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const userData = {
      "username": userName,
      "password": password
    };

    // Calling login API
    LoginAPi(userData)
      .then(data => {
        const accessToken = data.access;
        const refreshToken = data.refresh;
        if (accessToken && refreshToken) {
          // Store tokens securely
          SecureStorage.setItem("accessToken", accessToken);
          SecureStorage.setItem("refreshToken", refreshToken);
          
          alert("Login successful!");
          navigation.replace("Main", { screen: "Home" }); // Navigate to Home screen after successful login
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch( error => {
        alert("An error occurred: " + error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
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