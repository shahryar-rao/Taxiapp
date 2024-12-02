import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme, Image, Alert, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { DatePickerInput } from './helpers/datepicker';
import { styles } from '../global-styles/fillprofile.styles';
import { EmailInput } from './helpers/emailinput';
import GenderPicker from './helpers/genderpicker';
import CountryPickerComponent from './helpers/countrypicker';
import { updateProfile } from './helpers/auth';



const FillProfile = ({ navigation,route }) => {
    const theme = useTheme();
    const colorscheme = useColorScheme();
    const arrowColor = colorscheme === 'dark' ? 'white' : 'black';
    LogBox.ignoreAllLogs(true);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [callingCode, setCallingCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [fullname, setfullname] = useState('');
    const [nickname, setnickname] = useState('');
    const [email, setEmail] = useState(theme.email || "");
    console.log(email);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const formattedDate = moment(date).format('DD/MM/YYYY');
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const handleSelectCountry = (country) => {
        setCountryCode(country.cca2); // Update the selected country
        setCallingCode(`+${country.callingCode[0]}`); // Update the calling code
    };

    const completePhoneNumber = `${callingCode}${phoneNumber}`;

    const handleUpdateProfile = async () => {
        try {
            const message = await updateProfile(
                fullname, nickname, selectedDate, completePhoneNumber, countryCode, gender, email, imageUri
            );
            Alert.alert('Success', message,[{ text: "OK", onPress: () => navigation.navigate('CreateNewPin',{email}) }]);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update profile.');
        }
    };
    

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.headingcont}>
                <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('Signup')}>
                    <AntDesign name="arrowleft" size={26} color={arrowColor} />
                </TouchableOpacity>
                <Text style={[styles.heading, { color: theme.colors.text }]}>Fill Your Profile</Text>
                <View></View>
            </View>
            <View style={[styles.inputcont, { backgroundColor: theme.colors.inputcolor }]}>
                <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder='Full Name'
                    placeholderTextColor={'#9E9EA0'}
                    value={fullname}
                    onChangeText={setfullname}
                />
            </View>
            <View style={[styles.inputcont, { backgroundColor: theme.colors.inputcolor }]}>
                <TextInput
                    style={[styles.input, { color: theme.colors.text }]}
                    placeholder='Nickname'
                    placeholderTextColor={'#9E9EA0'}
                    value={nickname}
                    onChangeText={setnickname}
                />
            </View>
            <DatePickerInput selectedDate={selectedDate} showDatePicker={showDatePicker} />
            <EmailInput email={email} setEmail={setEmail} />

            <CountryPickerComponent
                countryCode={countryCode}
                callingCode={callingCode}
                onSelect={handleSelectCountry}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
            />

            <GenderPicker selectedGender={gender} onGenderChange={setGender} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />

            <TouchableOpacity style={styles.signinbuton} onPress={handleUpdateProfile}>
                <Text style={styles.buttontext}>Update</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default FillProfile;
