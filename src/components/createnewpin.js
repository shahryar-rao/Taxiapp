import React, { useRef, useState, useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../global-styles/otp.styles';
import axios from 'axios';

// Import the handleOTPInput function
import { handleOTPInput } from './helpers/handleotpinput';

const CreateNewPin = ({ navigation,route }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';

    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });
    const [email, setEmail] = useState(route.params?.email || "")


    // Create refs for each input
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);

    // Store refs in an array to pass to the handler
    const inputRefs = {
        1: inputRef1,
        2: inputRef2,
        3: inputRef3,
        4: inputRef4
    };

    // Use useCallback to memoize the handler
    const handleOTP = useCallback(
        (text, field) => handleOTPInput(text, field, otp, setOtp, inputRefs),
        [otp]
    );
    const handleSubmitPin = async () => {
        const pin = Object.values(otp).join(''); 

        try {
            const response = await axios.post('http://192.168.1.8:3002/api/store-pin', { pin, email });
            if (response.status === 200) {
                Alert.alert('Success', 'PIN stored successfully!');
                navigation.navigate('Fingerprint',{email}); 
            }
        } catch (error) {
            console.error('Error storing PIN:', error);
            Alert.alert('Error', 'Failed to store PIN. Please try again.');
        }
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.headingcont}>
                <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('FillProfile')}>
                    <AntDesign name="arrowleft" size={26} color={arrowColor} />
                </TouchableOpacity>
                <Text style={[styles.heading, { color: theme.colors.text }]}>Create New Pin</Text>
                <View></View>
            </View>
            <View style={styles.middlecont}>
                <Text style={[styles.text, {color:'#9E9EA0',textAlign:'center',width:wp('80%') }]}>Add a PIN number to make your account more secure.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.inputcolor, color: theme.colors.text }]}
                        keyboardType='numeric'
                        maxLength={1}
                        ref={inputRef1}
                        onChangeText={(text) => handleOTP(text, 1)}
                        value={otp[1]}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.inputcolor, color: theme.colors.text }]}
                        keyboardType='numeric'
                        maxLength={1}
                        ref={inputRef2}
                        onChangeText={(text) => handleOTP(text, 2)}
                        value={otp[2]}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.inputcolor, color: theme.colors.text }]}
                        keyboardType='numeric'
                        maxLength={1}
                        ref={inputRef3}
                        onChangeText={(text) => handleOTP(text, 3)}
                        value={otp[3]}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.inputcolor, color: theme.colors.text }]}
                        keyboardType='numeric'
                        maxLength={1}
                        ref={inputRef4}
                        onChangeText={(text) => handleOTP(text, 4)}
                        value={otp[4]}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.signinbuton} onPress={handleSubmitPin}>
                <Text style={styles.buttontext}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};




export default CreateNewPin;
