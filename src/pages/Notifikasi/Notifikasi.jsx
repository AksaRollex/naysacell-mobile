import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BPJSIkon} from '../../../assets';

export default function Notifikasi() {
  return (
    <View className="w-full h-full p-4">
      <View className="my-1">
        <Text className="font-poppins-semibold">29 Desember 2022</Text>
        <View className="w-full p-5 rounded-xl  bg-[#c8e8b8] justify-between flex-row flex-wrap">
          <View className="w-1/5 justify-center items-center flex mr-2 ">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="w-20 h-20"
            />
          </View>
          <View className="w-3/5 ">
            <Text className="text-sm font-poppins-regular">
              Pembelian Kamu Berhasil di BPJS Kesehatan !
            </Text>
          </View>
        </View>
      </View>

      <View className="my-1">
        <Text className="font-poppins-semibold">29 Desember 2022</Text>
        <View className="w-full p-5 rounded-xl  bg-[#eeb9b9] justify-between flex-row flex-wrap">
          <View className="w-1/5 justify-center items-center flex mr-2 ">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="w-20 h-20"
            />
          </View>
          <View className="w-3/5 ">
            <Text className="text-sm font-poppins-regular">
              Pembelian Kamu Berhasil di BPJS Kesehatan !
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
