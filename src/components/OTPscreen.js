import React, { useRef, useState, useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../global-styles/otp.styles';
import { verifyOTP } from './helpers/auth';
import { handleResendCode } from './helpers/auth';

// Import the handleOTPInput function
import { handleOTPInput } from './helpers/handleotpinput';

const OTPScreen = ({ navigation,route }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';

    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [email,setEmail] =useState(route.params?.email ||'');
    const [number,setnumber] =useState();


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



    useEffect(() => {
        if (isTimerActive && timer > 0) {
            const timerId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
    }, [isTimerActive, timer]);

    useEffect(() => {
        if (otp[1] && otp[2] && otp[3] && otp[4]) {
            verifyOTP(email,otp,navigation); // Automatically verify when all OTP fields are filled
        }
    }, [otp]);

    // Use useCallback to memoize the handler
    const handleOTP = useCallback(
        (text, field) => handleOTPInput(text, field, otp, setOtp, inputRefs),
        [otp]
    );




    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.headingcont}>
                <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('Login')}>
                    <AntDesign name="arrowleft" size={26} color={arrowColor} />
                </TouchableOpacity>
                <Text style={[styles.heading, { color: theme.colors.text }]}>Forgot Password</Text>
                <View></View>
            </View>
            <View style={styles.middlecont}>
                <Text style={[styles.text, { color: theme.colors.text,fontWeight:'700' }]}>Code has been sent to :</Text>
                <Text style={[styles.text, { color: theme.colors.text }]}>{email || number}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:hp('2%') }}>
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
                {isTimerActive ? (
                    <Text style={[styles.code, { color: theme.colors.text }]}>
                        Resend Code in <Text style={{ color: '#FFC12E' }}>{timer}</Text> s
                    </Text>
                ) : (
                    <TouchableOpacity onPress={()=>handleResendCode(setTimer,setIsTimerActive,email)}>
                        <Text style={[styles.code, { color: '#FFC12E' }]}>Resend Code</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.signinbuton} onPress={()=>verifyOTP(email,otp,navigation)}>
                <Text style={styles.buttontext}>Verify</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};




export default OTPScreen;
