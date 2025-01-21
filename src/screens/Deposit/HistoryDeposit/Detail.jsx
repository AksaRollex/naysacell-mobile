import {Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../utils/const';
import {rupiah} from '../../../libs/utils';

export default function DetailHistoryDeposit({route}) {
  const {item} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  console.log(item);

  const statusColor = status => {
    if (status === 'success') {
      return '#22c55e';
    } else if (status === 'pending') {
      return '#3b82f6';
    } else if (status === 'failed') {
      return '#ef4444';
    } else {
      return '#3b82f6';
    }
  };

  const textStatus = status => {
    if (status === 'success') {
      return 'Berhasil';
    } else if (status === 'pending') {
      return 'Pending';
    } else if (status === 'failed') {
      return 'Gagal';
    } else {
      return 'Pending';
    }
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View className="p-3">
        <View className="w-full p-3 rounded-xl bg-[#1c1c1c]  justify-between flex-col flex-wrap">
          <Text
            className="text-center font-poppins-semibold text-base uppercase"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Informasi Detail
          </Text>
          <View
            className="w-full p-3 rounded-xl flex-col mt-3 "
            style={{
              borderColor: '#464646',
              borderStyle: 'dashed',
              borderWidth: 1,
            }}>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Kode Transaksi
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.deposit_code}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Status Deposit
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: statusColor(item?.status)}}>
                {textStatus(item?.status)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Jumlah Deposit
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item?.amount)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Nomor Tujuan
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.user_number}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Tanggal Deposit
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {new Date(item?.created_at || '').toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
