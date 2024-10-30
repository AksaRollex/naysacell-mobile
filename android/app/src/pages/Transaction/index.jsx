import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  windowHeight,
  windowWidth,
} from '../../utils/const';
import {ImageBackground} from 'react-native';
import {HeaderBG} from '../../assets';

export default function Transaction() {
  const isDarkMode = useColorScheme() === 'dark';
  const card = [1, 2, 3, 4];
  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <ImageBackground
        source={HeaderBG}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
        }}>
        <Text className="text-white font-bold text-base font-sans mx-6 my-5">
          Histori Transaksi
        </Text>
      </ImageBackground>
      <View className="-mt-16 justify-center items-center flex">
        {/* <Text
          className="font-sans font-bold text-lg"
          style={{color: isDarkMode ? DARK_COLOR : DARK_COLOR}}>
          Pilih Status Transaksi
        </Text> */}
        <View
          className=" w-full p-6 flex-row  justify-between flex-wrap"
          style={{height: windowHeight * 0.11}}>
          <TouchableOpacity
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.4,
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-bold text-base font-sans"
              style={{color: isDarkMode ? BLUE_COLOR : BLUE_COLOR}}>
              Sukses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="h-full  rounded-md items-center justify-center"
            style={{
              width: windowWidth * 0.4,
              backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-bold text-base font-sans"
              style={{color: isDarkMode ? BLUE_COLOR : BLUE_COLOR}}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="px-6 " id="scroll">
        {card.map((item, index) => {
          return (
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
                    Pulsa
                  </Text>
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
              <View id="cardTitle" className="flex-row  justify-between py-3">
                <View className="flex-col justify-start items-start">
                  <Text
                    className="font-bold font-sans"
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Kode Transaksi : 12345
                  </Text>
                  <Text
                    className="font-bold font-sans"
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Provider : Telkomsel
                  </Text>
                  <Text
                    className="font-bold font-sans"
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Produk : Telkomsel 5000
                  </Text>
                  <Text
                    className="font-bold font-sans"
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Nomor Tujuan : 085336970707
                  </Text>
                  <Text
                    className="font-bold font-sans"
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Total Harga : Rp. 100.000,00
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
