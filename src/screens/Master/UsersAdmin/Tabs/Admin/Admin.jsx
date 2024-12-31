import {Image, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useRef} from 'react';
import {DARK_BACKGROUND, DARK_COLOR, LIGHT_BACKGROUND, LIGHT_COLOR} from '../../../../../utils/const';
import Paginate from '../../../../../components/Paginate';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {MenuView} from '@react-native-menu/menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Admin({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const AdminCards = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormUser', {id: item.id}),
      },
    ];
    return (
      <View
        className="w-full p-2 flex-col mt-4 rounded-lg" 
        style={{
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor : isDarkMode ? '#262626' : '#f8f8f8'
        }}>
        <View className="flex-row w-full  my-2 justify-center ">
          <View className="w-full flex-row justify-between items-start">
            <View className="flex-row  items-start gap-x-2 ">
              <Image
                source={require('../../../../../../assets/images/logo.png')}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-col items-start justify-start ">
                <Text className="font-poppins-medium text-base " style={{  color : isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item.name}
                </Text>
                <Text className="font-poppins-regular text-sm " style={{  color : isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item.email}
                </Text>
                <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                  <IonIcons name="person" color="#138EE9" size={15} />
                  <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                    {item?.role?.full_name}
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
        <View className="border-[0.5px] w-full my-2 opacity-40 rounded-es-xl" style={{  borderColor : isDarkMode ? DARK_COLOR : LIGHT_COLOR}}></View>
        <View className="flex-row w-full justify-between items-center my-2">
          <View className="w-1/2 gap-x-2 flex-row items-center justify-start">
            <IonIcons name="location" color={isDarkMode ? DARK_COLOR : LIGHT_COLOR} size={17} />
            <Text className="font-poppins-regular text-sm " style={{  color : isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.address}
            </Text>
          </View>
          <View className="border-[0.5px] h-7 w-[0.3px] opacity-40" style={{  borderColor : isDarkMode ? DARK_COLOR : LIGHT_COLOR}}></View>
          <View className="w-1/2  gap-x-2 flex-row items-center justify-start">
            <IonIcons name="call" color={isDarkMode ? DARK_COLOR : LIGHT_COLOR} size={17} />
            <Text className="font-poppins-regular text-sm " style={{  color : isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.phone}
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
        renderItem={AdminCards}
        url="/master/users/admin"
        ref={paginateRef}
        payload={{role_id: '1'}}
      />
      <AntDesign
        name="plus"
        size={28}
        color="#fff"
        style={styles.plusIcon}
        onPress={() => navigation.navigate('FormUser')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#138EE9',
    padding: 10,
    borderRadius: 50,
  },
});
