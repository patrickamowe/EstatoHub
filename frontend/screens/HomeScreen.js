import React from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import COLORS from "../constants/colors";


const categories = [
  {id: '1', icon: 'home', label: 'Rent/Rent a House'},
  {id: '2', icon: 'car', label: 'Buy a Car'},
  {id: '3', icon: 'store', label: 'Buy/Rent a Store'},
  {id: '4', icon: 'tree', label: 'Buy a Land'},
];

const featuredItems = [
  { id: '1', title: '3-bedroom house', price: '$1,200 / month', images: [require('../assets/images/house.jpg')]},
  { id: '2', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg')] },
  { id: '3', title: 'handyman services', price: '$50 / hour', images: [require('../assets/images/handyman.jpg')]},
  { id: '4', title: 'Retail space', price: '$2,500 / month', images: [require('../assets/images/store.jpg')] },
  { id: '5', title: 'handyman services', price: '$50 / hour', images: [require('../assets/images/handyman.jpg')]},
  { id: '6', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg')] },
  { id: '7', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg')] },
  { id: '8', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg')] },
];

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.appTitle}>MarketPlace</Text>
        <View style={styles.rightIcons}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Image source={require('../assets/images/user.jpg')} style={styles.userAvatar} />
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="What are you looking for?..." />
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <FontAwesome5 name={item.icon} size={24} color={COLORS.primary} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Featured</Text>

      <FlatList
        data={featuredItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.images[0]} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    fontSize: 18,
    padding: 8,
    flex: 1,
  },
  categoryCard: {
    width: 110,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 16,
    marginHorizontal: 4,
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 12,
    color: 'gray',
  },
});
