import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, useColorScheme, TextInput, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../global-styles/forgot.styles';
import { handleSendOtp } from './helpers/auth';




const Forgotpass = ({ navigation }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';

    const [selectedOption, setSelectedOption] = useState(null);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [smsModalVisible, setSmsModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [number, setnumber] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state


    const handleContinue = () => {
        if (selectedOption === 'email') {
            setEmailModalVisible(true);
        } else if (selectedOption === 'sms') {
            setSmsModalVisible(true);
        }
    };

    const handleSendOtpWithLoading = async () => {
        setLoading(true); // Set loading to true
        await handleSendOtp(email, setEmailModalVisible, navigation);
        setLoading(false); // Set loading to false after OTP is sent
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.headingcont}>
                <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('Login')}>
                    <AntDesign name="arrowleft" size={26} color={arrowColor} />
                </TouchableOpacity>
                <Text style={[styles.heading, { color: theme.colors.text }]}>Forgot Password</Text>
                <View></View>
            </View>
            {colorscheme === 'dark' ?
                (<Image source={require('../../assets/darkforgetpass.png')} style={styles.image} />) : (
                    <Image source={require('../../assets/lightforgetpass.png')} style={styles.image} />
                )}
            <Text style={[styles.text, { color: theme.colors.text }]}>
                Select which contact details should we use to reset your password
            </Text>
            <TouchableOpacity style={[styles.smscont, { backgroundColor: theme.colors.inputcolor },
            selectedOption === 'sms' && styles.selectedBorder]}
                onPress={() => setSelectedOption('sms')}
            >
                <View style={[styles.circle, { backgroundColor: theme.colors.circlecolor }]}>
                    <MaterialCommunityIcons name="message-processing" size={24} color="#FFC12E" />
                </View>
                <View style={{ marginLeft: wp('3%') }}>
                    <Text style={styles.sms}>via SMS:</Text>
                    <Text style={[styles.number, { color: theme.colors.text }]}>+1 111******99</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smscont, { backgroundColor: theme.colors.inputcolor },
            selectedOption === 'email' && styles.selectedBorder]}
                onPress={() => setSelectedOption('email')}
            >
                <View style={[styles.circle, { backgroundColor: theme.colors.circlecolor }]}>
                    <MaterialIcons name="email" size={24} color="#FFC12E" />
                </View>
                <View style={{ marginLeft: wp('3%') }}>
                    <Text style={styles.sms}>via Email:</Text>
                    <Text style={[styles.number, { color: theme.colors.text }]}>abcd@gmail.com</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signinbuton} onPress={handleContinue}>
                <Text style={styles.buttontext}>Continue</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={emailModalVisible}
                onRequestClose={() => setEmailModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.inputcolor }]}>
                        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Reset via Email</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                            placeholder="Enter your registered email"
                            placeholderTextColor={'#9E9EA0'}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TouchableOpacity onPress={handleSendOtpWithLoading} style={styles.closeButton}>
                            {loading ? (
                                <ActivityIndicator size="small" color="black" /> // Show loader
                            ) : (
                                <Text style={[styles.buttonText, { color: 'black' }]}>Send Code</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={smsModalVisible}
                onRequestClose={() => setSmsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.inputcolor }]}>
                        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Reset via SMS</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.colors.background }]}
                            placeholder="+92 1232200111"
                            placeholderTextColor={'#9E9EA0'}
                            value={number}
                            onChangeText={(text) => setnumber(text)}
                        />
                        <TouchableOpacity onPress={() => setSmsModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.buttonText}>Send Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </SafeAreaView>

    );
};



export default Forgotpass;
