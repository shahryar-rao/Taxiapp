import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, useColorScheme } from 'react-native';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../global-styles/letsin.styles';
import { SafeAreaView } from 'react-native-safe-area-context';




const LetsIn = ({ navigation }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('OnboardingScreen')}>
                <AntDesign name="arrowleft" size={26} color={arrowColor} />
            </TouchableOpacity>
            {colorscheme === 'light' ? <Image source={require('../../assets/letsin.png')} style={styles.image} />
                : <Image source={require('../../assets/darkletsin.png')} style={styles.image} />}
            <Text style={[styles.text, { color: theme.colors.text }]}>Let's You In</Text>
            <TouchableOpacity style={[styles.googlebutton, { backgroundColor: theme.colors.googlebutton, borderColor: theme.colors.bordercolor }]}>
                <View style={{ backgroundColor: '#fff', height: hp('2.8%'), width: wp('5%'), borderRadius: wp('10%') }}>
                    <Image source={require('../../assets/fb.png')} style={{ height: hp('3.5%'), width: wp('7%'), top: hp('-0.55%'), left: wp('-1%') }} />
                </View>
                <Text style={[styles.googlebtntxt, { color: theme.colors.text }]}>Continue With Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.googlebutton, { backgroundColor: theme.colors.googlebutton, borderColor: theme.colors.bordercolor }]}>
                <Image source={require('../../assets/googleee.png')} style={{ height: hp('4%'), width: wp('8%') }} />
                <Text style={[styles.googlebtntxt, { color: theme.colors.text }]}>Continue With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.googlebutton, { backgroundColor: theme.colors.googlebutton, borderColor: theme.colors.bordercolor }]}>
                <AntDesign name="apple1" size={24} color={theme.colors.apple} />
                <Text style={[styles.googlebtntxt, { color: theme.colors.text }]}>Continue With Apple</Text>
            </TouchableOpacity>
            <View style={styles.Orcontainer}>
                <View style={[styles.line, { backgroundColor: theme.colors.line }]}></View>
                <Text style={{ color: theme.colors.text, marginHorizontal: wp('2.7%'), fontWeight: '600', fontSize: wp('4%'), }}> Or </Text>
                <View style={[styles.line, { backgroundColor: theme.colors.line }]}></View>
            </View>
            <TouchableOpacity style={styles.signinbuton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttontext}>Sign in with Password</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                <Text style={[styles.bottomtext, { color: theme.colors.text }]}>Don`t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signup}>Sign up</Text></TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};


export default LetsIn;
