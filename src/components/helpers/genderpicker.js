// GenderPicker.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../global-styles/fillprofile.styles';
import { useTheme } from './themecontext';

const GenderPicker = ({ selectedGender, onGenderChange }) => {
    const theme = useTheme();

    return (
        <View style={[styles.inputcont, { backgroundColor: theme.colors.inputcolor }]}>
        <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => onGenderChange(itemValue)}
            style={{ color: theme.colors.text }} // Picker text color
        >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
        </Picker>
    </View>
    );
};



export default GenderPicker;
