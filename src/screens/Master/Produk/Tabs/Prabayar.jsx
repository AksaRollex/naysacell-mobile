import {Image, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useRef} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../../utils/const';
import Paginate from '../../../../components/Paginate';
import {MenuView} from '@react-native-menu/menu';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rupiah} from '../../../../libs/utils';
export default function Prabayar() {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const prabayarCards = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormUser', {id: item.id}),
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
            <View className="flex-row  items-start gap-x-2 ">
              <Image
                source={require('../../../../../assets/images/logo.png')}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-col items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.product_name}
                </Text>
                <Text
                  className="font-poppins-regular text-sm "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.product_desc}
                </Text>
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
        <View
          className="border-[0.5px] w-full my-2 opacity-40 rounded-es-xl"
          style={{borderColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}></View>
        <View className="flex-row w-full justify-between items-center my-2">
          <View className="w-1/2 gap-x-2 flex-row items-center justify-start">
            <IonIcons
              name="pricetag"
              color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              size={17}
            />
            <Text
              className="font-poppins-regular text-sm "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {rupiah(item?.product_seller_price)}
            </Text>
          </View>
          <View
            className="border-[0.5px] h-7 w-[0.3px] opacity-40"
            style={{borderColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}></View>
          <View className="w-1/2  gap-x-2 flex-row items-center justify-start">
            <IonIcons
              name="pricetag"
              color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              size={17}
            />
            <Text
              className="font-poppins-regular text-sm "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {rupiah(item?.product_buyer_price)}
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
      <Paginate
        url="/master/product/prepaid"
        ref={paginateRef}
        renderItem={prabayarCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
