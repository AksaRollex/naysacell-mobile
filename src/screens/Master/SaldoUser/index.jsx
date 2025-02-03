import {Text, View, useColorScheme} from 'react-native';
import React, {useRef} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../utils/const';
import Paginate from '../../../components/Paginate';
import {MenuView} from '@react-native-menu/menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {rupiah} from '../../../libs/utils';

export default function SaldoUser({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const usersCard = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormSaldoUser', {id: item.id}),
      },
    ];
    return (
      <View
        className="w-full p-2 flex-col  rounded-xl mt-4"
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
                <FontAwesome5Icon name="user-alt" size={25} color={BLUE_COLOR} />
              </View>
              <View className="flex-col items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item.user_name}
                </Text>
                <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[200px]">
                  <FontAwesome5Icon name="coins" color="#138EE9" size={17} />
                  <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                    {rupiah(item?.balance || 0)}
                  </Text>
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
      className="w-full h-full "
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <Paginate
        renderItem={usersCard}
        url="/auth/saldo-user"
        ref={paginateRef}
      />
    </View>
  );
}

