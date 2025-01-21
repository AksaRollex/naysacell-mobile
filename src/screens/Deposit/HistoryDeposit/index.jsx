import {
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function HistoryDeposit() {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();
  const navigation = useNavigation();

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
      <TouchableOpacity id="cardTransaction" onPress={() => navigation.navigate('DetailHistoryDeposit', {item})}>
        <Text className="font-poppins-regular text-sm text-gray-300 capitalize">
          {new Date(item?.created_at || '').toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <View
          className="rounded-xl p-2 flex-col mb-4"
          style={{
            backgroundColor: isDarkMode ? '#262626' : WHITE_BACKGROUND,
            shadowColor: isDarkMode ? '#fff' : '#000',
          }}>
          <View
            id="cardTitle"
            className="flex-row  justify-between items-center"
            style={{borderColor: isDarkMode ? GREY_COLOR : LIGHT_COLOR}}>
            <Text
              className="font-poppins-semibold"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Jumlah Deposit : {rupiah(item?.amount || 0)}
            </Text>

            <MaterialCommunityIcons
              name="transfer"
              color={colorStatusColor(item?.status)}
              size={27}
            />
          </View>
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
