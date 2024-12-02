import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
  
    },
    headercont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: wp('85%'),
      alignItems: 'center',
      marginTop: hp('1%'),
    },
    image: {
      height: hp('5%'),
      width: wp('10%'),
    },
    profilecont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profile: {
      fontSize: wp('5%'),
      fontWeight: '700',
    },
    threedot: {
      borderWidth: 1,
      borderRadius: wp('5%'),
      padding: wp('1%'),
    },
    imagpickercont: {
      height: hp('15%'),
      width: wp('30%'),
      borderRadius: wp('50%'),
      marginTop: hp('2%'),
    },
    picimagebtn: {
      position: 'absolute',
      right: wp('1%'),
      bottom: hp('0.1%'),
    },
    userpic: {
      height: hp('15%'),
      width: wp('30%'),
      borderRadius: wp('50%'),
    },
    name: {
      fontSize: wp('6%'),
      fontWeight: '600',
      textAlign: 'center',
    },
    nmbr: {
      fontSize: wp('3%'),
      fontWeight: '600',
      textAlign: 'center',
    },
    namecont: {
      marginTop: hp('2%'),
      width: wp('85%'),
      borderBottomWidth: 1,
      borderBottomColor: '#8C8D92',
      paddingBottom: hp('3%'),
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: wp('85%'),
      height: hp('6%'),
    },
    FlatList: {
      paddingTop: hp('1%'),
    },
    buttonname: {
      fontSize: wp('4%'),
      width: wp('40%'),
      marginLeft: wp('-20%'),
    },
    logo: {
      width: wp('8%'),
    },
  
  });