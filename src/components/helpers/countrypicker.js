import React from 'react';
import { View, TextInput, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles } from '../../global-styles/fillprofile.styles';
import { useTheme } from './themecontext';

const CountryPickerComponent = ({ countryCode, callingCode, onSelect, phoneNumber, setPhoneNumber }) => {
    const theme = useTheme();
    
    return (
        <View style={[styles.inputcont, { backgroundColor: theme.colors.inputcolor, flexDirection: 'row', alignItems: 'center' }]}>
            <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                onSelect={onSelect}
                containerButtonStyle={{ marginLeft: wp('3%') }}
            />
            <Text style={[styles.callingCodeText, { color: theme.colors.text }]}>
                {callingCode}
            </Text>
            <TextInput
                style={[styles.input, { color: theme.colors.text, flex: 1 }]}
                placeholder='111333999'
                placeholderTextColor={'#9E9EA0'}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType='numeric'
            />
        </View>
    );
};

export default CountryPickerComponent;
