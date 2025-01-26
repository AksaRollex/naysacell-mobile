import {Text, View, Modal, useColorScheme} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { DARK_COLOR, LIGHT_COLOR, WHITE_COLOR } from '../utils/const';
export default function ModalAfterProcess({
  modalVisible,
  title,
  subTitle,
  icon,
  iconColor,
  iconSize,
  bgIcon,
}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        className="flex-1 justify-center items-center "
        style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
        <View
          className="w-80 rounded-2xl p-4 items-start shadow-2xl"
          style={{backgroundColor : isDarkMode ? '#262626' : '#ececec'}}>
          <View
            className={`w-12 h-12 rounded-full justify-center items-center `}
            style={{backgroundColor: bgIcon || '#fef2f2'}}>
            <IonIcons size={iconSize || 25} color={iconColor || '#95bb72'} name={icon} />
          </View>
          <Text className="text-base my-1 capitalize font-poppins-semibold" style={{ color : isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
            {title}
          </Text>
          <Text className="text-sm text-start capitalize font-poppins-regular" style={{ color : isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
            {subTitle}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
