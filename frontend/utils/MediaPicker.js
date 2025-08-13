import React from 'react';

import * as MediaPicker from 'expo-image-picker';

export const PickImage = async () => {
  // ... image picker code
    const result = await MediaPicker.launchImageLibraryAsync({
        mediaTypes: MediaPicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
    });

    if (!result.canceled) {
        return result.assets[0].uri;
    }
    return null;
};

export const PickVideo = async () => {
  // ... video picker code
    const result = await MediaPicker.launchImageLibraryAsync({
        mediaTypes: MediaPicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 0.8,
    });

    if (!result.canceled) {
        return result.assets[0].uri;
    }
    return null;
};