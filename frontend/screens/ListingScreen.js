import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

import COLORS from "../constants/colors";
import {PickImage, PickVideo} from "../utils/MediaPicker";
import ListingApi from "../services/ListingApi";

export default function ListingScreen() {
    const navigation = useNavigation();
    // create a page which enable the user upload a listing some of the fields are:
    // title, detail, price, image, category, location, video which is optional
    // the user can also select a category from a list of categories

    const [title, setTitle] = React.useState("");
    const [detail, setDetail] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [category, setCategory] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [video, setVideo] = React.useState(null);

    const handleUpload = () => {
        // Handle the upload logic here
        console.log("Listing uploaded:", { title, detail, price, image, category, location, video });
        
        const listingData = {
           "title": title,
            "detail": detail,
            "price": price,
            "item_image": image,
            "category": category,
            "location": location,
            "vieo_file": video
        };

        // Calling the Listing API to upload the listing
        ListingApi(listingData)
            .then(data => {
                if (data.success) {
                    alert(data.message || "Listing uploaded successfully");
                    navigation.replace("Main", { screen: "Home" }); // Navigate to Home screen after successful upload
                }
                else {
                    alert(data.error || "Failed to upload listing. Please check your data.");
                }
            })
            .catch(error => {
                alert(error.error || "Error uploading listing: " + error);
            });
        


    };
    const handleImageUpload = async () => {
        const imageUri = await PickImage();
        if (imageUri) {
            setImage(imageUri);
        }
    };
    const handleVideoUpload = async () => {
        const videoUri = await PickVideo();
        if (videoUri) {
            setVideo(videoUri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Listing</Text>
            <View style={styles.inputPicker}>
                <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={[
                        { label: 'Land', value: 'land' },
                        { label: 'House', value: 'house' },
                        { label: 'Store', value: 'store' },
                        { label: 'Car', value: 'car' },
                        // Add more categories as needed
                    ]}
                    placeholder={{ label: "Select a category", value: null }}
                    style={{
                        inputAndroid: styles.pickerText,
                    }}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Detail"
                value={detail}
                onChangeText={setDetail}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <View style={styles.imageUploadContainer}>
                <Text style={styles.uploadText}>Upload Image</Text>
                <TouchableOpacity onPress={() => handleImageUpload()}>
                    <Ionicons name="camera" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.videoUploadContainer}>
                <Text style={styles.uploadText}>Upload Video (Optional)</Text>
                <TouchableOpacity onPress={() => handleVideoUpload()}>
                    <Ionicons name="videocam" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Ionicons name="cloud-upload" size={24} color={COLORS.white} />
                <Text style={styles.uploadButtonText}>Upload Listing</Text>
            </TouchableOpacity>
            
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
        backgroundColor: COLORS.lightGray,
    },
    inputPicker: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: COLORS.lightGray,

    },
    pickerText: {
        fontSize: 16,
        color: COLORS.darkGray,
    },
    categoryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    imageUploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    videoUploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    uploadText: {
        fontSize: 16,
        color: COLORS.primary,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
    },
    uploadButtonText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 10,
    },

});