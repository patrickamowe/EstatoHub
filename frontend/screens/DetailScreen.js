import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList , Dimensions} from "react-native";
import COLORS from "../constants/colors";

const { width, height } = Dimensions.get('window');
const imageWidth = width - 40; // 20 padding on each side
const imageHeight = imageWidth * 0.75; // Maintain 4:3 aspect ratio
  


export default function DetailScreen({route}) {
  const { item } = route.params;


  return (
    <View style={styles.container}>
      <FlatList 
        data={item.images}
        contentContainerStyle={{...styles.gallery, flexGrow:0}}
        renderItem = {({ item: image }) => (
          <View style={styles.imageContainer}>
            <Image source={ image } style={styles.image} />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2} 
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a luctus lectus.
        </Text>
        <View style={styles.sellerBox}>
          <Image source={require('../assets/images/user.jpg')} style={styles.sellerImage} />
          <View>
            <Text style={styles.sellerName}>Seller Name</Text>
            <Text style={styles.sellerInfo}>Verified Seller</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>   
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
    marginTop: 20,
  },
  gallery: {
    padding: 10,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    overflow: 'hidden',
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'cover',
    
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  price: {
    fontSize: 20,
    color: COLORS.primary,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginBottom: 20,
  },
  sellerBox:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20
  },
  sellerImage:{
    width:50,
    height:50,
    borderRadius:25
  },
  sellerName:{
    fontSize:18,
    fontWeight:'bold',
    color:'#333',
    marginLeft:10
  },
  sellerInfo:{
    fontSize:14,
    color:'#666',
    marginLeft:10
  },
  contactButton:{
    backgroundColor:COLORS.primary,
    padding:15,
    borderRadius:5,
    alignItems:'center',
  },
  contactButtonText:{
    color:COLORS.white,
    fontSize:16,
    fontWeight:'bold',
  },
});