import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/components/helpers/themecontext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from './src/components/helpers/themecontext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SplashScreen from './src/components/splashscreen';
import Welcomescreen from './src/components/welcomescrn';
import OnboardingScreen from './src/components/corousal';
import LetsIn from './src/components/letsinscreen';
import Homemap from './src/components/homemap';
import InboxScreen from './src/components/inbox';
import ProfileScreen from './src/components/profile';
import WalletScreen from './src/components/wallet';
import BookingScreen from './src/components/booking';
import SearchScreen from './src/components/search';
import Signup from './src/components/signupscreen';
import Login from './src/components/loginscreen';
import Forgotpass from './src/components/forgotpass';
import OTPScreen from './src/components/OTPscreen';
import Createnewpass from './src/components/createnewpass';
import FillProfile from './src/components/fillprofile';
import CreateNewPin from './src/components/createnewpin';
import Fingerprint from './src/components/fingerprint';
import EditPtofile from './src/components/editprofile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Welcomescreen" component={Welcomescreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="LetsIn" component={LetsIn} />
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgotpass" component={Forgotpass} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="Createnewpass" component={Createnewpass} />
        <Stack.Screen name="FillProfile" component={FillProfile} />
        <Stack.Screen name="CreateNewPin" component={CreateNewPin} />
        <Stack.Screen name="Fingerprint" component={Fingerprint} />
        <Stack.Screen name="EditPtofile" component={EditPtofile} />





        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};


function BottomTabNavigator({route,navigation}) {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color;

          if (route.name === 'Homemap') {
            iconName = focused ? 'home' :'home';
            color = focused ? '#FFC12E' :'#8C8D92';
          } else if (route.name === 'InboxScreen') {
            iconName = focused ? 'message1' : 'message1';
            color = focused ? '#FFC12E' :'#8C8D92';
          }else if (route.name === 'ProfileScreen') {
            iconName = focused ? 'person-outline' : 'person-outline';
            color = focused ? '#FFC12E' :'#8C8D92';
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === 'WalletScreen') {
            iconName = focused ? 'wallet' : 'wallet';
            color = focused ? '#FFC12E' :'#8C8D92';
          } else if (route.name === 'BookingScreen') {
            iconName = focused ? 'filetext1' : 'filetext1';
            color = focused ? '#FFC12E' :'#8C8D92';

          }

          return <AntDesign name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#FFC12E',
        tabBarInactiveTintColor: '#8C8D92',
        tabBarStyle: { backgroundColor: theme.colors.background,
          elevation: 0,
          height: hp('8%'),
          borderTopWidth: 0,
         },
        tabBarLabelStyle: { fontSize: wp('3%'),
          marginBottom:hp('1%')
         },
      })}
    >
      <Tab.Screen name="Homemap" component={Homemap} options={{ tabBarLabel: 'Home' }} initialParams={route.params}  />
      <Tab.Screen name="BookingScreen" component={BookingScreen} options={{ tabBarLabel: 'Booking' }} />
      <Tab.Screen name="InboxScreen" component={InboxScreen} options={{ tabBarLabel: 'Inbox' }} />
      <Tab.Screen name="WalletScreen" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />

    </Tab.Navigator>
  );
}