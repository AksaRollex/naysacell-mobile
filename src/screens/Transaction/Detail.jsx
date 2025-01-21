import {Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';

export default function DetailTransaction({route}) {
  const {item} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  console.log(item);

  const getPaymentStatusColor = payment_status => {
    if (payment_status === 'success') {
      return 'text-green-400';
    } else if (payment_status === 'pending') {
      return 'text-yellow-400';
    } else if (payment_status === 'failed') {
      return 'text-red-400';
    }
  };

  const getPaymentStatusText = payment_status => {
    switch (payment_status) {
      case 'success':
        return 'Berhasil';
      case 'pending':
        return 'Pending';
      case 'failed ':
        return 'Gagal';
      default:
        return 'Gagal';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'Pending':
        return 'text-yellow-400';
      case 'Gagal':
      case 'Failed ':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'success':
        return 'Berhasil';
      case 'Pending':
        return 'Pending';
      case 'Failed ':
        return 'Gagal';
      default:
        return 'Gagal';
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
                {item?.transaction_code}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Status Pesanan
              </Text>
              <Text
                className={`font-poppins-semibold text-end ${getStatusColor(
                  item.transaction_status,
                )}`}>
                {getStatusText(item.transaction_status)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Status Pembayaran
              </Text>
              <Text
                className={`font-poppins-semibold text-end ${getPaymentStatusColor(
                  item.payment_status,
                )}`}>
                {getPaymentStatusText(item.payment_status)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Nomor Tujuan
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_number}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Pesan
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_message}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Produk
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_product}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Total
              </Text>
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item?.transaction_total)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-md font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Tanggal Pembelian
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
