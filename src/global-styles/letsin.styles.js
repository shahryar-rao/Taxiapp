import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',

    },
    googlebutton: {
        width: wp('85%'),
        height: hp('7%'),
        borderWidth: 1,
        borderRadius: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: hp('1.5%')
    },
    image: {
        resizeMode: 'cover',
        height: hp('25%'),
        width: wp('53%'),
        marginTop: hp('5%')
    },
    arrow: {
        alignSelf: 'flex-start',
        marginLeft: wp('6%'),
        marginTop: hp('1%')
    },
    text: {
        fontSize: wp('12%'),
        fontWeight: 'bold',
        marginBottom: hp('2%')
    },
    Orcontainer: {
        marginTop: hp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        width: '36%',
        height: hp('0.2%'),
    },
    signinbuton: {
        backgroundColor: '#FFC12E',
        width: wp('85%'),
        height: hp('8%'),
        borderRadius: wp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('5%'),
    },
    googlebtntxt: {
        fontSize: wp('4%'),
        fontWeight: '500',
        marginLeft: wp('2%')
    },
    buttontext: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#000'
    },
    bottomtext: {
        fontSize: wp('3.5%'),
    },
    signup: {
        color: '#FFC12E'
    },

});


export default styles;