import {Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  windowHeight,
  windowWidth,
} from '../../utils/const';
import {ImageBackground} from 'react-native';
import {HeaderBG} from '../../../assets';
import {rupiah} from '../../libs/utils';
import ProductPaginate from '../../components/ProductPaginate';

export default function Transaction({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const [statusFilter, setStatusFilter] = useState('all');

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

  const transactionCard = ({item}) => {
    if (
      statusFilter !== 'all' &&
      item.transaction_status.toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return null;
    }

    return (
      <View>
        <Text
          value
          className="text-sm text-gray-300 capitalize font-poppins-regular">
          {new Date(item.transaction_date).toLocaleDateString(`id-ID`, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <TouchableOpacity
          className="rounded-xl p-2 flex-col mb-4"
          onPress={() => navigation.navigate('DetailTransaction' ,  { item })}
          style={{
            backgroundColor: isDarkMode ? '#262626' : WHITE_BACKGROUND,
            shadowColor: isDarkMode ? '#fff' : '#000',
          }}>
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
              Produk
            </Text>
            <Text
              className="text-md font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.transaction_product}
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
              {item.transaction_message}
            </Text>
          </View>
          <View className="flex-row justify-between items-center my-1 ">
            <Text
              className="text-md font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Harga
            </Text>
            <Text
              className="text-md font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {rupiah(item.transaction_total)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
        <View style={{padding: 20}}>
          <Text className="text-white font-poppins-semibold text-base  ">
            Histori Transaksi
          </Text>
        </View>
      </ImageBackground>

      <View className=" justify-center items-center flex">
        <View
          className="w-full p-6 flex-row justify-between flex-wrap"
          style={{height: windowHeight * 0.11}}>
          {/* Tombol Semua */}
          <TouchableOpacity
            onPress={() => setStatusFilter('all')}
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'all'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'all'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? DARK_COLOR
                    : LIGHT_COLOR,
              }}>
              Semua
            </Text>
          </TouchableOpacity>

          {/* Tombol Sukses */}
          <TouchableOpacity
            onPress={() => setStatusFilter('success')}
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'success'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'success'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? '#80ed80ff'
                    : BLUE_COLOR,
              }}>
              Berhasil
            </Text>
          </TouchableOpacity>

          {/* Tombol Pending */}
          <TouchableOpacity
            onPress={() => setStatusFilter('pending')}
            className="h-full rounded-md items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'pending'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'pending'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? '#FACC15'
                    : BLUE_COLOR,
              }}>
              Pending
            </Text>
          </TouchableOpacity>

          {/* Tombol Gagal */}
          <TouchableOpacity
            onPress={() => setStatusFilter('failed')}
            className="h-full rounded-md items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'Gagal'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'failed'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? '#ff746c'
                    : BLUE_COLOR,
              }}>
              Gagal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ProductPaginate
        url="/auth/histori"
        renderItem={transactionCard}
        ref={paginateRef}
        showSearch={false}
      />
    </View>
  );
}
