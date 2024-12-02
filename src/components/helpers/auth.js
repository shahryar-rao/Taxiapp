import axios from 'axios';
import { Alert } from 'react-native';

export const handleSignup = async (email, password, navigation) => {
    try {
        const response = await axios.post('http://192.168.1.8:3002/signup', {
            email,
            password,
        });

        // Check if response data is in the expected format
        if (response.data) {
            Alert.alert("Success", "User registered successfully!", [{ text: "OK", onPress: () => navigation.navigate('FillProfile', { email }) }]);
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        // console.error(error.response ? error.response.data : error.message);
        // Alert user that registration failed
        Alert.alert("Error", error.response?.data?.message || "User not registered!", [{ text: "OK" }]);
    }
};

export const handleLogin = async (email, password, navigation) => {
    try {
        const response = await fetch('http://192.168.1.8:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            navigation.navigate('Bottom');
        } else {
            Alert.alert("Error", data.error || 'Email or Password didnot match', [{ text: "OK" }]); 
        }
    } catch (error) {
        console.error('Error during login:', error);
        Alert.alert("Error", 'Unable to login. Please try again.', [{ text: "OK" }]); 
    }
};



export const updateProfile = async (fullname, nickname, selectedDate, completePhoneNumber, countryCode, gender, email, imageUri) => {
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('nickname', nickname);
    formData.append('dob', selectedDate);
    formData.append('mobile_number', completePhoneNumber);
    formData.append('country_code', countryCode);
    formData.append('gender', gender);
    formData.append('email', email);

    if (imageUri) {
        formData.append('image', {
            uri: imageUri, 
            type: 'image/jpg', 
            name: `photo_${Date.now()}.jpg`, 
        });
    }

    try {
        const response = await fetch('http://192.168.1.8:3002/updateProfile', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Profile updated:', result.message);
            return result.message;
        } else {
            console.error('Error updating profile:', result.error);
            throw new Error(result.error || 'Failed to update profile.');
        }
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};

export const handleSendOtp = async (email,setEmailModalVisible,navigation) => {
    if (email) {
        try {
            const response = await fetch('http://192.168.1.8:3002/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Show success message
                setEmailModalVisible(false); // Close modal
                navigation.navigate('OTPScreen',{email});
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send OTP');
        }
    } else {
        alert('Please enter your registered email');
    }
};

export const verifyOTP = async (email,otp,navigation) => {
    try {
        const response = await fetch('http://192.168.1.8:3002/api/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, 
                otp: `${otp[1]}${otp[2]}${otp[3]}${otp[4]}`
            }),
        });
        const data = await response.json();
        if (data.success) {
            navigation.navigate('Createnewpass',{email});
        } else {
            alert('Invalid OTP. Please try again.');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
    }
};

export const handleResendCode = async (setTimer,setIsTimerActive,email) => {
    setTimer(60);
    setIsTimerActive(true);
    try {
        const response = await fetch('http://192.168.1.8:3002/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data.message) {
            alert('OTP resent successfully!');
        } else {
            alert('Error resending OTP');
        }
    } catch (error) {
        console.error('Error resending OTP:', error);
    }
};


export const fetchUserData = async (email) => {
  try {
    const response = await axios.get('http://192.168.1.8:3002/api/fetchNameEmailNumber', {
      params: { email: email },
    });

    if (response.status === 200) {
      return response.data; // Return the user data
    } else {
      throw new Error('Error fetching user data: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message || error);
    throw error; // Rethrow the error for handling in the calling component
  }
};

export const uploadImage = async (uri, email) => {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    type: 'image/jpg',
    name: `photo_${Date.now()}.jpg`,
  });
  formData.append('email', email);

  try {
    const response = await axios.post('http://192.168.1.8:3002/updateimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data) {
      Alert.alert("Success", "Image Updated successfully!", [{ text: "OK" }]);
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error('Error updating image:', error);
    Alert.alert("Error", "Failed to update image, please try again.", [{ text: "OK" }]);
  }
};

