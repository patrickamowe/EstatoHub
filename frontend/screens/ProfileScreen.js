import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import COLORS from "../constants/colors";

const SectionItem = ({ icon, label, onPress, extraContent }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionLeft}>
      {icon}
      <Text style={styles.sectionText}>{label}</Text>
    </View>
    
    <View style={styles.sectionRight}>
    {extraContent}
    <Ionicons name="chevron-down" size={24} color="black" />
    </View>

  </View>
);

export default function ProfileScreen({ navigation }) {
  const [selectedTheme, setSelectedTheme] = useState("Light");

  const logoutHandler = () => {
    console.log("User logged out");
    navigation.replace("Login");
  };

  useEffect(() => {
    // Load the stored theme preference (e.g., from AsyncStorage)
    // Example: AsyncStorage.getItem('theme').then(setSelectedTheme);
  }, []);

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View>
                <Text style={styles.name}>Welcome First Name</Text>
                <Text style={styles.info}>Email Address</Text>
                </View>
                <View>
                <Image
                    source={require("../assets/images/user.jpg")}
                    style={styles.profileImage}
                />
                </View>
            </View>
            <Text style={styles.sectionTitle}>Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Main",{screen:"Wishlist"})}>
                <SectionItem
                    icon={<Ionicons name="heart-outline" size={24} color="black" />}
                    label="Wishlist"
                />
            </TouchableOpacity>
            <TouchableOpacity >
                <SectionItem
                    icon={<MaterialIcons name="view-list" size={24} color="black" />}
                    label="Recently Viewed"
                />
            </TouchableOpacity>
            <TouchableOpacity >
                <SectionItem
                    icon={<Ionicons name="search-outline" size={24} color="black" />}
                    label="Recently Search"
                />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity >
                <SectionItem
                    icon={<MaterialIcons name="edit" size={24} color="black" />}
                    label="Edit Profile"
                />
            </TouchableOpacity>
            <TouchableOpacity >
                <SectionItem
                    icon={<Ionicons name="moon-outline" size={24} color="black" />}
                    label="Mode"
                    extraContent={
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={selectedTheme}
                        onValueChange={(itemValue) => setSelectedTheme(itemValue)}
                        style={styles.picker}
                        >
                        <Picker.Item label="Light" value="Light" />
                        <Picker.Item label="Dark" value="Dark" />
                        <Picker.Item label="System" value="System" />
                        </Picker>
                    </View>
                    }
                />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 20,
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
  },
  info: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,

  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionText: {
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: 5,
  },
  pickerContainer: {
    width: "100%",
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: 150,
  },
  
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: COLORS.lightGraygray
  },
  buttonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
});
