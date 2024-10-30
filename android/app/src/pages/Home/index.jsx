import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AddIkon, BellIkon, HeaderBG, Mail, SendIkon} from '../../assets';
import {
  BOLD_FONT,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  FONT_SEDANG,
  LIGHT_COLOR,
  MEDIUM_FONT,
  windowWidth,
  HORIZONTAL_MARGIN,
  REGULAR_FONT,
  SLATE_COLOR,
  LIGHT_BACKGROUND,
} from '../../utils/const';
import {windowHeight} from '../../utils/const';
import mainMenu, {gameMenu} from '../../data/mainMenu';
import {rupiah} from '../../utils/utils';
import {Image} from 'react-native';

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
  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const nama = 'Aksa Rollcake';

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
  return (
    <>
      <ScrollView style={{ backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND }}>
        <View
          style={{backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND}}
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
              <Text
                style={{
                  color: isDarkMode ? 'white' : 'black',
                  fontSize: FONT_NORMAL,
                  fontWeight: '500',
                  fontFamily: MEDIUM_FONT,
                  marginBottom: 5,
                }}>
                {greeting} , {nama}
              </Text>
              <View className="flex-row gap-4">
                <TouchableOpacity onPress={openWhatsApp}>
                  <Mail
                    width={24}
                    height={24}
                    fill={isDarkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity>
                <BellIkon
                  width={24}
                  height={24}
                  fill={isDarkMode ? 'white' : 'black'}
                />
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
                  fontFamily: MEDIUM_FONT,
                  fontSize: FONT_NORMAL,
                }}>
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
                  }}>
                  <SendIkon
                    width={24}
                    height={24}
                    fill={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                  />

                  <Text
                    style={{
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      fontFamily: REGULAR_FONT,
                    }}
                    className="text-md">
                    Transfer
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 10,
                  }}>
                  <AddIkon
                    width={24}
                    height={24}
                    fill={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                  />
                  <Text
                    style={{
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      fontFamily: REGULAR_FONT,
                    }}
                    className="text-md">
                    Topup
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
                  fontFamily: BOLD_FONT,
                  fontSize: FONT_NORMAL,
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                }}>
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
                      // height: 100,
                      padding: 5,
                      backgroundColor: isDarkMode ? DARK_BACKGROUND : '#FFF',
                      borderRadius: 10,
                      marginTop: 15,
                      // borderWidth: isDarkMode ? 1 : 1,
                      // borderColor: isDarkMode ? SLATE_COLOR : SLATE_COLOR,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate(item.path)}>
                    <Image source={item.ikon} />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: MEDIUM_FONT,
                        fontSize: FONT_NORMAL,
                        marginTop: 10,
                        color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* GAME */}
          <View
            style={{
              marginHorizontal: HORIZONTAL_MARGIN,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            className="my-5 p-3  rounded-md ">
            <View>
              <Text
                style={{
                  fontFamily: BOLD_FONT,
                  fontSize: FONT_NORMAL,
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                }}>
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
                console.log(item);
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
                        fontFamily: MEDIUM_FONT,
                        fontSize: FONT_NORMAL,
                        marginTop: 10,
                        color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
