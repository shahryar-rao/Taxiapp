import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from './helpers/themecontext';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');

const slides = [
  { key: '1', image: require('../../assets/taxicar.png'), text: 'We provide \n professional taxi\n service for you' },
  { key: '2', image: require('../../assets/maleperson.png'), text: 'Your satisfaction\n is our number one\n priority ' },
  { key: '3', image: require('../../assets/femaleperson.png'), text: 'Lets make your day\n great with Taxio \n right now!' },
];

const OnboardingScreen = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation(); // Initialize navigation


  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const Slide = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: theme.colors.background }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.text, { color: theme.colors.text }]}>{item.text}</Text>
    </View>
  );

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }else {
      // Navigate to the next screen when on the last slide
      navigation.navigate('LetsIn'); // Replace 'NextScreen' with the name of your next screen
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={slides}
        renderItem={Slide}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentIndex ? '#FFC12E' : '#ddd' },
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
      <Text style={styles.buttontext}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
              </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: hp('83%'),
    width: wp('100%'),
  },
  image: {
    width: screenWidth * 0.8,
    height: hp('40%'),
    resizeMode: 'cover',
  },
  text: {
    marginTop: hp('2%'),
    fontSize: wp('9%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp('18%'),
  },
  paginationDot: {
    width: wp('3%'),
    height: hp('1.5%'),
    borderRadius: wp('10%'),
    margin: wp('1%'),
  },
  button: {
    backgroundColor: '#FFC12E',
    width: wp('80%'),
    height: hp('8%'),
    borderRadius: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: hp('4%'),
  },
  buttontext: {
    fontSize: wp('5%'),
    fontWeight: '600',
  },
});

export default OnboardingScreen;
