import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {
  BOLD_FONT,
  DARK_BACKGROUND,
  WHITE_BACKGROUND,
  windowWidth,
} from '../utils/const';
import {XClose} from '../assets';

export default function BottomModal({visible, onDismiss, title, children}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
      transparent={true}
     >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></View>
      </TouchableWithoutFeedback>
      <View
        style={{
          height: '50%',
          backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
          width: windowWidth,
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 15,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: ' center ',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontFamily: BOLD_FONT, fontSize: 16, textAlign: 'center'}}>
            {title}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={onDismiss}>
            <XClose width={20} height={20} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
