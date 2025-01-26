import {Text, View, useColorScheme} from 'react-native';
import React, {useRef} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  BLUE_COLOR,
} from '../../../../utils/const';
import Paginate from '../../../../components/Paginate';
import {rupiah} from '../../../../libs/utils';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function LaporanDeposit({}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const backgroundColor = status => {
    if (status === 'success') {
      return 'bg-green-100';
    } else if (status === 'pending') {
      return 'bg-blue-100';
    } else if (status === 'failed') {
      return 'bg-red-100';
    } else {
      return 'bg-gray-100';
    }
  };
  const textColor = status => {
    if (status === 'success') {
      return 'text-green-600';
    } else if (status === 'pending') {
      return 'text-blue-500';
    } else if (status === 'failed') {
      return 'text-red-500';
    } else {
      return 'text-gray-600';
    }
  };

  const text = status => {
    if (status === 'success') {
      return 'Berhasil';
    } else if (status === 'pending') {
      return 'Pending';
    } else if (status === 'failed') {
      return 'Gagal';
    }
  };
  const LaporanCards = ({item}) => {
    return (
      <View
        className="w-full p-2 flex-col  rounded-lg mt-4"
        style={{
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
        }}>
        <View className="flex-row w-full  my-2 justify-center ">
          <View className="w-full flex-row justify-between items-start">
            <View className="flex-row  items-center justify-start gap-x-2 ">
              <View
                className="items-center justify-center"
                style={{
                  backgroundColor: isDarkMode ? '#242424' : '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <IonIcons name="receipt" size={25} color={BLUE_COLOR} />
              </View>
              <View className="flex-col items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.user_name}
                </Text>
                <Text
                  className="font-poppins-regular text-sm "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.deposit_code}
                </Text>
                <View className="flex-row justify-center items-center gap-x-2">
                  <View className="bg-green-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                    <IonIcons name="call" color="#658844" size={15} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#658844]">
                      {item?.user_number}
                    </Text>
                  </View>
                  <View className="bg-gray-100 rounded-md pl-2    mt-1 justify-center  items-center flex-row  py-1 max-w-[190px]">
                    <IonIcons name="today" color="#2f2f2f" size={15} />
                    <Text
                      className="font-poppins-regular text-xs mx-2"
                      style={{color: '#2f2f2f'}}>
                      {new Date(item.created_at).toLocaleDateString(`id-ID`, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-x-2">
                  <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                    <IonIcons name="pricetag" color="#138EE9" size={15} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                      {rupiah(item?.amount)}
                    </Text>
                  </View>
                  <View
                    className={`rounded-md  justify-center items-center flex-row mt-1 py-1 gap-x-2 ${backgroundColor(
                      item?.status,
                    )}`}>
                    {item?.status === 'success' ? (
                      <IonIcons
                        name="checkmark-done-sharp"
                        color="#4caf50"
                        size={15}
                      />
                    ) : item?.status === 'failed' ? (
                      <IonIcons name="close" color="#138EE9" size={15} />
                    ) : (
                      <IonIcons name="information" color="#138EE9" size={15} />
                    )}
                    <Text
                      className={`font-poppins-medium text-xs mx-2  ${textColor(
                        item?.status,
                      )}`}>
                      {text(item?.status)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
      <Paginate
        url="/auth/histori-deposit-web"
        ref={paginateRef}
        renderItem={LaporanCards}
      />
    </View>
  );
}
