import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet,Image, } from 'react-native';
import { useTheme } from './helpers/themecontext';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Welcomescreen = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen'); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image source={require('../../assets/taxi.jpg')} style={styles.image}/>
        <Animatable.Text animation={'slideInLeft'} style={styles.text}>Welcome To 👋</Animatable.Text>
        <Animatable.Text animation={'slideInRight'} style={styles.text1}>Taxio</Animatable.Text>
        <Animatable.Text  animation={'slideInLeft'} style={styles.text2}>The Best Taxi booking app of the century to make your day great</Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    
  },
  image:{
    height:hp('110%'),
    width:wp('100%'),
  },
  text:{
    fontSize:wp('9%'),
    position:'absolute',
    bottom:hp('28%'),
    color:'#fff',
    fontWeight:'600',
    marginLeft:wp('10%'),
  },
  text1:{
    fontSize:wp('17%'),
    position:'absolute',
    bottom:hp('16%'),
    color:'#FFC12E',
    fontWeight:'800',
    marginLeft:wp('10%'),
  },
  text2:{
    fontSize:wp('4.5%'),
    position:'absolute',
    bottom:hp('9%'),
    color:'#fff',
    fontWeight:'600',
    marginLeft:wp('8%'),
    marginRight:wp('8%'),

  },

});

export default Welcomescreen;
