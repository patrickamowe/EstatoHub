import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

const images = [
  { id: '1', uri: 'https://picsum.photos/id/237/200/300' },
  { id: '2', uri: 'https://picsum.photos/id/238/200/300' },
  { id: '3', uri: 'https://picsum.photos/id/239/200/300' },
];

const ImageGallery = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={images}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        showsHorizontalScrollIndicator={false}
      />
        <FlatList
            data={images}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.image} />
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default ImageGallery;
