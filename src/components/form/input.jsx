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
  DARK_COLOR,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
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
        borderRadius: 12,
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        fontFamily: REGULAR_FONT,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        keyboardType={type ? type : 'default'}
        placeholder={placeholder}
        value={value}
        onChangeText={text => {
          const sanitizedText = text.replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 13);
          onChange(sanitizedText);
        }}
        className="h-12 w-full rounded-xl px-4 normal-case font-poppins-medium border-[0.5px] border-stone-600"
        style={{
          width: lebar ? lebar : '100%',
          color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
        }}>
          
        </TextInput>
      {value && value !== '' && (
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={onDelete}>
          <IonIcons
            name="close"
            size={20}
            color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
