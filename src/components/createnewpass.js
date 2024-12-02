import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import CongratsModal from './helpers/congratsmodal';
import styles from '../global-styles/createnewpass.styles';

const Createnewpass = ({ navigation,route }) => {
  const theme = useTheme();
  const colorscheme = useColorScheme();
  const arrowColor = colorscheme === 'dark' ? 'white' : 'black';

  const [email,setEmail] =useState(route.params?.email ||'');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isPasswordVisible2, setPasswordVisibility2] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisibility2(!isPasswordVisible2);
  };

  const validateFields = () => {
    let isValid = true;

    // Validate password field
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError(''); // Clear error if valid
    }

    // Validate confirm password field
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError(''); // Clear error if valid
    }

    return isValid;
  };

  const handleContinue = async () => {
    if (validateFields()) {
      try {
        const response = await fetch('http://192.168.1.8:3002/api/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        const data = await response.json();
        if (data.success) {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            if (isChecked) {
              navigation.navigate('Bottom'); 
            } else {
              navigation.navigate('Login'); 
            }
          }, 500);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    }
  };
  

  const handleInputChange = (setter, errorSetter, value) => {
    setter(value);
    errorSetter('');
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headingcont}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('Login')}>
          <AntDesign name="arrowleft" size={26} color={arrowColor} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: theme.colors.text }]}>Create New Password</Text>
        <View></View>
      </View>
      {colorscheme === 'dark' ? (
        <Image source={require('../../assets/darknewpass.png')} style={styles.image} />
      ) : (
        <Image source={require('../../assets/lightnewpass.png')} style={styles.image} />
      )}
      <Text style={[styles.text, { color: theme.colors.text }]}>Create your New Password</Text>

      {/* Password input field */}
      <View style={[styles.inputcont, { backgroundColor: theme.colors.googlebutton }]}>
        <FontAwesome5 name="lock" size={20} color="#9E9EA0" style={{ marginHorizontal: wp('3.5%') }} />
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.googlebutton, color: theme.colors.text }]}
          placeholder="Create new Password"
          placeholderTextColor="#9E9EA0"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={(value) => handleInputChange(setPassword, setPasswordError, value)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          {isPasswordVisible ? (
            <Entypo name="eye" size={22} color="#9E9EA0" />
          ) : (
            <Entypo name="eye-with-line" size={22} color="#9E9EA0" />
          )}
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Confirm Password input field */}
      <View style={[styles.inputcont, { backgroundColor: theme.colors.googlebutton }]}>
        <FontAwesome5 name="lock" size={20} color="#9E9EA0" style={{ marginHorizontal: wp('3.5%') }} />
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.googlebutton, color: theme.colors.text }]}
          placeholder="Confirm new Password"
          placeholderTextColor="#9E9EA0"
          secureTextEntry={!isPasswordVisible2}
          value={confirmPassword}
          onChangeText={(value) => handleInputChange(setConfirmPassword, setConfirmPasswordError, value)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility2} style={styles.iconContainer}>
          {isPasswordVisible2 ? (
            <Entypo name="eye" size={22} color="#9E9EA0" />
          ) : (
            <Entypo name="eye-with-line" size={22} color="#9E9EA0" />
          )}
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={{ borderRadius: 5, borderColor: '#FED36A', borderWidth: 1.5 }}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#FED36A' : undefined}
        />
        <Text style={[styles.checkboxLabel, { color: theme.colors.text }]}>Remember me </Text>
      </View>

      <TouchableOpacity style={styles.signinbuton} onPress={handleContinue}>
        <Text style={styles.buttontext}>Continue</Text>
      </TouchableOpacity>

      <CongratsModal visible={modalVisible} onClose={closeModal} />
    </SafeAreaView>
  );
};

export default Createnewpass;
