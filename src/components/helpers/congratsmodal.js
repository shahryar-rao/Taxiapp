import React from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from './themecontext';

const CongratsModal = ({ visible, onClose }) => {
  const theme = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
            <View style={[styles.modalView, { backgroundColor: theme.colors.inputcolor }]}>
              <Image source={require('../../../assets/congrats.png')} style={styles.congratsimage} />
              <Text style={styles.congratsText}>Congratulations! </Text>
              <Text style={[styles.modalMessage, { color: theme.colors.text }]}>
                Your account is ready to use. You will be redirected to the Login page in a few seconds.
              </Text>
              <Image source={require('../../../assets/loader.png')} style={{ height: hp('12%'), width: wp('16%') }} />
            </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp('80%'),
  },
  congratsText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFC12E',
  },
  modalMessage: {
    fontSize: wp('4%'),
    marginBottom: 20,
    textAlign: 'center',
  },
  congratsimage: {
    width: wp('60%'),
    height: hp('30%'),
  },
});

export default CongratsModal;
