import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Feather,FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import COLORS from "../constants/colors";

const ProfileRow = ({ icon, label, extraContent }) => (
  <View style={styles.profileRow}>
    <View style={styles.profileRowLeft}>
      {icon}
      <Text style={styles.profileRowLabel}>{label}</Text>
    </View>

    <View style={styles.profileRowRight}>
      {extraContent}
      <Feather name="chevron-right" size={24} color="black" />
    </View>
  </View>
);

export default function ProfileScreen({ navigation }) {
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [showPicker, setShowPicker] = useState(false);


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
        <View style={styles.profileHeader}>
          <View>
            <Text style={styles.profileName}>Welcome First Name</Text>
            <Text style={styles.profileInfo}>Email Address</Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/user.jpg")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <Text style={styles.sectionHeader}>Activity</Text>
        <TouchableOpacity>
          <ProfileRow
            icon={<MaterialIcons name="view-list" size={24} color="black" />} 
            label="My Listings"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Main", { screen: "Wishlist" })}>
          <ProfileRow
            icon={<Ionicons name="heart-outline" size={24} color="black" />} 
            label="Wishlist"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileRow
            icon={<FontAwesome5 name="eye" size={24} color="black" />} 
            label="Recently Viewed"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileRow
            icon={<Ionicons name="search-outline" size={24} color="black" />} 
            label="Recently Search"
          />
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Settings</Text>
        <TouchableOpacity>
          <ProfileRow
            icon={<MaterialIcons name="edit" size={24} color="black" />} 
            label="Edit Profile"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <ProfileRow
            icon={<Ionicons name="moon-outline" size={24} color="black" />} 
            label="Mode"
            extraContent={<Text>{selectedTheme}</Text>}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal with Picker */}
      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTheme}
              onValueChange={(itemValue) => {
                setSelectedTheme(itemValue);
                setShowPicker(false); // close modal after selection
              }}
            >
              <Picker.Item label="Light" value="Light" />
              <Picker.Item label="Dark" value="Dark" />
              <Picker.Item label="System" value="System" />
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  profileHeader: {
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
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
  },
  profileInfo: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  profileRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileRowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileRowLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.black,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: 5,
  },
  // pickerWrapper: {
  //   width: "100%",
  //   marginTop: 5,
  // },
  // themePicker: {
  //   height: 50,
  //   width: 150,
  // },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: COLORS.lightGray,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    width: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});
