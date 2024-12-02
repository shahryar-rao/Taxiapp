import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, useColorScheme, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import styles from '../global-styles/login.styles';
import { handleLogin } from './helpers/auth';
import { validateFields } from './helpers/validatefields';





const Login = ({ navigation }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';

    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailerror, setemailerror] = useState('');
    const [passerror, setpasserror] = useState('');



    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };
    const handleInputChange = (setter, errorSetter, value) => {
        setter(value);
        if (errorSetter) {
            errorSetter('');
        }
    };
    const handleLoginPress = () => {
        if (validateFields(email, password, setemailerror, setpasserror)) {
            handleLogin(email, password, navigation).then(() => {
                theme.login(email);
            });
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('Signup')}>
                <AntDesign name="arrowleft" size={26} color={arrowColor} />
            </TouchableOpacity>

            <Text style={[styles.text, { color: theme.colors.text }]}>Login to your Account</Text>
            <View style={[styles.inputcont, { backgroundColor: theme.colors.googlebutton }]}>
                <AntDesign name="mail" size={22} color="#9E9EA0" style={{ marginHorizontal: wp('3%') }} />
                <TextInput
                    style={[styles.input,emailerror && styles.inputError, { backgroundColor: theme.colors.googlebutton, color: theme.colors.text }]}
                    placeholder='Email'
                    placeholderTextColor={'#9E9EA0'}
                    value={email}
                    onChangeText={(value) => handleInputChange(setEmail, setemailerror, value)}
                />
            </View>
            {emailerror && <Text style={styles.errorText}>{emailerror}</Text>}
            <View style={[styles.inputcont, { backgroundColor: theme.colors.googlebutton }]}>
                <FontAwesome5 name="lock" size={20} color="#9E9EA0" style={{ marginHorizontal: wp('3.5%') }} />
                <TextInput
                    style={[styles.input,passerror && styles.inputError, { backgroundColor: theme.colors.googlebutton, color: theme.colors.text }]}
                    placeholder='Password'
                    placeholderTextColor={'#9E9EA0'}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={(value) => handleInputChange(setPassword, setpasserror, value)}

                />
                <TouchableOpacity onPress={togglePasswordVisibility} >
                    {isPasswordVisible ? (
                        <Entypo name="eye" size={22} color="#9E9EA0" />
                    ) : (
                        <Entypo name="eye-with-line" size={22} color="#9E9EA0" />
                    )}
                </TouchableOpacity>
            </View>
            {passerror && <Text style={styles.errorText}>{passerror}</Text>}
            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={{ borderRadius: 5, borderColor: '#FED36A', borderWidth: 1.5 }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#FED36A' : undefined}
                />
                <Text style={[styles.checkboxLabel, { color: theme.colors.text }]}>Remember me </Text>
            </View>

            <TouchableOpacity style={styles.signinbuton} onPress={handleLoginPress}>
                <Text style={styles.buttontext}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Forgotpass')}>
                <Text style={styles.forget}>Forget the password?</Text>
            </TouchableOpacity>
            <View style={styles.Orcontainer}>
                <View style={[styles.line, { backgroundColor: theme.colors.line }]}></View>
                <Text style={{ color: theme.colors.text, marginHorizontal: wp('2.7%'), fontWeight: '600', fontSize: wp('4%'), }}> Or continue with </Text>
                <View style={[styles.line, { backgroundColor: theme.colors.line }]}></View>
            </View>
            <View style={styles.socailcont}>
                <TouchableOpacity>
                    <View style={[styles.fbcont, { backgroundColor: theme.colors.googlebutton }]}>
                        <View style={styles.fbwhite}>
                        </View>
                        <Image source={require('../../assets/fb.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.fbcont, { backgroundColor: theme.colors.googlebutton }]}>
                        <Image source={require('../../assets/googleee.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.fbcont, { backgroundColor: theme.colors.googlebutton }]}>
                        <AntDesign name="apple1" size={24} color={theme.colors.apple} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                <Text style={[styles.bottomtext, { color: theme.colors.text }]}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={styles.signup}>Sign Up</Text></TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};



export default Login;
