import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  BOLD_FONT,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../../utils/const';
import {Eye, EyeCrossed} from '../../../assets';
import Icon from 'react-native-vector-icons/Feather';

export default function LoginPage({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSecure, setIsSecure] = useState(false);
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}
      className="h-full">
      <View
        className="  h-40 w-full "
        style={{borderBottomStartRadius: 100, backgroundColor: BLUE_COLOR}}>
        <View>
          <Image
            source={require('../../../assets/images/logo.png')}
            className="w-16 h-16 mx-auto mt-3"
          />
        </View>
        <View className="flex-1 justify-center items-end pr-6">
          <Text className=" text-white font-bold text-base font-sans my-1 ">
            Masuk
          </Text>
          <Text className="text-white text-sm font-sans">
            Silahkan login ke akun NAYSA CELL
          </Text>
        </View>
      </View>
      <View>
        <View className="my-6">
          <TextInput
            placeholder="Masukkan email"
            label="Email"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"></TextInput>
        </View>
        <View>
          <TextInput
            placeholder="Masukkan Password"
            label="Email"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"></TextInput>
        </View>
        <Text
          className="text-right mx-6 my-8 text-black text-md"
          style={{color: BLUE_COLOR}}>
          Lupa Kata Sandi?
        </Text>
        <View className="flex">
          <TouchableOpacity
            className="w-11/12 rounded-3xl mx-auto px-4  h-12 bg-[#f8f8f8] items-center justify-center"
            style={{backgroundColor: BLUE_COLOR}}
            onPress={() => navigation.navigate('MyTabs')}
            >
            <Text className=" text-white  text-md font-extrabold ">MASUK</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center my-8 ">
          <Text className="">Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: BLUE_COLOR}}>Daftar</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center  text-md" style={{color: BLUE_COLOR}}>
          Butuh bantuan?
        </Text>
      </View>
      {/* <View
        style={{
          marginHorizontal: HORIZONTAL_MARGIN,
          justifyContent: 'center',
          height: '100%',
        }}>
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              fontFamily: BOLD_FONT,
              fontSize: 24,
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            }}>
            Login
          </Text>
        </View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
            borderRadius: 5,
            padding: 10,
            fontFamily: REGULAR_FONT,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          }}
          placeholder="Masukkan email"
          placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
            borderRadius: 5,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="mt-4 px-2">
          <TextInput
            style={{
              padding: 10,
              fontFamily: REGULAR_FONT,
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
              flex: 1,
            }}
            placeholder="Masukkan password"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            secureTextEntry={isSecure}></TextInput>
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? <Eye /> : <EyeCrossed />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-4 p-3"
          style={{backgroundColor: BLUE_COLOR}}>
          <Text className="text-center text-white font-bold">Login</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
