// imagePicker.js
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImage = async (setImageUri,uploadimage) => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("Permission to access camera roll is required!");
        return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (result.canceled) {
        return;
    }

    // Set the image URI
    const { uri } = result.assets[0];
    setImageUri(uri);
    uploadimage(uri);
};
