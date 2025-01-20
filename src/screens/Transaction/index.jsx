import {Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import React, {useRef, useState} from 'react';
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
import {HeaderBG} from '../../../assets';
import {rupiah} from '../../libs/utils';
import Paginate from '../../components/Paginate';

export default function Transaction() {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const [statusFilter, setStatusFilter] = useState('all');

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
      case 'Gagal':
      case 'Failed ':
        return 'Gagal';
      default:
        return 'Gagal';
    }
  };

  const transactionCard = ({item}) => {
    console.log(item, 111);
    if (
      statusFilter !== 'all' &&
      item.transaction_status.toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return null;
    }

    return (
      <View
        id="cardTransaction"
        className="rounded-md w-full p-3 flex-col mb-4"
        style={{
          backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
          elevation: 3,
          shadowColor: isDarkMode ? '#fff' : '#000',
        }}>
        <View
          id="cardTitle"
          className="flex-row justify-between border-b py-3"
          style={{borderColor: isDarkMode ? GREY_COLOR : LIGHT_COLOR}}>
          <View className="flex-col justify-start items-start">
            <Text
              className="font-poppins-semibold"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.transaction_code}
            </Text>
          </View>
          <View className="flex justify-end items-end">
            <Text
              className={`font-poppins-semibold text-end ${getStatusColor(
                item.transaction_status,
              )}`}>
              {getStatusText(item.transaction_status)}
            </Text>
          </View>
        </View>
        <View id="cardTitle" className="flex-row  justify-between py-3">
          <View className="flex-col justify-start items-start">
            <Text
              value
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Tanggal Transaksi :{' '}
              {new Date(item.transaction_date).toLocaleDateString(`id-ID`, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Produk : {item.transaction_product}
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Nomor Tujuan : {item.transaction_number}
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Harga : {rupiah(item.transaction_total)}
            </Text>
          </View>
        </View>
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
              Sukses
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

      <Paginate
        url="/auth/histori"
        renderItem={transactionCard}
        ref={paginateRef}
        showSearch={false}
      />
    </View>
  );
}
