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
  LIGHT_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  FONT_SEDANG,
  LIGHT_COLOR,
  MEDIUM_FONT,
  windowWidth,
  HORIZONTAL_MARGIN,
  REGULAR_FONT,
} from '../../utils/const';
import {windowHeight} from '../../utils/const';
import Icon from 'react-native-vector-icons/Entypo';
import OctiIcons from 'react-native-vector-icons/Octicons';

export default function HomeScreen() {
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
        {/* <BellIkon /> */}
      </View>

      <View
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
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
          Saldo
        </Text>
        <View style={{flexDirection: 'row', columnGap: 15}}>
          <TouchableOpacity
            style={{flexDirection: 'column', alignItems: 'center', rowGap: 10}}>
            {/* <SendIkon /> */}
            <OctiIcons
              name="paper-airplane"
              size={20}
              color={'black'}></OctiIcons>
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
            {/* <AddIkon /> */}
            <Icon name="plus" size={20} color={'black'}></Icon>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
