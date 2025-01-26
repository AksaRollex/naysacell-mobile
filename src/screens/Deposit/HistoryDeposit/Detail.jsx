import {
  Text,
  useColorScheme,
  View,
  Share,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  BLUE_COLOR,
} from '../../../utils/const';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {rupiah} from '../../../libs/utils';

export default function DetailHistoryDeposit({route}) {
  const {item} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

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

  const shareTransaction = async () => {
    try {
      const shareMessage = `Detail Deposit
Kode Transaksi : ${item?.deposit_code}
Jumlah Deposit : ${rupiah(item?.amount)}
Nomor Tujuan  : ${item?.user_numbe}
Status Deposit : ${item.status}
Status Pembayaran : ${item?.payment_status || 'Pending'}
Tanggal Deposit : ${new Date(item?.created_at || '').toLocaleDateString(
        'id-ID',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      )}`;

      const result = await Share.share({
        message: shareMessage,
        title: 'Detail Transaksi',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
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
          className="w-full p-3 rounded-xl justify-between flex-col flex-wrap"
          style={{backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'}}>
          <View
            className="w-full p-3 rounded-xl flex-col"
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
                {item?.deposit_code}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Status Deposit
              </Text>
              <Text
                className="text-sm font-poppins-semibold"
                style={{color: statusColor(item?.status)}}>
                {textStatus(item?.status)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Jumlah Deposit
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item?.amount)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Nomor Tujuan
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.user_number}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Tanggal Deposit
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
