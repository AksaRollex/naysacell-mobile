import {StyleSheet, Text, useColorScheme, View, Image} from 'react-native';
import React, {useRef} from 'react';
import Paginate from '../../../components/Paginate';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../utils/const';
import {MenuView} from '@react-native-menu/menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rupiah} from '../../../libs/utils';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useQueryClient} from '@tanstack/react-query';
import {useDelete} from '../../../hooks/useDelete';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function Order({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const backgroundColorOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'bg-blue-100';
    } else if (order_status === 'success') {
      return 'bg-green-100';
    } else if (order_status === 'processing') {
      return 'bg-yellow-100';
    } else if (order_status === 'failed') {
      return 'bg-red-100';
    } else {
      return 'bg-blue-100';
    }
  };

  const textColorOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'text-blue-500';
    } else if (order_status === 'success') {
      return 'text-green-500';
    } else if (order_status === 'processing') {
      return 'text-yellow-500';
    } else if (order_status === 'failed') {
      return 'text-red-500';
    } else {
      return 'text-blue-500';
    }
  };

  const textOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'Pending';
    } else if (order_status === 'success') {
      return 'Sukses';
    } else if (order_status === 'processing') {
      return 'Dalam Proses';
    } else if (order_status === 'failed') {
      return 'Gagal';
    } else {
      return 'Pending';
    }
  };

  const colorOrderStatus = order_status => {
    if (order_status === 'pending') {
      return '#3b82f6';
    } else if (order_status === 'success') {
      return '#22c55e';
    } else if (order_status === 'processing') {
      return '#eab308';
    } else if (order_status === 'failed') {
      return '#ef4444';
    } else {
      return '##3b82f6';
    }
  };

  const queryClient = useQueryClient();

  const {
    delete: deleteOrder,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  } = useDelete({
    onSuccess: () => {
      queryClient.invalidateQueries('/master/order');
      navigation.navigate('Order');
    },
    onError: error => {
      console.log(error);
    },
  });

  const orderCards = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormOrder', {id: item.id}),
      },
      {
        id: 'Hapus',
        title: 'Hapus',
        action: item => deleteOrder(`/master/order/delete/${item.id}`),
      },
    ];
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
            <View className="flex-row  items-center justify-center gap-x-2 ">
              <View
                className="items-center justify-center"
                style={{
                  backgroundColor: isDarkMode ? '#242424' : '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <FontAwesome5Icon
                  name="cart-arrow-down"
                  size={25}
                  color={BLUE_COLOR}
                />
              </View>
              <View className="flex-col  w-64 items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.customer_name}
                </Text>

                <View className="flex-row gap-x-2">
                  <View className="bg-red-100 rounded-md pl-2    mt-1 justify-center  items-center flex-row  py-1 max-w-[190px]">
                    <IonIcons name="cart" color="#f43f5e" size={15} />
                    <Text
                      className="font-poppins-regular text-xs mx-2"
                      style={{color: '#f43f5e'}}>
                      {item?.product_name}
                    </Text>
                  </View>

                  <View className="flex-row ">
                    <View
                      className={`rounded-md pl-2 mt-1 justify-center items-center flex-row py-1 max-w-[120px] ${backgroundColorOrderStatus(
                        item?.order_status,
                      )}`}>
                      <IonIcons
                        name="wallet"
                        color={colorOrderStatus(item?.order_status)}
                        size={17}
                      />

                      <Text
                        className={`font-poppins-medium text-xs mx-2 ${textColorOrderStatus(
                          item?.order_status,
                        )}`}>
                        {textOrderStatus(item?.order_status)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row gap-x-2">
                  <View className="bg-green-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[130px]">
                    <IonIcons name="call" color="#658844" size={15} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#658844]">
                      {item?.customer_no}
                    </Text>
                  </View>
                  <View className="flex-row ">
                    <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                      <IonIcons name="pricetag" color="#138EE9" size={17} />
                      <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                        {rupiah(item?.product_price)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <MenuView
              title="Menu Title"
              actions={dropdownOptions.map(option => ({
                ...option,
              }))}
              onPressAction={({nativeEvent}) => {
                const selectedOption = dropdownOptions.find(
                  option => option.title === nativeEvent.event,
                );
                if (selectedOption) {
                  selectedOption.action(item);
                }
              }}
              shouldOpenOnLongPress={false}>
              <View className="p-1 justify-end rounded-full items-start bg-stone-200">
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color="black"
                  size={20}
                />
              </View>
            </MenuView>
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
      <View
        className="rounded-lg "
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}></View>
      <Paginate url="/master/order" ref={paginateRef} renderItem={orderCards} />

      <DeleteConfirmationModal />
      <SuccessOverlayModal />
      <FailedOverlayModal />
    </View>
  );
}

const styles = StyleSheet.create({});
