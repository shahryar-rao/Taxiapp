import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useTheme } from './helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const SplashScreen = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcomescreen'); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image source={require('../../assets/splashscreen1.png')}/>
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

export default SplashScreen;
