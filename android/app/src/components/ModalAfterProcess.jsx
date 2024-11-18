import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const baseRem = 16;
const rem = size => size * baseRem;
export default function ModalAfterProcess({
  url,
  modalVisible,
  title,
  subTitle,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LottieView source={url} autoPlay loop={true} style={styles.lottie} />
          <Text
            style={styles.successTextTitle}
            className="font-poppins-semibold my-2">
            {title}
          </Text>
          <Text style={styles.successText}>{subTitle}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 250,
    height: 250,
  },
  successTextTitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: rem(1.3),
  },
  successText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
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
    width: '80%',
    maxWidth: 400,
  },
  successText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
