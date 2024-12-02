// locationPermission.js
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const requestLocationPermission = async (setUserLocation, mapRef) => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });

        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0021,
            }, 2000);
        }
    } else {
        Alert.alert(
            'Location Permission Required',
            'We need your location to show you nearby places. Please grant location permission in your settings.',
            [
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
                { text: 'Cancel', onPress: () => {} },
            ]
        );
    }
};
