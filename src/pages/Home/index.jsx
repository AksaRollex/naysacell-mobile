import React, {useEffect, useState} from 'react';
import {
  Image,
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
  DARK_BACKGROUND,
  DARK_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  windowHeight,
  windowWidth,
} from '../../utils/const';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const openWhatsApp = () => {
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

            <View
              style={{
                backgroundColor: isDarkMode ? DARK_BACKGROUND : '#fff',
                marginHorizontal: HORIZONTAL_MARGIN,
                padding: 15,
                borderRadius: 10,
                height: 70,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                marginTop: windowHeight * 0.07,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: '#404040',
                elevation: 0.5,
              }}>
              <Text
                style={{
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                }}
                className="font-poppins-regular">
                {rupiah(15000)}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 15,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 10,
                  }}
                  onPress={() => navigation.navigate('Deposit')}>
                  <AddIkon
                    width={24}
                    height={24}
                    fill={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                  />
                  <Text
                    style={{
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                    }}
                    className="font-poppins-semibold">
                    Deposit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          {/* TOPUP & TAGIHAN */}
          <View
            style={{
              marginHorizontal: HORIZONTAL_MARGIN,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            className="mt-10 p-3  rounded-md ">
            <View>
              <Text
                style={{
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                }}
                className="font-poppins-semibold">
                Topup & Tagihan
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {mainMenu.map(item => {
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
                    <Image source={item.ikon} />
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
                    <Image source={item.ikon} />
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
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
