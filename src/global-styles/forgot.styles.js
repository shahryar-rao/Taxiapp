import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
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
        marginLeft: wp('-25%')
    },
    arrow: {

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
    buttontext: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#000'
    },
    image: {
        height: hp('35%'),
        width: wp('75%'),
        marginTop: hp('2%'),

    },
    text: {
        fontSize: wp('4%'),
        width: wp('85%'),
        marginTop: hp('2%')
    },
    smscont: {
        flexDirection: 'row',
        borderWidth: 1, // Optional, to keep the layout intact even without selection
        borderColor: 'transparent',
        height: hp('13%'),
        width: wp('85%'),
        marginTop: hp('2%'),
        borderRadius: wp('5%'),
        alignItems: 'center',
    },
    circle: {
        height: hp('10%'),
        width: hp('10%'),
        borderRadius: wp('10%'),
        marginLeft: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    sms: {
        color: '#ACADB2',
        fontSize: wp('3.5%')
    },
    number: {
        fontSize: wp('3.5%'),
    },
    selectedBorder: {
        borderColor: '#FFC12E',
        borderWidth: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: '80%',
        padding: wp('3%'),
        borderRadius: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginVertical: hp('1%'),
        marginBottom:hp('2%'),
        color: '#FFC12E',
    },
    input: {
        height:hp('7%'),
        width: wp('70%'),
        marginBottom: hp('3%'),
        paddingHorizontal:wp('2%'),
        borderRadius:wp('3%'),

    },
    closeButton: {
        backgroundColor: '#FFC12E',
        paddingVertical: hp('1.5%'),
        paddingHorizontal:wp('5%') ,
        borderRadius: wp('2%')
    },
    buttonText: {
        fontSize: wp('3.5%')
    }
});

export default styles;