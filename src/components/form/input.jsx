import {
  StyleSheet,
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  GREY_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {XClose} from '../../../assets';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function Input({
  value,
  placeholder,
  onChange,
  onDelete,
  type,
  lebar,
}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        fontFamily: REGULAR_FONT,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        keyboardType={type ? type : 'default'}
        placeholder={placeholder}
        placeholderTextColor={GREY_COLOR}
        value={value}
        onChangeText={onChange}
        style={{
          width: lebar ? lebar : '100%',
          paddingHorizontal: 10,
          fontFamily: 'Poppins-Regular',
          textTransform: 'capitalize',
        }}></TextInput>
       {value && value !== '' && ( // Ubah kondisi ini
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={onDelete}>
          <IonIcons name="close" size={20} color={GREY_COLOR} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
