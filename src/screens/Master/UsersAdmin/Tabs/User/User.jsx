import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useRef} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../../../utils/const';
import Paginate from '../../../../../components/Paginate';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {MenuView} from '@react-native-menu/menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDelete} from '../../../../../hooks/useDelete';
import {useQueryClient} from '@tanstack/react-query';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
export default function User({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();
  const queryClient = useQueryClient();
  const {
    delete: deleteUser,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  } = useDelete({
    onSuccess: () => {
      queryClient.invalidateQueries('/master/users/admin');
      navigation.navigate('User');
    },
    onError: error => {
      console.log('delete error', error);
    },
  });

  const usersCard = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormUser', {id: item.id}),
      },
      {
        id: 'Edit Password',
        title: 'Edit Password',
        action: item => navigation.navigate('FormPassUser', {id: item.id}),
      },
      {
        id: 'Hapus',
        title: 'Hapus',
        action: item => deleteUser(`/master/users/delete/${item.id}`),
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
                <FontAwesome5Icon
                  name="user-alt"
                  size={25}
                  color={BLUE_COLOR}
                />
              </View>
              <View className="flex-col items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item.name}
                </Text>
                <Text
                  className="font-poppins-regular text-sm "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item.email}
                </Text>
                <View className="bg-yellow-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                  <FontAwesome5Icon
                    name="universal-access"
                    color="#cb8c18"
                    size={15}
                  />
                  <Text className="font-poppins-medium text-xs mx-2 text-[#cb8c18]">
                    {item?.role?.full_name}
                  </Text>
                </View>
                <View className="bg-green-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 ">
                  <IonIcons name="call" color="#658844" size={15} />
                  <Text className="font-poppins-medium text-xs mx-2 text-[#658844]">
                    {item?.phone}
                  </Text>
                </View>
                <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[260px]">
                  <IonIcons name="location-sharp" color="#138EE9" size={15} />
                  <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                    {item?.address}
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
        url="/master/users/admin"
        ref={paginateRef}
        payload={{role_id: '2'}}
      />
      <AntDesign
        name="plus"
        size={28}
        color="#fff"
        style={styles.plusIcon}
        onPress={() => navigation.navigate('FormUser')}
      />
      <DeleteConfirmationModal />
      <SuccessOverlayModal />
      <FailedOverlayModal />
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
