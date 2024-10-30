import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_COLOR, 
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
export default function BantuanLogin() {
  const isDarkMode = useColorScheme() === 'dark';

  const nomorCS = ' 08123456789';

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <View
        className="w-10/12 h-80 mx-auto rounded-sm my-5 items-center bg-slate-400 "
        style={{backgroundColor: isDarkMode ? '#404040' : '#e8e8e8'}}>
        <Text
          className="font-sans text-sm text-center font-bold  my-2"
          style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
          Cara Daftar Akun Di NAYSA CELL
        </Text>
        <View className="w-11/12 h-44  mt-2 p-2">
          <Text
            className="text-center mb-2 font-bold"
            style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
            Berikut cara untuk daftar akun di NAYSA CELL
          </Text>
          <View>
            <Text
              className="font-sans text-sm text-justify"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
              1. Pertama klik dulu tombol daftar di halaman awal
            </Text>
            <Text
              className="font-sans text-sm text-justify"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
              2. Lalu lengkapi form data
            </Text>
            <Text
              className="font-sans text-sm text-justify"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
              3. Lalu klik tombol daftar
            </Text>
            <Text
              className="font-sans text-sm text-justify"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
              4. Masukkan data yang telah kamu daftarkan di halaman login
            </Text>
            <Text
              className="font-sans text-sm text-justify"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR }}>
              5. Klik tombol login
            </Text>
          </View>
        </View>
        <View className="w-11/12 h-20 mt-4 p-2  items-center justify-center">
          <Text className="text-center my-2 font-bold text-red-500">
            Jika masih kesulitan, bisa menghubungi nomor CS WA NAYSA CELL :
            {nomorCS}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
