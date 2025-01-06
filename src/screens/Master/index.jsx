import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  windowHeight,
  windowWidth,
} from '../../utils/const';
import {HeaderBG} from '../../../assets';

const Master = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const UsersAdmin = () => {
    navigation.navigate('IndexUsersAdmin');
  };

  const Master = () => {
    navigation.navigate('IndexMaster');
  };

  const Produk = () => {
    navigation.navigate('IndexProduk');
  };

  const Laporan = () => {
    navigation.navigate('IndexLaporan');
  };

  const Pesanan = () => {
    navigation.navigate('Order');
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <ImageBackground
        source={HeaderBG}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
        }}>
        <View
          className="w-full items-end justify-between flex-row  "
          style={{padding: 20}}>
          <Text className="text-white font-poppins-semibold text-base  ">
            Master
          </Text>
        </View>
      </ImageBackground>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        className="gap-y-4 my-4">
        <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px] "
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                User / Admin
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <FontAwesome5
                  name="users-cog"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={UsersAdmin}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View>
        {/* <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px]"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Master
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <Ionicons
                  name="apps-sharp"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={Master}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View> */}
        <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px]"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Produk
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <MaterialIcons
                  name="production-quantity-limits"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={Produk}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View>
        <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px]"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Laporan
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <Ionicons
                  name="newspaper"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={Laporan}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View>
        <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px]"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Pesanan
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <Ionicons
                  name="cart"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={Pesanan}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});

export default Master;
