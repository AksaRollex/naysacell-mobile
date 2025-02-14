import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  DARK_COLOR,
  LIGHT_COLOR,
  windowWidth,
  DARK_BACKGROUND,
  WHITE_BACKGROUND,
} from '../utils/const';
import IonIcons from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height;
export default function BottomModal({visible, onDismiss, title, children}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
      transparent={true}>
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
          height: windowHeight * 0.580, 
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
            alignItems: 'center',
          }}
          className="py-2 mb-4">
          <Text
            className="font-poppins-semibold text-lg text-start normal-case"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {title}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 0.001}}
            onPress={onDismiss}>
            <IonIcons
              name="close"
              size={27}
              color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
            />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
