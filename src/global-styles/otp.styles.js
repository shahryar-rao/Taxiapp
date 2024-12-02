import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-between',
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
        marginTop: hp('5%'),
        marginBottom:hp('3%')
    },
    buttontext: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#000',
    },
    text: {
        fontSize: wp('4%'),
        marginTop: hp('1%'),
        // marginBottom:hp('%'),
        alignSelf:'center',
    },
    input: {
        width: wp('19%'),
        height: hp('8%'),
        borderRadius: wp('3%'),
        textAlign: 'center',
        fontSize: wp('4%'),
        fontWeight: '600',
        marginTop: hp('4%'),
    },
    code: {
        fontSize: wp('4%'),
        marginTop:hp('3%'),
        alignSelf:'center',
    },
    middlecont:{
        width:wp('85%'),

    },
});

export default styles;