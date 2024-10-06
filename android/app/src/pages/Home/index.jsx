import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AddIkon, BellIkon, HeaderBG, SendIkon} from '../../assets';
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
} from '../../utils/const';
import {windowHeight} from '../../utils/const';
import mainMenu from '../../data/mainMenu';
import {rupiah} from '../../utils/utils';
import {Image} from 'react-native';

export default function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
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
          }}>
          Hai, AksaRollcake
        </Text>
        <BellIkon
          width={24}
          height={24}
          fill={isDarkMode ? 'white' : 'black'}
        />
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
          elevation: 4,
          marginTop: windowHeight * 0.07,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            fontFamily: MEDIUM_FONT,
            fontSize: FONT_NORMAL,
          }}>
          {rupiah(15000)}
        </Text>
        <View style={{flexDirection: 'row', columnGap: 15}}>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center', rowGap: 10}}>
            <SendIkon
              width={24}
              height={24}
              fill={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
            />

            <Text
              style={{
                color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                fontFamily: REGULAR_FONT,
                fontSize: FONT_SEDANG,
              }}>
              Transfer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center', rowGap: 10}}>
            <AddIkon
              width={24}
              height={24}
              fill={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
            />
            <Text
              style={{
                color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                fontFamily: REGULAR_FONT,
                fontSize: FONT_SEDANG,
              }}>
              Topup
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginHorizontal: HORIZONTAL_MARGIN}}>
        <View style={{marginTop: 35}}>
          <Text style={{fontFamily: BOLD_FONT, fontSize: FONT_NORMAL}}>
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
                  padding: 15,
                  backgroundColor: isDarkMode ? DARK_BACKGROUND : '#FFF',
                  borderRadius: 10,
                  marginTop: 15,
                  borderWidth: isDarkMode ? 1 : 0,
                  borderColor: isDarkMode ? SLATE_COLOR : '',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('Pulsa')}>
                <Image source={item.ikon} />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: MEDIUM_FONT,
                    fontSize: FONT_NORMAL,
                    marginTop: 10,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
