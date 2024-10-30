import {StyleSheet, Text, View, useColorScheme, TextInput} from 'react-native';
import React from 'react';
import {
  SLATE_COLOR,
  WHITE_COLOR,
  LIGHT_COLOR,
  LIGHT_BACKGROUND
} from '../../../utils/const';

export default function ProfileForm() {
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
          placeholder="Aksa Rollcake"
          label="name"
          editable={false}
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
          placeholder="ramsimw8@gmail.com"
          label="email"
          editable={false}
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
          placeholder="085336970707"
          label="phone"
          editable={false}
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
          placeholder="Sambiarum LOR VIII / 2 Blok 54E / 2"
          label="alamat"
          editable={false}
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
    </View>
  );
}

const styles = StyleSheet.create({});
