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
  BLUE_COLOR,
  DARK_BACKGROUND,
  GREY_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  windowWidth,
} from '../../utils/const';
import {rupiah} from '../../utils/utils';
import HistoryDeposit from './HistoryDeposit';

export default function Deposit() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View>
        <View className="px-4 py-2 ">
          <TextInput
            label="deposit"
            placeholder="Nominal Deposit"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600"></TextInput>
        </View>
        {/* // REFERENSI NOMINAL */}
        <View
          id="referensi_nominal"
          className="px-4 py-2 flex flex-row flex-wrap justify-between items-center">
          <TouchableOpacity
            className="px-1 py-4  rounded-md justify-center items-center"
            style={{
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
              width: windowWidth * 0.3,
            }}>
            <Text>{rupiah(10000)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-1 py-4 w-1/3 rounded-md justify-center items-center"
            style={{
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
              width: windowWidth * 0.3,
            }}>
            <Text>{rupiah(20000)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-1 py-4 w-1/3 rounded-md justify-center items-center"
            style={{
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
              width: windowWidth * 0.3,
            }}>
            <Text>{rupiah(30000)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-1 py-4 mt-3  rounded-md justify-center items-center"
            style={{
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
              width: windowWidth * 0.3,
            }}>
            <Text>{rupiah(10000)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-1 py-4 w-1/3 rounded-md justify-center items-center"
            style={{
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
              width: windowWidth * 0.3,
            }}>
            <Text>{rupiah(20000)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-1 py-4 w-1/3 rounded-md justify-center items-center"
            style={{
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
              width: windowWidth * 0.3,
            }}>
            <Text>{rupiah(30000)}</Text>
          </TouchableOpacity>
        </View>
        <View className="px-4 py-2 ">
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.buttonLabel}>Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* HISTORI */}
      <View className="px-4 py-2 mt-11">
        <View className="my-2">
          <Text>Histori Deposit</Text>
        </View>
        <HistoryDeposit />
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
