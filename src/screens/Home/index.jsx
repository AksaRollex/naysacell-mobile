import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {AddIkon, BellIkon, HeaderBG, Mail} from '../../../assets';
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
  windowHeight,
  windowWidth,
} from '../../utils/const';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import IonIcons from 'react-native-vector-icons/Ionicons';

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
  const [idUser, setIdUser] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const openWhatsApp = ({route}) => {
    const phoneNumber = '+6285336970707';
    const message = 'Halo Admin NAYSA CELL !';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(url).catch(err => {
      console.error('Error occurred', err);
      alert('WhatsApp is not installed or there is an issue.');
    });
  };

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
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get('/auth/check-saldo')
        .then(response => {
          setSaldo(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
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
                  {greeting} , {data.name || 'User'}
                </Text>
              )}

              <View className="flex-row gap-4">
                <TouchableOpacity onPress={openWhatsApp}>
                  <Mail
                    width={24}
                    height={24}
                    fill={isDarkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifikasi')}>
                  <BellIkon
                    width={24}
                    height={24}
                    fill={isDarkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity>
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
                    className="font-poppins-regular text-base">
                    {rupiah(saldo?.balance)}
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
                  className="font-poppins-medium">
                  Deposit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* TOPUP & TAGIHAN */}
          <View style={{marginHorizontal: HORIZONTAL_MARGIN}}>
            <Text className="text-base font-poppins-semibold" style={{ color: isDarkMode ? DARK_COLOR : LIGHT_COLOR }}>
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
                        name="money-bill"
                        size={30}
                        color={BLUE_COLOR}
                      />
                    </View>
                    <View className="my-2">
                      <Text
                        className=" text-center text-sm font-poppins-medium"
                        style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* GAME */}
        {/* <View
            style={{
              marginHorizontal: HORIZONTAL_MARGIN,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            className="my-5 p-3  rounded-md ">
            <View>
              <Text
                style={{
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                }}
                className="font-poppins-semibold">
                Game
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {gameMenu.map(item => {
                return (
                  <TouchableOpacity
                    key={item.label}
                    style={{
                      width: 100,
                      padding: 5,
                      backgroundColor: isDarkMode ? DARK_BACKGROUND : '#FFF',
                      borderRadius: 10,
                      marginTop: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate(item.path)}>
                    <FontAwesome5Icon
                      name="gamepad"
                      size={30}
                      color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 10,
                        color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      }}
                      className="font-poppins-regular">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
