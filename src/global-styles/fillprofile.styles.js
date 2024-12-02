import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const styles = StyleSheet.create({
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
    userpic: {
        height: hp('17%'),
        width: wp('34%'),
        borderRadius: wp('50%'),
    },
    imagpickercont: {
        height: hp('17%'),
        width: wp('34%'),
        borderRadius: wp('50%'),
        marginTop: hp('4%'),
    },
    picimagebtn: {
        position: 'absolute',
        right: wp('1%'),
        bottom: hp('0.1%'),
    },
    inputcont: {
        height: hp('7%'),
        width: wp('87%'),
        marginTop: hp('3%'),
        borderRadius: wp('4%'),
    },
    input: {
        height: hp('7%'),
        width: wp('65%'),
        marginLeft: wp('5%'),
    },
    calendar: {
        alignSelf: 'center',
        marginLeft: wp('5%'),
    },
    signinbuton: {
        backgroundColor: '#FFC12E',
        width: wp('85%'),
        height: hp('8%'),
        borderRadius: wp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('20%'),
    },
    buttontext: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#000'
    },
});