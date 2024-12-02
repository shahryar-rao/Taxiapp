import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, StyleSheet, Image, FlatList, Switch,Alert } from 'react-native';
import { useTheme } from './helpers/themecontext';
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pickImage } from './helpers/imagepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { fetchUserData } from './helpers/auth';
import { uploadImage } from './helpers/auth';
import { styles } from '../global-styles/profile.styles';


const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const logocolor = theme.colors.text;
  const email = theme.email;

  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const sahredlogo = <MaterialIcons name="arrow-forward-ios" size={24} color={logocolor} />;
  const buttonsData = [
    { id: 1, logo: <Ionicons name="person-outline" size={24} color={logocolor} />, name: 'Edit Profile', arrow: sahredlogo },
    { id: 2, logo: <MaterialCommunityIcons name="map-marker-outline" size={24} color={logocolor} />, name: 'Address', arrow: sahredlogo },
    { id: 3, logo: <FontAwesome name="bell-o" size={24} color={logocolor} />, name: 'Notification', arrow: sahredlogo },
    { id: 4, logo: <AntDesign name="wallet" size={24} color={logocolor} />, name: 'Payment', arrow: sahredlogo },
    { id: 5, logo: <MaterialCommunityIcons name="security" size={24} color={logocolor} />, name: 'Security', arrow: sahredlogo },
    { id: 6, logo: <MaterialIcons name="language" size={24} color={logocolor} />, name: 'Language', arrow: sahredlogo },
    { id: 7, logo: <AntDesign name="eyeo" size={24} color={logocolor} />, name: 'Dark Mode', arrow: <Switch value={theme.isDarkMode} onValueChange={theme.toggleTheme} /> },
    { id: 8, logo: <MaterialIcons name="policy" size={24} color={logocolor} />, name: 'Privacy Policy', arrow: sahredlogo },
    { id: 9, logo: <Ionicons name="help-circle-outline" size={24} color={logocolor} />, name: 'Help Centre', arrow: sahredlogo },
    { id: 10, logo: <FontAwesome5 name="users" size={24} color={logocolor} />, name: 'Invite Friends', arrow: sahredlogo },
    { id: 11, logo: <MaterialCommunityIcons name="logout" size={24} color={logocolor} />, name: 'Logout', arrow: sahredlogo },

  ];

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData(email);
        const { fullname, mobile_number, image } = userData;
        setName(fullname);
        setMobileNumber(mobile_number);
        setImageUri(image ? `http://192.168.1.8:3002/${image}` : null);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    getUserData();
  }, [email]);


  const renderItem = ({ item }) => {
    return item.id === 7 ? (
      <View style={styles.button}>
        <View style={styles.logo}>{item.logo}</View>
        <Text style={[styles.buttonname, { color: theme.colors.text }]}>{item.name}</Text>
        <View style={styles.logo}>{item.arrow}</View>
      </View>
    ) : (
      <TouchableOpacity style={styles.button}>
        <View style={styles.logo}>{item.logo}</View>
        <Text style={[styles.buttonname, { color: theme.colors.text }]}>{item.name}</Text>
        <View style={styles.logo}>{item.arrow}</View>
      </TouchableOpacity>
    );
  };



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headercont}>
        <View style={styles.profilecont}>
          <Image source={require('../../assets/taxilogo.png')} style={styles.image} />
          <Text style={[styles.profile, { color: theme.colors.text }]}>Profile</Text>
        </View>
        <TouchableOpacity style={[styles.threedot, { borderColor: theme.colors.text }]}>
          <Entypo name="dots-three-horizontal" size={wp('3.5%')} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.imagpickercont}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../../assets/newuser.jpg')}
          style={styles.userpic}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.picimagebtn} onPress={() => pickImage(setImageUri, (uri)=>uploadImage(uri,email))}>
          <FontAwesome name="pencil-square" size={wp('7%')} color="#FFC12E" />
        </TouchableOpacity>
      </View>
      <View style={styles.namecont}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{name}</Text>
        <Text style={[styles.nmbr, { color: theme.colors.text }]}>{mobileNumber}</Text>
      </View>
      <FlatList
        data={buttonsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.FlatList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};



export default ProfileScreen;
