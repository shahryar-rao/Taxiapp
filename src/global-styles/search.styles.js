import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    searchicon: {
        marginLeft: wp('2%'),
        alignSelf: 'center',
    },
    searchcont: {
        width: wp('85%'),
        marginTop: hp('2%'),
        flexDirection: 'row',
        height: hp('7%'),
        backgroundColor: '#1F222B',
        borderRadius: wp('5%'),
        alignItems: 'center',
        paddingLeft: wp('4%'),
    },
    Recent: {
        fontSize: wp('4%'),
        fontWeight: '600',
    },
    recentcont: {
        marginTop: hp('2%'),
        width: wp('85%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        height: hp('0.2%'),
        width: wp('85%'),
        marginTop: hp('2%'),
    },
    flatListContainer: {
        marginTop: hp('2%'),
        width: wp('85%'),
        paddingBottom: hp('2%'),
    },
    searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
    },
    searchText: {
        marginLeft: wp('4%'),
        fontSize: wp('4%'),
        marginBottom: hp('1%'),
    },
    emptyTexthead: {
        textAlign: 'center',
        marginTop: hp('5%'),
        fontSize: wp('5%'),
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: hp('5%'),
        fontSize: wp('4%'),
    },
    resultpic: {
        height: hp('40%'),
        width: wp('85%'),
        resizeMode: 'cover',
    },
    input: {
        height: hp('6%'),
        width: wp('65%'),
        paddingLeft:wp('4%'),
    },
});