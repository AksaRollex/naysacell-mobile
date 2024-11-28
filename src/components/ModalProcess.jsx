import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {WHITE_BACKGROUND} from '../utils/const';

const baseRem = 16;
const rem = size => size * baseRem;
export default function ModalProcess({
  url,
  modalVisible,
  title,
  subTitle,
  buttonFalseText,
  buttonTrueText,
  functionTrueButton,
  functionFalseButton,
}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND},
          ]}>
          <LottieView source={url} autoPlay loop={true} style={styles.lottie} />
          <Text
            style={styles.successTextTitle}
            className="font-poppins-semibold my-2">
            {title}
          </Text>
          <Text style={styles.successText}>{subTitle}</Text>
          <View className="flex-row justify-between  w-full ">
            <TouchableOpacity
              className="bg-red-200  px-4 py-3 rounded-md"
              onPress={functionFalseButton}>
              <Text className="font-poppins-semibold text-red-600">
                {buttonFalseText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-200  px-4 py-3 rounded-md"
              onPress={functionTrueButton}>
              <Text className="font-poppins-semibold text-green-600">
                {buttonTrueText}
              </Text>
            </TouchableOpacity>
          </View>
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
  successTextTitle: isDarkMode => ({
    textAlign: 'center',
    color: isDarkMode ? 'white' : 'black',
  }),
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
    display: 'flex',
  },
  successText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
