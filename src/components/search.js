import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../global-styles/search.styles';
import SearchList from './helpers/searchflatlist';
import Constants from 'expo-constants';


const SearchScreen = ({ navigation }) => {
    const theme = useTheme();
    const GOOGLE_MAP_API = Constants.expoConfig.extra.GOOGLE_MAP_API;
    const GOOGLE_MAP_URL = Constants.expoConfig.extra.GOOGLE_MAP_URL;
    const GOOGLE_PLACE_DETAILS_URL = Constants.expoConfig.extra.GOOGLE_PLACE_DETAILS_URL;

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const loadRecentSearches = async () => {
            try {
                const storedSearches = await AsyncStorage.getItem('recentSearches');
                if (storedSearches) {
                    setRecentSearches(JSON.parse(storedSearches).slice(0, 7));
                }
            } catch (error) {
                console.error('Failed to load recent searches:', error);
            }
        };
        loadRecentSearches();
    }, []);

    const fetchPlaceDetails = async (placeId) => {
        try {
            const response = await axios.get(
                `${GOOGLE_PLACE_DETAILS_URL}?place_id=${placeId}&key=${GOOGLE_MAP_API}`
            );
            const { lat, lng } = response.data.result.geometry.location;
            return { lat, lng };
        } catch (error) {
            console.error('Failed to fetch place details:', error);
            return null;
        }
    };

    const fetchPlaces = async (input) => {
        try {
            const response = await axios.get(
                `${GOOGLE_MAP_URL}?input=${input}&key=${GOOGLE_MAP_API}`
            );
            setSuggestions(response.data.predictions);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (text) => {
        setQuery(text);
        if (text.length > 2) { 
            fetchPlaces(text);
        }
    };

    const addRecentSearch = async (item) => {
        try {
            const location = await fetchPlaceDetails(item.place_id);
            if (location) {
                navigation.navigate('Bottom', {
                    screen: 'Homemap',
                    params: { location }, 
                });
                const updatedSearches = [item, ...recentSearches.filter(search => search.place_id !== item.place_id)].slice(0, 7);
                setRecentSearches(updatedSearches);
                await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
            }
        } catch (error) {
            console.error('Failed to add recent search:', error);
        }
    };
    

    const clearRecentSearches = async () => {
        try {
            await AsyncStorage.removeItem('recentSearches');
            setRecentSearches([]);
        } catch (error) {
            console.error('Failed to clear recent searches:', error);
        }
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.searchcont,{backgroundColor:theme.colors.inputcolor}]}>
                <AntDesign name="search1" size={24} color="#8C8D92" />
                <TextInput
                    style={[styles.input,{backgroundColor:theme.colors.inputcolor,color:theme.colors.text}]}
                    value={query}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity>
                    <AntDesign name="filter" size={24} color="#8C8D92" />
                </TouchableOpacity>
            </View>

            <View style={styles.recentcont}>
                <Text style={[styles.Recent, { color: theme.colors.text }]}>Recent</Text>
                {recentSearches.length > 0 && (
                    <TouchableOpacity onPress={clearRecentSearches}>
                        <Text style={[styles.Recent, { color: '#FFC12E' }]}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={[styles.line, { backgroundColor: theme.colors.line }]}></View>

            <SearchList
                data={query.length > 2 ? suggestions : recentSearches}
                onItemPress={addRecentSearch}
                theme={theme}
                query={query}
            />
        </SafeAreaView>
    );
};

export default SearchScreen;
