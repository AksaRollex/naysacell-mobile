import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {DARK_COLOR, GREY_COLOR, LIGHT_COLOR, WHITE_BACKGROUND} from '../../../utils/const';

export default function HistoryDeposit() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <TouchableOpacity
        id="cardTransaction"
        className="  rounded-md p-3 flex-col mb-5"
        style={{
          backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
          elevation: 3,
          shadowColor: isDarkMode ? '#fff' : '#000',
        }}>
        <View
          id="cardTitle"
          className="flex-row  justify-between border-b py-3"
          style={{borderColor: isDarkMode ? GREY_COLOR : LIGHT_COLOR}}>
          <View className="flex-col justify-start items-start">
            <Text
              className="font-bold font-sans"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              18 September 2022
            </Text>
          </View>
          <View className="flex justify-end items-end">
            <Text className="font-bold font-sans text-end text-green-400">
              Sukses
            </Text>
          </View>
        </View>
        <View className="flex-col justify-start items-start py-3">
          <Text
            className="font-bold font-sans"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Metode Pembayaran : BNI
          </Text>
          <Text
            className="font-bold font-sans"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Jumlah Deposit : Rp. 100.000,00
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
