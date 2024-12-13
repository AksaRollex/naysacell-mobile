import {Image, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import { DARK_BACKGROUND, LIGHT_BACKGROUND } from '../../utils/const';

export default function Notifikasi() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View className="w-full h-full p-4" style={{ backgroundColor : isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND }}>
      <View className="my-1">
        <Text className="font-poppins-semibold text-white">29 Desember 2022</Text>
        <View className="w-full p-5 rounded-xl  bg-neutral-600 justify-between flex-row flex-wrap">
          <View className="w-1/5 justify-center items-center flex mr-2 ">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="w-20 h-20"
            />
          </View>
          <View className="w-3/5 ">
            <Text className="text-sm font-poppins-regular text-white">
              Pembelian Kamu Berhasil di BPJS Kesehatan !
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
