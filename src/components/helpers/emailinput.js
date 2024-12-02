import { View,TextInput,TouchableOpacity } from "react-native";
import { styles } from "../../global-styles/fillprofile.styles";
import { useTheme } from "./themecontext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const EmailInput = ({ selectedDate, showDatePicker, email, setEmail }) => {
    const theme = useTheme();
    
    return (
        <View style={[styles.inputcont, { backgroundColor: theme.colors.inputcolor, flexDirection: 'row' }]}>
        <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder='Email'
            placeholderTextColor={'#9E9EA0'}
            onChangeText={setEmail}
            value={email}
            editable={false}
        />
            <AntDesign name="mail" size={wp('6%')} color="#9E9EA0" style={styles.calendar}/>
    </View>
)};
