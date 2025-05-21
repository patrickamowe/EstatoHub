import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import COLORS from "../constants/colors";

// Sample data for different categories
const allItems = [
  { id: '1', category: 'Home', title: '3-bedroom house', price: '$1,200 / month', image: require('../assets/images/house.jpg') },
  { id: '2', category: 'Car', title: 'Sedan car', price: '$20,000 / day', image: require('../assets/images/car.jpg') },
  { id: '3', category: 'Store', title: 'Retail space', price: '$2,500 / month', image: require('../assets/images/store.jpg') },
  { id: '4', category: 'Lands', title: 'Handyman Lands', price: '$50 / hour', image: require('../assets/images/handyman.jpg') },
  { id: '5', category: 'Car', title: 'SUV car', price: '$25,000 / day', image: require('../assets/images/car.jpg') },
  { id: '6', category: 'Home', title: '2-bedroom flat', price: '$900 / month', image: require('../assets/images/house.jpg') },
  { id: '7', category: 'Lands', title: 'Electrician', price: '$60 / hour', image: require('../assets/images/handyman.jpg') },
];

const categories = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Home' },
  { id: '3', name: 'Car' },
  { id: '4', name: 'Store' },
  { id: '5', name: 'Lands' },
];

const Card = ({ items }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.productCard}>
          <Image source={item.image} style={styles.productImage} resizeMode="cover" />
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      )}
    />
  );
};

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.screen}>
      <View style={styles.sidebar}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === item.name && styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(item.name)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && styles.activeCategoryText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.viewMoreRow}
        >
          <Text style={styles.viewText}>View more</Text>
          <Feather name="chevron-right" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Card items={filteredItems} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
  },
  sidebar: {
    width: "22%",
    marginRight: "3%",
    backgroundColor: COLORS.white,
  },
  content: {
    width: "72%",
    backgroundColor: COLORS.white,
  },
  categoryItem: {
    height: 100,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 2,
    
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  activeCategory: {
    backgroundColor: COLORS.lightGray,
  },
  activeCategoryText: {
    color: COLORS.black,
  },
  productCard: {
    width: "47%",
    height: 180,
    backgroundColor: COLORS.white,
    margin: "1.5%",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: "60%",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 13,
    color: COLORS.gray,
  },
  viewMoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  viewText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});