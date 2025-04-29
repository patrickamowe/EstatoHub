import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

import COLORS from "../constants/colors";

const wishlistItems = [
    { id: '1', title: '3-bedroom house', price: '$1,200 / month', images: [require('../assets/images/house.jpg'), require('../assets/images/house.jpg'), require('../assets/images/house.jpg')]},
    { id: '2', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
    { id: '3', title: 'handyman services', price: '$50 / hour', images: [require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg')]},
    { id: '4', title: 'Retail space', price: '$2,500 / month', images: [require('../assets/images/store.jpg'), require('../assets/images/store.jpg'), require('../assets/images/store.jpg')] },
    { id: '5', title: 'handyman services', price: '$50 / hour', images: [require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg'), require('../assets/images/handyman.jpg')]},
    { id: '6', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
    { id: '7', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
    { id: '8', title: 'sedan car', price: '$20,000 / day', images: [require('../assets/images/car.jpg'), require('../assets/images/car.jpg'), require('../assets/images/car.jpg')] },
];

export default function WishlistScreen({ navigation }) {
    return (
        <View style={styles.screenWrapper}>
            <FlatList
                data={wishlistItems}
                keyExtractor={(item) => item.id}
                style={styles.itemList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <TouchableOpacity style={styles.cardContentRow}>
                            <Image source={item.images[0]} style={styles.itemThumbnail} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemPrice}>{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemActions}>
                            <TouchableOpacity>
                                <Text style={styles.actionRemoveText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white
    },
    itemList: {
        width: "100%",
        backgroundColor: COLORS.lightGray,
        paddingTop: 10,
    },
    itemCard: {
        backgroundColor: COLORS.white,
        marginBottom: 10,
        padding: 10,
    },
    cardContentRow: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        paddingVertical: 10,
        height: 130,
    },
    itemThumbnail: {
        width: 100,
        height: 100,
    },
    itemInfo: {
        marginLeft: 20,
    },
    itemTitle: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 16,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    itemActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray
    },
    actionRemoveText: {
        color: COLORS.danger,
        fontSize: 16,
        fontWeight: "bold",
    },
});
