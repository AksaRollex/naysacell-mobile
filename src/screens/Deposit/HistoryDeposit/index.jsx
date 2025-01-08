import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
} from '../../../utils/const';
import ProductPaginate from '../../../components/ProductPaginate';
import {rupiah} from '../../../libs/utils';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function HistoryDeposit() {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const backgroundColorTextStatus = status => {
    if (status === 'success') {
      return 'bg-green-100';
    } else if (status === 'pending') {
      return 'bg-yellow-100';
    } else if (status === 'failed') {
      return 'bg-red-100';
    } else {
      return 'bg-gray-100';
    }
  };

  const textStatus = status => {
    if (status === 'success') {
      return 'Sukses';
    } else if (status === 'pending') {
      return 'Menunggu';
    } else if (status === 'failed') {
      return 'Gagal';
    } else {
      return 'Menunggu';
    }
  };

  const textStatusColor = status => {
    if (status === 'success') {
      return 'text-green-500';
    } else if (status === 'pending') {
      return 'text-yellow-500';
    } else if (status === 'failed') {
      return 'text-red-500';
    } else {
      return 'text-gray-500';
    }
  };

  const colorStatusColor = status => {
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

  const historiDepositCards = ({item}) => {
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
              className="font-poppins-semibold capitalize"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {new Date(item?.created_at || '').toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </Text>
          </View>
          <View
            className={`rounded-md justify-center items-center flex-row px-2 py-1 gap-x-1 max-w-[120px] ${backgroundColorTextStatus(
              item?.status,
            )}`}>
            <IonIcons
              name="wallet"
              color={colorStatusColor(item?.status)}
              size={17}
            />
            <Text
              className={`font-poppins-semibold text-end ${textStatusColor(
                item?.status,
              )}`}>
              {textStatus(item?.status)}
            </Text>
          </View>
        </View>
        <View className="flex-col justify-start items-start py-3">
          <Text
            className="font-poppins-regular"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Metode Pembayaran : Statis
          </Text>
          <Text
            className="font-poppins-regular"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Jumlah Deposit : {rupiah(item?.amount || 0)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="w-full h-full">
      <ProductPaginate
        url="/auth/histori-deposit"
        renderItem={historiDepositCards}
        ref={paginateRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
