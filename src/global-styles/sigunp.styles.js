import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',

    },
    arrow: {
        alignSelf: 'flex-start',
        marginLeft: wp('6%'),
        marginTop: hp('1%')
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-end',
        marginRight:wp('10%')
    },
    text: {
        fontSize: wp('12%'),
        fontWeight: 'bold',
        marginBottom: hp('5%'),
        marginTop: hp('10%'),
        alignSelf: 'flex-start',
        marginLeft: wp('6%'),

    },
    Orcontainer: {
        marginTop: hp('6%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        width: '24%',
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
    input: {
        height: hp('8%'),
        width: wp('60%'),
        // borderWidth:1,
        // borderColor: '#fff',
    },
    inputcont: {
        marginTop: hp('2%'),
        width: wp('85%'),
        height: hp('8%'),
        borderRadius: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center'
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
    socailcont:{
        flexDirection: 'row',
        padding:wp('2%'),
        justifyContent:'space-evenly',
        width:wp('85%')
    },
    fbcont:{
        height:hp('7%'),
        width:wp('20%'),
        borderRadius:wp('3%'),
        justifyContent:'center',
        alignItems:'center',
    },
    fbwhite:{
        backgroundColor:'#fff',
        height:hp('2.5%'),
        width:wp('3.7%'),
        borderRadius:wp('5%'),
        position:'absolute',
        top:hp('2.5%'),      
    },

});
export default styles;