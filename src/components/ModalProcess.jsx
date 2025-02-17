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
import {
  DARK_COLOR,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../utils/const';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ModalProcess({
  modalVisible,
  title,
  subTitle,
  buttonFalseText,
  buttonTrueText,
  functionTrueButton,
  functionFalseButton,
  iconColor,
  iconName,
  iconSize,
  bgIcon,
  bgTrueText,
  bgFalseText,
  buttonFalseColorText,
  buttonTrueColorText,
}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View
          className="w-80 p-4"
          style={[
            styles.modalContent,
            {backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND},
          ]}>
          <View
            className={`w-12 h-12 rounded-full  justify-center items-center bg-${bgIcon}`}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
          </View>
          {/* <LottieView source={url} autoPlay loop={true} style={styles.lottie} /> */}
          <Text
            style={styles.successTextTitle(isDarkMode)}
            className="text-base my-1  normal-case font-poppins-semibold ">
            {title}
          </Text>
          <Text
            className="text-sm text-start normal-case mb-4 font-poppins-regular"
            style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
            {subTitle}
          </Text>
          <View className="flex-col justify-center items-center gap-y-2 w-full ">
            <TouchableOpacity
              className={`px-4 py-3 w-full rounded-xl
              `}
              style={{backgroundColor: bgTrueText || '#F43F5E'}}
              onPress={functionTrueButton}>
              <Text
                className="font-poppins-semibold normal-case text-center"
                style={{color: buttonTrueColorText || WHITE_COLOR}}>
                {buttonTrueText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-full py-3 rounded-xl items-center`}
              style={{backgroundColor: bgFalseText || '#fff'}}
              onPress={functionFalseButton}>
              <Text
                className="font-poppins-semibold normal-case text-center"
                style={{color: buttonFalseColorText || '#F43F5E'}}>
                {buttonFalseText}
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
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
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
    alignItems: 'start',
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
