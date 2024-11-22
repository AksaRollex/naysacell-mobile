import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
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
      <View className=" mx-auto my-5 items-center  ">
        <Text
          className="text-base text-center  my-2"
          style={{
            color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
            fontFamily: 'Poppins-SemiBold',
          }}>
          Cara Daftar Akun Di NAYSA CELL
        </Text>
        <View className="w-11/12 h-44  mt-2 p-2">
          <Text
            className="text-center mb-2 font-poppins-semibold"
            style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
            Berikut cara untuk daftar akun di NAYSA CELL
          </Text>
          <View className="space-y-2">
            <Text
              className="text-sm text-justify"
              style={{
                color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                fontFamily: 'Poppins-Regular',
              }}>
              1. Pertama klik dulu tombol daftar di halaman awal
            </Text>
            <Text
              className="text-sm text-justify"
              style={{
                color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                fontFamily: 'Poppins-Regular',
              }}>
              2. Lalu lengkapi form data
            </Text>
            <Text
              className="text-sm text-justify"
              style={{
                color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                fontFamily: 'Poppins-Regular',
              }}>
              3. Lalu klik tombol daftar
            </Text>
            <Text
              className="text-sm text-justify"
              style={{
                color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                fontFamily: 'Poppins-Regular',
              }}>
              4. Masukkan data yang telah kamu daftarkan di halaman login
            </Text>
            <Text
              className="text-sm text-justify"
              style={{
                color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                fontFamily: 'Poppins-Regular',
              }}>
              5. Klik tombol login
            </Text>
          </View>
        </View>
        <View className="w-11/12 h-20 mt-4 p-2  items-center justify-center">
          <Text className="text-center my-2 text-red-400 font-poppins-semibold">
            Jika masih kesulitan, bisa menghubungi nomor CS WA NAYSA CELL :
            {nomorCS}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
