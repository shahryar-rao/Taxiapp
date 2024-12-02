import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    headingcont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: wp('85%'),
      marginTop: hp('2%'),
    },
    heading: {
      fontSize: wp('5%'),
      fontWeight: '600',
      marginLeft: wp('-25%'),
    },
    signinbuton: {
      backgroundColor: '#FFC12E',
      width: wp('85%'),
      height: hp('8%'),
      borderRadius: wp('20%'),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp('14%'),
    },
    buttontext: {
      fontSize: wp('4%'),
      fontWeight: '500',
      color: '#000',
    },
    image: {
      height: hp('40%'),
      width: wp('85%'),
    },
    text: {
      fontSize: wp('4%'),
      alignSelf: 'flex-start',
      marginLeft: wp('7%'),
    },
    inputcont: {
      marginTop: hp('2%'),
      width: wp('85%'),
      height: hp('8%'),
      borderRadius: wp('4%'),
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      height: hp('8%'),
      width: wp('60%'),
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: wp('2%'),
      top: 15,
    },
    checkboxLabel: {
      marginLeft: wp('2%'),
      fontSize: wp('3.5%'),
    },
    errorText: {
      color: 'red',
      alignSelf: 'flex-end',
      marginRight:wp('10%')
  },
  });

  export default styles;