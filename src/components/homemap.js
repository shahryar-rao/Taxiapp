import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { requestLocationPermission } from './helpers/locationpermisssion';
import CustomBottomSheet from './helpers/bottomsheet';
import axios from 'axios';
import Constants from 'expo-constants';


const Homemap = ({ navigation, route }) => {
    const theme = useTheme();
    const bottomSheetRef = useRef(null);
    const mapRef = useRef(null);
    const GOOGLE_MAP_API = Constants.expoConfig.extra.GOOGLE_MAP_API;


    const [userLocation, setUserLocation] = useState(null);
    const [permissionRequested, setPermissionRequested] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [fromLocation, setFromLocation] = useState(null); // From location
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    console.log('recived fromlocation.....', fromLocation);
    console.log('recived destinationlocation.....', destinationLocation);



    const fetchRoute = async (from, destination) => {
        try {
            const response = await axios.get(
                `https://maps.gomaps.pro/maps/api/directions/json?origin=${fromLocation.lat},${fromLocation.lng}&destination=${destinationLocation.lat},${destinationLocation.lng}&key=${GOOGLE_MAP_API}`
            );
    
            if (response.data.routes.length > 0) {
                const points = response.data.routes[0].legs[0].steps.map(step => {
                    const { lat, lng } = step.end_location;
                    return { latitude: lat, longitude: lng };
                });
                console.log('points.......',points);
                setRouteCoordinates(points);
            } else {
                console.error('No routes found');
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };
    
    useEffect(() => {
        if (fromLocation && destinationLocation) {
            fetchRoute(fromLocation, destinationLocation);
        }
    }, [fromLocation, destinationLocation]);
    

    useEffect(() => {
        if (!permissionRequested) {
            const timer = setTimeout(() => {
                requestLocationPermission(setUserLocation, mapRef);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [permissionRequested]);

    useEffect(() => {
        if (route?.params?.from) {
            setFromLocation(route.params.from);
        }
        if (route?.params?.destination) {
            setDestinationLocation(route.params.destination);
        }

        if (route?.params?.location) {
            const { lat, lng } = route.params.location;
            setSelectedLocation({ latitude: lat, longitude: lng });

            if (mapRef.current) {
                mapRef.current.animateCamera({
                    center: { latitude: lat, longitude: lng },
                    zoom: 10,
                });
            }
        } else if (userLocation) {
            mapRef.current?.animateCamera({
                center: {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude
                },
                zoom: 18,
            });
        }

        // Log the from and destination locations to check if they are being set correctly
        console.log('From Location:', fromLocation);
        console.log('Destination Location:', destinationLocation);
    }, [route?.params, userLocation]);


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={false}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title='Selected Location'
                    />
                )}
                {fromLocation && (
                    <Marker
                        coordinate={{ latitude: fromLocation.lat, longitude: fromLocation.lng }}
                        title='From'
                    />
                )}
                {destinationLocation && (
                    <Marker
                        coordinate={{ latitude: destinationLocation.lat, longitude: destinationLocation.lng }}
                        title='Destination'
                    />
                )}
            {routeCoordinates.length > 0 && (
                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="red"
                    strokeWidth={4}
                />
            )}
            </MapView>
            <View style={styles.topbtncont}>
                <TouchableOpacity style={styles.topbutton} onPress={() => navigation.navigate('SearchScreen')}>
                    <Ionicons name="search" size={wp('6%')} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.topbutton} >
                    <Fontisto name="bell" size={wp('6%')} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.topbutton}>
                    <Entypo name="cross" size={wp('6%')} color="black" />
                </TouchableOpacity>
            </View>

            <CustomBottomSheet
                bottomSheetRef={bottomSheetRef}
                isBottomSheetOpen={isBottomSheetOpen}
                setIsBottomSheetOpen={setIsBottomSheetOpen}
                navigation={navigation}
            />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        height: hp('100%'),
        width: wp('100%'),
    },
    topbutton: {
        backgroundColor: '#FFC12E',
        width: wp('10%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp('5%')
    },
    topbtncont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('40%'),
        position: 'absolute',
        top: hp('6%'),
        right: wp('9%')
    },

});

export default Homemap;
