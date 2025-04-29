import React, {useState} from "react";
import {Text, View, Button, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';

import COLORS from "../constants/colors";

export default function SignUpScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        // Handle signup logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Email:", email);
        console.log("Password:", password);
        alert(`First Name: ${firstName}, Last Name: ${lastName} Email: ${email}, Password: ${password}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
                <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.links} onPress={() => navigation.navigate("Login")} >
                Already have an account? Login
            </Text>
            <TouchableOpacity style={styles.googleButton}>
                <AntDesign 
                    name="google" 
                    size={20} 
                    color={COLORS.white} 
                    style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
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
    signupButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    signupText: {
        color: COLORS.white,
        fontSize: 16,
    },
    links: {
        color: COLORS.primary,
        fontSize: 16,
        marginTop: 16,
        textAlign: "center",
    },
    googleButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    googleIcon: {
        marginRight: 8,
    },
    googleButtonText: {
        color: COLORS.white,
        fontSize: 16,
    },
});