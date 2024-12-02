import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const BookingScreen = ({ navigation }) => {
  const theme = useTheme();



  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Booking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

});

export default BookingScreen;
