import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent:'space-between',
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
    text:{
        fontSize:wp('4%'),
        width:wp('78%'),
        textAlign:'center',
        color:'#9E9EA0',
        marginTop:hp('3%')
    },
    image:{
        width:wp('80%'),
        height:hp('45%'),
    },
    middlecont:{
        marginTop:hp('5%')
    },
    buttonscont:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:wp('85%'),
        marginTop:hp('14%'),
    },
    button:{
        height:hp('6%'),
        width:wp('40%'),
        borderRadius:wp('7%'),
        alignItems:'center',
        justifyContent:'center',
    },
    text1:{
        
    },
});