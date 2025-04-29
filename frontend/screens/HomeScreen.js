import React from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";

const categories = [
  {id: '1', icon: 'home', label: 'Rent a House'},
  {id: '2', icon: 'car', label: 'Buy a Car'},
  {id: '3', icon: 'tools', label: 'Services'}
];

const featuredItems = [
  { id: '1', title: '3-bedroom house', price: '$1,200 / month', images: [require('../assets/images/house.jpg'), require('../assets/images/house.jpg'), require('../assets/images/house.jpg')]},
  { id: '2', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
  {id: '3',  title: 'handyman services', price: '$50 / hour', images: [require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg') ]},
  {id: '4',  title: 'Retail space', price: '$2,500 / month', images: [require('../assets/images/store.jpg'), require('../assets/images/store.jpg'), require('../assets/images/store.jpg')] },
  {id: '5',  title: 'handyman services', price: '$50 / hour', images: [require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg') ]},
  { id: '6', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
  { id: '7', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
  { id: '8', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
];


export default function HomeScreen( ) {
  const navigation = useNavigation();
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MarketPlace</Text>
        <View style={styles.positionEnd}>
          <Ionicons name="notifications-outline" style={styles} size={24} color="black" />
          <Image source={require('../assets/images/user.jpg')} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} /> 
        <TextInput style={styles.search} placeholder="What are you looking for?..."/>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} style={styles.categoryBox}>
            <FontAwesome5 name={item.icon} size={24} color={COLORS.primary} />
            <Text style={styles.categoryText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.featuredTitle}>Featured</Text>
      <FlatList
        data={featuredItems}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.featuredCard} onPress={() => navigation.navigate('Details', { item })}>
            <Image source={item.images[0]} style={styles.featuredImage} />
            <Text style={styles.featuredTitle}>{item.title}</Text>
            <Text style={styles.featuredPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  positionEnd: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 32, height: 32, borderRadius: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 16 },
  searchIcon: { padding: 6 },
  search: {fontSize: 18, backgroundColor: '#f0f0f0', borderRadius: 8, padding: 8, flex: 1 },
  categoryBox: { width:110, alignItems: 'center', borderRadius: 8, borderColor: 'gray', borderWidth: 0.5, padding: 16, marginHorizontal: 4 },
  categoryText: {marginTop: 8, fontSize: 12},
  featuredTitle: {fontSize: 18, fontWeight: 'bold', marginVertical: 8},
  featuredCard: {flex:1, margin:4, backgroundColor: '#fff', borderRadius: 10, padding: 8, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2},
  featuredImage: {width: '100%', height: 100, borderRadius: 10},
  featuredTitle: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  featuredPrice: { fontSize: 12, color: 'gray' },
});