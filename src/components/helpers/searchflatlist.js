// SearchList.js
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../global-styles/search.styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SearchList = ({ data, onItemPress, theme, query }) => {

    const renderSearchItem = ({ item }) => (
        <TouchableOpacity style={styles.searchItem} onPress={() => onItemPress(item)}>
            <Ionicons name="location-sharp" size={wp('5%')} color="#FFC12E" />
            <Text style={[styles.searchText, { color: theme.colors.text }]}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderSearchItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.place_id || index.toString()}
            contentContainerStyle={styles.flatListContainer}
            ListEmptyComponent={
                query.length > 2 ? (
                    <View>
                        <Image source={require('../../../assets/resultnotfound.png')} style={styles.resultpic} />
                        <Text style={[styles.emptyTexthead, { color: theme.colors.text }]}>Not Found</Text>
                        <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                            Sorry, the keyword you entered cannot be found. Please check again and search with another keyword.
                        </Text>
                    </View>
                ) : null
            }
        />
    );
};


export default SearchList;
