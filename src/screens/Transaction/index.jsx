import {useColorScheme, View, Text, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';
import Paginate from '../../components/Paginate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Transaction({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

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
    return (
      <>
        <View className="ms-2 w-full  px-2">
          <Text
            className="font-poppins-regular text-[13px]  capitalize"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {new Date(item?.created_at || '').toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <View
          className="w-full p-2 flex-col  rounded-xl mb-4"
          style={{backgroundColor: isDarkMode ? '#232323' : '#f9f9f9'}}>
          <View className="rounded-xl  w-full p-2 flex-row items-center justify-between ">
            <View
              className="items-center justify-center"
              style={{
                backgroundColor: isDarkMode ? '#242424' : '#fff',
                width: 50,
                height: 50,
                borderRadius: 25,
              }}>
              <MaterialIcons
                name="shopping-cart"
                size={25}
                color={BLUE_COLOR}
              />
            </View>
            <View className="flex-col items-end">
              <Text
                className={`font-poppins-semibold text-end ${getStatusColor(
                  item.transaction_status,
                )}`}>
                {getStatusText(item.transaction_status)}
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item.transaction_product}
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item.transaction_total)}
              </Text>
              <TouchableOpacity
                className="flex-row mt-2 items-end"
                onPress={() =>
                  navigation.navigate('DetailTransaction', {item})
                }>
                <Text
                  value
                  className="text-xs font-poppins-regular "
                  style={{color: isDarkMode ? SLATE_COLOR : SLATE_COLOR}}>
                  Ketuk Untuk Melihat Detail
                </Text>
                <MaterialCommunityIcons
                  name="chevron-double-right"
                  size={17}
                  color={isDarkMode ? SLATE_COLOR : SLATE_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      className="w-full h-full py-4"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <Paginate
        url="/auth/histori"
        renderItem={transactionCard}
        ref={paginateRef}
        showSearchSkeleton={false}
        showPaginationInfo={false}
        showListFooter={false}
        showSearch={false}
      />
    </View>
  );
}
