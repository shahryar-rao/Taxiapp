import { View,TextInput,TouchableOpacity } from "react-native";
import { styles } from "../../global-styles/fillprofile.styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from "./themecontext";


export const DatePickerInput = ({ selectedDate, showDatePicker }) => {
    const theme = useTheme();
    
    return (
    <View style={[styles.inputcont, { backgroundColor: theme.colors.inputcolor, flexDirection: 'row' }]}>
        <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder='Date of Birth'
            placeholderTextColor={'#9E9EA0'}
            value={selectedDate}
            editable={false}
        />
        <TouchableOpacity style={styles.calendar} onPress={showDatePicker}>
            <MaterialCommunityIcons name="calendar-range-outline" size={24} color="#9E9EA0" />
        </TouchableOpacity>
    </View>
)};
