import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from './themecontext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomBottomSheet = ({ bottomSheetRef, isBottomSheetOpen, setIsBottomSheetOpen,navigation }) => {
    const theme = useTheme();
    const snapPoints = ['18%', '80%'];

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [destinationInputValue, setDestinationInputValue] = useState('');
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [isFromFocused, setIsFromFocused] = useState(false); // New state for "from" focus
    const [isDestinationFocused, setIsDestinationFocused] = useState(false);
    const [fromLocation, setFromLocation] = useState(null); // New state for 'from' location
    const [destinationLocation, setDestinationLocation] = useState(null);

    const GOOGLE_MAP_API = Constants.expoConfig.extra.GOOGLE_MAP_API;
    const GOOGLE_MAP_URL = Constants.expoConfig.extra.GOOGLE_MAP_URL;
    const GOOGLE_PLACE_DETAILS_URL = Constants.expoConfig.extra.GOOGLE_PLACE_DETAILS_URL;

    console.log('fromlocation......',fromLocation);
    console.log('destinationlocation......',destinationLocation);


    // Auto-fill "Your current location" when the input is focused
    const handleInputFocus = () => {
        setIsFromFocused(true);
        setIsDestinationFocused(false);
        if (inputValue === '') {
            setInputValue('Your current location');
        }
    };

    const handleDestinationInputFocus = () => {
        setIsFromFocused(false);
        setIsDestinationFocused(true);
    };

    const handleInputChange = async (text) => {
        setInputValue(text);

        if (text.length > 2 && text !== 'Your current location') {
            try {
                const response = await axios.get(
                    `${GOOGLE_MAP_URL}?input=${text}&key=${GOOGLE_MAP_API}`
                );
                setSuggestions([...response.data.predictions]);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleDestinationInputChange = async (text) => {
        setDestinationInputValue(text);

        if (text.length > 2) {
            try {
                const response = await axios.get(`${GOOGLE_MAP_URL}?input=${text}&key=${GOOGLE_MAP_API}`);
                setDestinationSuggestions([...response.data.predictions]);
            } catch (error) {
                console.error(error);
            }
        } else {
            setDestinationSuggestions([]);
        }
    };

 const handleSuggestionPress = async (suggestion, type) => {
        let location;
        try {
            const response = await axios.get(`${GOOGLE_PLACE_DETAILS_URL}?place_id=${suggestion.place_id}&key=${GOOGLE_MAP_API}`);
            location = response.data.result.geometry.location;
        } catch (error) {
            console.error('Error fetching location details:', error);
            return; // Exit if there's an error
        }

        if (type === 'from') {
            setInputValue(suggestion.description);
            setSuggestions([]);
            setFromLocation({ lat: location.lat, lng: location.lng }); // Store lat/lng for 'from'

            // Check if destination location is already set
            if (destinationLocation) {
                navigateToMap(location, destinationLocation); // Navigate if both are available
            }
        } else if (type === 'destination') {
            setDestinationInputValue(suggestion.description);
            setDestinationSuggestions([]);
            setDestinationLocation({ lat: location.lat, lng: location.lng }); // Store lat/lng for destination

            // Check if from location is already set
            if (fromLocation) {
                navigateToMap(fromLocation, location); // Navigate if both are available
            }
        }

        Keyboard.dismiss();
    };

    const navigateToMap = (from, destination) => {
        navigation.navigate('Homemap', {
            from: {
                lat: from.lat,
                lng: from.lng,
            },
            destination: {
                lat: destination.lat,
                lng: destination.lng,
            },
        });
    };
    
    
    

    const handlePressOutside = () => {
        setSuggestions([]);
        setDestinationSuggestions([]);
        Keyboard.dismiss();
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={(index) => setIsBottomSheetOpen(index === 1)}
            handleStyle={[styles.handle, { backgroundColor: theme.colors.background, borderTopLeftRadius: wp('5%'), borderTopRightRadius: wp('5%') }]}
            backgroundStyle={{ backgroundColor: theme.colors.background }}
            handleIndicatorStyle={{ backgroundColor: '#363940' }}
        >
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <View style={[styles.bottomSheetContent, { backgroundColor: theme.colors.background }]}>
                    {isBottomSheetOpen ? (
                        <View>
                            <View style={styles.whereinput}>
                                <FontAwesome6 name="circle-dot" size={24} color="#FFC12E" style={styles.icon2} />
                                <TextInput
                                    style={[styles.input1, { color: theme.colors.text, backgroundColor: theme.colors.inputcolor }]}
                                    placeholder='From'
                                    placeholderTextColor={'#9FA19E'}
                                    value={inputValue}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                                <FontAwesome6 name="location-crosshairs" size={wp('5%')} color="#9FA19E" style={styles.icon} />
                            </View>

                            <View style={{ flexDirection: 'row', marginLeft: wp('-1%') }}>
                                <Entypo name="location-pin" size={28} color="#FFC12E" style={styles.icon2} />
                                <TextInput
                                    style={[styles.input1, { color: theme.colors.text, backgroundColor: theme.colors.inputcolor }]}
                                    placeholder='Destination'
                                    placeholderTextColor={'#9FA19E'}
                                    value={destinationInputValue}
                                    onFocus={handleDestinationInputFocus} 
                                    onChangeText={handleDestinationInputChange}
                                />
                                <Entypo name="location-pin" size={wp('6%')} color="#9FA19E" style={styles.icon} />
                            </View>
                            {isFromFocused && suggestions.length > 0 && (
                                <FlatList
                                    data={suggestions}
                                    ListHeaderComponent={
                                        <TouchableOpacity onPress={() => {/* Handle Choose on Map action */ }}
                                            style={[styles.button, { backgroundColor: theme.colors.inputcolor }]}>
                                            <Ionicons name="location-sharp" size={wp('5%')} color="#FFC12E" />
                                            <Text style={[styles.suggestion, { color: theme.colors.text }]}>Your Current Location</Text>
                                        </TouchableOpacity>
                                    }
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => handleSuggestionPress(item, 'from')}
                                            style={[styles.button, { backgroundColor: theme.colors.inputcolor }]}>
                                            <Ionicons name="location-sharp" size={wp('5%')} color="#FFC12E" />
                                            <Text style={[styles.suggestion, { color: theme.colors.text }]}>{item.description}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => item.place_id ? item.place_id : `custom-suggestion-${index}`} // Add unique key for "Your current location"
                                    style={styles.suggestionsContainer}
                                    keyboardShouldPersistTaps="handled"
                                />
                            )}
                            {isDestinationFocused && destinationSuggestions.length > 0 && (
                                <FlatList
                                    data={destinationSuggestions}
                                    ListHeaderComponent={
                                        <TouchableOpacity onPress={() => {/* Handle Choose on Map action */ }}
                                            style={[styles.button, { backgroundColor: theme.colors.inputcolor }]}>
                                            <Ionicons name="location-sharp" size={wp('5%')} color="#FFC12E" />
                                            <Text style={[styles.suggestion, { color: theme.colors.text }]}>Choose on Map</Text>
                                        </TouchableOpacity>
                                    }
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => handleSuggestionPress(item, 'destination')}
                                            style={[styles.button, { backgroundColor: theme.colors.inputcolor }]}>
                                            <Ionicons name="location-sharp" size={wp('5%')} color="#FFC12E" />
                                            <Text style={[styles.suggestion, { color: theme.colors.text }]}>{item.description}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => item.place_id ? item.place_id : `destination-suggestion-${index}`}
                                    style={styles.suggestionsContainer}
                                    keyboardShouldPersistTaps="handled"
                                />
                            )}
                        </View>
                    ) : (
                        <View>
                            <View style={styles.whereinput}>
                                <TextInput
                                    style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.inputcolor }]}
                                    placeholder='Where would you go?'
                                    placeholderTextColor={'#9FA19E'}
                                />
                                <Entypo name="location-pin" size={wp('6%')} color="#9FA19E" style={styles.icon} />
                            </View>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </BottomSheet>
    );
};


const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
    },
    handle: {
        height: 5,
        borderRadius: 2.5,
    },
    input: {
        width: wp('85%'),
        height: hp('7%'),
        borderRadius: wp('5%'),
        marginTop: hp('2%'),
        paddingLeft: wp('5%')
    },
    input1: {
        width: wp('80%'),
        height: hp('7%'),
        borderRadius: wp('5%'),
        marginTop: hp('2%'),
        paddingLeft: wp('5%')
    },
    whereinput: {
        flexDirection: 'row'
    },
    icon: {
        marginTop: hp('4%'),
        marginLeft: hp('-4%'),
    },
    icon2: {
        marginTop: hp('4%'),
        marginRight: hp('2%'),
    },
    suggestionsContainer: {
        marginTop: hp('2%'),
        width: wp('80%'),
        borderRadius: wp('5%'),
    },
    suggestion: {
        padding: wp('3%'),
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('2%'),
    },
});

export default CustomBottomSheet;
