import {
  Text,
  TouchableOpacity,
  useColorScheme,
  Share,
  View,
} from 'react-native';
import React from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function DetailTransaction({route}) {
  const {item} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

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

  const shareTransaction = async () => {
    try {
      const shareMessage = `Detail Transaksi
Kode Transaksi: ${item?.transaction_code}
Produk: ${item?.transaction_product}
Total: ${rupiah(item?.transaction_total)}
Status Pesanan: ${getStatusText(item.transaction_status)}
Status Pembayaran: ${getPaymentStatusText(item.payment_status)}
Tanggal: ${new Date(item?.created_at || '').toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`;

      const result = await Share.share({
        message: shareMessage,
        title: 'Detail Transaksi',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error('Error sharing transaction:', error);
    }
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View className="p-3">
        <View
          className="w-full p-3 rounded-xl flex-col"
          style={{backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'}}>
          <View className="justify-center  flex-col items-center gap-y-2">
            <View
              className="p-3 rounded-full "
              style={{backgroundColor: isDarkMode ? '#242424' : '#ececec'}}>
              <IonIcons name="receipt" size={35} color={BLUE_COLOR} />
            </View>
            <Text
              className="text-center font-poppins-semibold text-xl uppercase"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {rupiah?.(item?.transaction_total)}
            </Text>
          </View>
          <View
            className="w-full p-3 rounded-xl flex-col mt-3 "
            style={{
              borderColor: '#464646',
              borderStyle: 'dashed',
              borderWidth: 1,
            }}>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Kode Transaksi
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_code}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
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
                className="text-sm font-poppins-regular"
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
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Nomor Tujuan
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_number}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Pesan
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_message}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Produk
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_product}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Total
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item?.transaction_total)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Tanggal Pembelian
              </Text>
              <Text
                className="text-sm font-poppins-regular"
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

      <View
        className="mx-3 rounded-t-2xl p-3"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}>
        <View className="items-center">
          <TouchableOpacity onPress={shareTransaction}>
            <View className=" items-center  justify-center">
              <View
                className="p-3 w-full rounded-2xl flex-row space-x-2  items-center justify-center "
                style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
                <IonIcons name="share-social" size={25} color={BLUE_COLOR} />
                <Text
                  className="text-sm capitalize font-poppins-medium "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Bagi bukti bayar
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
