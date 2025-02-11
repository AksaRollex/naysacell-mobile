import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {AddIkon, BellIkon, HeaderBG, Headset} from '../../../assets';
import mainMenu, {gameMenu} from '../../data/mainMenu';
import axios from '../../libs/axios';
import {rupiah} from '../../libs/utils';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  windowHeight,
  windowWidth,
} from '../../utils/const';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Paginate from '../../components/Paginate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Selamat Pagi';
  if (hour >= 12 && hour < 15) return 'Selamat Siang';
  if (hour >= 15 && hour < 19) return 'Selamat Sore';
  return 'Selamat Malam';
};

export default function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [greeting, setGreeting] = useState(getGreeting());
  const [data, setData] = useState([]);
  const [saldo, setSaldo] = useState('');
  const [saldoIsLoading, setSaldoIsLoading] = useState(false);
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
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailTransaction', {item})}
        className="w-full p-2 flex-col  rounded-xl mb-4"
        style={{backgroundColor: isDarkMode ? '#242424' : '#F3F4F6'}}>
        <View className="rounded-xl  w-full p-2 flex-row justify-between ">
          <View
            className="items-center justify-center"
            style={{
              backgroundColor: isDarkMode ? '#242424' : '#fff',
              width: 50,
              height: 50,
              borderRadius: 25,
            }}>
            <MaterialIcons name="shopping-cart" size={25} color={BLUE_COLOR} />
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios
      .get('/auth/me')
      .then(response => {
        setData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    setSaldoIsLoading(true);

    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get('/auth/check-saldo')
        .then(response => {
          setSaldo(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setSaldoIsLoading(false);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}>
        <View
          style={{
            backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          }}
          className="w-full h-full">
          <ImageBackground
            source={HeaderBG}
            style={{
              width: windowWidth,
              height: windowHeight * 0.2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              {data && (
                <Text
                  style={{
                    color: isDarkMode ? 'white' : 'white',
                    fontWeight: '500',
                    marginBottom: 5,
                  }}
                  className="font-poppins-semibold">
                  {greeting} , {data.name || 'Pengguna'}
                </Text>
              )}

              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => navigation.navigate('CustomerService')}>
                  <Headset
                    width={24}
                    height={24}
                    fill={isDarkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('Notifikasi')}>
                  <BellIkon
                    width={24}
                    height={24}
                    fill={isDarkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              backgroundColor: isDarkMode ? '#252525' : '#fff',
              marginHorizontal: HORIZONTAL_MARGIN,
              padding: 15,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: '#404040',
              elevation: 0.5,
            }}
            className="my-4">
            <View className="flex-row gap-x-2 h-full justify-center items-center">
              <IonIcons
                name="wallet"
                size={40}
                color={isDarkMode ? '#138EE9' : '#138EE9'}
              />
              <View className="flex-col h-full">
                <Text
                  style={{
                    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                  }}
                  className="font-poppins-medium">
                  Saldo Anda
                </Text>
                {setSaldo && (
                  <Text
                    style={{
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                    }}
                    className="font-poppins-regular text-sm">
                    {saldoIsLoading ? (
                      <Text>Memuat...</Text>
                    ) : (
                      <Text>{rupiah(saldo?.balance)}</Text>
                    )}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 15,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  rowGap: 3,
                }}
                onPress={() => navigation.navigate('Deposit')}>
                <AddIkon
                  width={26}
                  height={26}
                  fill={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                />
                <Text
                  style={{
                    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                  }}
                  className="font-poppins-semibold text-xs">
                  Deposit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="gap-y-3">
            {/* TOPUP */}
            <View
              className=" rounded-xl p-3"
              style={{
                backgroundColor: isDarkMode ? '#262626' : '#fff',
                marginHorizontal: HORIZONTAL_MARGIN,
              }}>
              <Text
                className="text-sm font-poppins-medium"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Topup
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
                className="gap-2 mt-4">
                {mainMenu.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.label}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate(item.path)}
                      className=" w-24   justify-center items-center opacity-0.5 ">
                      <View className="w-24 h-11 justify-center items-center">
                        <FontAwesome5Icon
                          name={item.ikon}
                          size={30}
                          color={BLUE_COLOR}
                        />
                      </View>
                      <View className="my-2">
                        <Text
                          className=" text-center text-xs font-poppins-medium"
                          style={{
                            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                          }}>
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* GAME */}
            {/* <View
              className=" rounded-xl p-3"
              style={{
                backgroundColor: isDarkMode ? '#262626' : '#fff',
                marginHorizontal: HORIZONTAL_MARGIN,
              }}>
              <Text
                className="text-sm font-poppins-medium"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Game
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
                className="gap-2 mt-4">
                {gameMenu.map(game => {
                  return (
                    <TouchableOpacity
                      key={game.label}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate(game.path)}
                      className=" w-24   justify-center items-center opacity-0.5 ">
                      <View className="w-24 h-11 justify-center items-center">
                        <FontAwesome5Icon
                          name={game.ikon}
                          size={30}
                          color={BLUE_COLOR}
                        />
                      </View>
                      <View className="my-2">
                        <Text
                          className=" text-center text-xs font-poppins-medium"
                          style={{
                            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                          }}>
                          {game.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View> */}
          </View>

          <View
            className=" rounded-xl my-4 py-4"
            style={{
              backgroundColor: isDarkMode ? '#262626' : '#fff',
              marginHorizontal: HORIZONTAL_MARGIN,
            }}>
            <View className="flex-row justify-between items-center mb-5">
              <Text
                className="text-sm font-poppins-medium mx-3 "
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Riwayat Transaksi Terakhir
              </Text>
            </View>
            <Paginate
              url="/auth/histori/home"
              renderItem={transactionCard}
              ref={paginateRef}
              showSearchSkeleton={false}
              showListFooter={false}
              showPaginationInfo={false}
              widthSkeleton={true}
              showSearch={false}
            />
            <View className=" flex-row  items-end justify-end px-2 w-full ">
              <TouchableOpacity
                className="flex-row items-end justify-end"
                onPress={() => {
                  navigation.navigate('Transaksi');
                }}>
                <Text
                  value
                  className="text-xs font-poppins-regular "
                  style={{color: isDarkMode ? SLATE_COLOR : SLATE_COLOR}}>
                  Lihat Semua Transaksi
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
