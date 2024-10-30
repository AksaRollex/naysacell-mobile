import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  SLATE_COLOR,
  WHITE_COLOR,
  LIGHT_COLOR,
  LIGHT_BACKGROUND,
  WHITE_BACKGROUND,
  REGULAR_FONT,
  BLUE_COLOR,
} from '../../../utils/const';

export default function ProfileFormEdit({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      className="py-2 w-full h-full "
      style={{backgroundColor: isDarkMode ? '#18181B' : LIGHT_BACKGROUND}}>
      <View className="px-4 py-2 ">
        <Text
          className="font-sans font-base font-bold my-1"
          style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
          Nama Lengkap
        </Text>
        <TextInput
          value="Aksa Rollcake"
          label="name"
          placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
          className="h-12 w-full mx-auto  px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600"></TextInput>
      </View>
      <View className="px-4 py-2 ">
        <Text
          className="font-sans font-base font-bold my-1"
          style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
          Email
        </Text>
        <TextInput
          value="ramsimw8@gmail.com"
          label="email"
          placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
          className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600"></TextInput>
      </View>
      <View className="px-4 py-2 ">
        <Text
          className="font-sans font-base font-bold my-1"
          style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
          Nomor Telepon
        </Text>
        <TextInput
          value="085336970707"
          label="phone"
          placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
          className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ]  rounded-md border border-stone-600"></TextInput>
      </View>
      <View className="px-4 py-2 ">
        <Text
          className="font-sans font-base font-bold my-1"
          style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
          Alamat Lengkap
        </Text>
        <TextInput
          value="Sambiarum LOR VIII / 2 Blok 54E / 2"
          label="alamat"
          placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
          className="h-12 w-full  mx-aut px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600"></TextInput>
      </View>
      <View className="px-4 py-2 ">
        <Text
          className="font-sans font-base font-bold my-1"
          style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
          Tanggal Pendaftaran
        </Text>
        <TextInput
          placeholder="2022-01-01"
          label="register_date"
          editable={false}
          placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
          className="h-12 w-full  mx-aut px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600"></TextInput>
      </View>
      <View className="px-4 py-2 ">
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate("Profil")}>
          <Text style={styles.buttonLabel}>Perbarui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: REGULAR_FONT,
  },
  bottom: isDarkMode => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    padding: 10,
  }),
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
});
