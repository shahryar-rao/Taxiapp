import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert,useColorScheme,Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as LocalAuthentication from 'expo-local-authentication';
import axios from 'axios';
import { useTheme } from './helpers/themecontext';
import CongratsModal from './helpers/congratsmodal';
import uuid from 'react-native-uuid';
import { styles } from '../global-styles/fingerprint.styles';

const Fingerprint = ({ navigation, route }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';

    const [email, setEmail] = useState(route.params?.email || "");
    const [modalVisible, setModalVisible] = useState(false);
    // Function to handle the fingerprint authentication
    const handleFingerprintAuth = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert('Error', 'Fingerprint scanner not available on this device.');
            return;
        }

        const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (!supported.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            Alert.alert('Error', 'Fingerprint authentication is not supported on this device.');
            return;
        }

        Vibration.vibrate(100); // Vibrate for 100 milliseconds

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with Fingerprint',
            fallbackLabel: 'Enter PIN',
        });

        if (result.success) {
            // On successful authentication, hash the fingerprint data and send it to the backend
                const uniqueFingerprintID = uuid.v4(); // Generate a unique ID
                console.log('Generated UUID:', uniqueFingerprintID); // Log the UUID
                storeFingerprintInDB(uniqueFingerprintID);
        } else {
            Alert.alert('Authentication failed');
        }
    };

    // Function to store the hashed fingerprint in the database
    const storeFingerprintInDB = async (uniqueFingerprintID) => {
        try {
            const response = await axios.post('http://192.168.1.8:3002/api/store-fingerprint', {
                email,
                fingerprint: uniqueFingerprintID,
            });
            if (response.status === 200) {
                handleContinue();
            } else {
                Alert.alert('Error', 'Failed to store fingerprint in database.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while storing fingerprint data.');
        }
    };

    const handleContinue = () => {
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('Login');
        }, 2000);
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
                <Text style={styles.text}>Add a fingerprint to make your account more secure</Text>
                <Image source={require('../../assets/fingerprint.png')} style={styles.image}/>
                <Text style={styles.text}>Please put your finger on the fingerprint scanner to get started</Text>
            </View>
            <View style={styles.buttonscont}>
                <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.inputcolor }]} onPress={handleContinue}>
                    <Text style={[styles.text1, { color: theme.colors.text }]}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC12E' }]} onPress={handleFingerprintAuth}>
                    <Text style={styles.text1}>Continue</Text>
                </TouchableOpacity>
            </View>
            <CongratsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </SafeAreaView>
    );
};

export default Fingerprint;
