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
} from '../../utils/const';
import {Eye, EyeCrossed} from '../../assets';
import Icon from 'react-native-vector-icons/Feather';

export default function RegisterPage({navigation}) {
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
            source={require('../../assets/images/logo.png')}
            className="w-16 h-16 mx-auto mt-3"
          />
        </View>
        <View className="flex-1 justify-center items-end pr-6">
          <Text className=" text-white font-bold text-base font-sans my-1 ">
            Pendaftaran
          </Text>
          <Text className="text-white text-sm font-sans ">
            Silahkan mendaftarkan akun anda
          </Text>
        </View>
      </View>
      <View>
        <View className="mt-6">
          <TextInput
            placeholder="Masukkan nama"
            label="name"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"></TextInput>
        </View>
        <View className="mt-6">
          <TextInput
            placeholder="Masukkan email"
            label="Email"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"></TextInput>
        </View>
        <View className="my-6">
          <TextInput
            placeholder="Masukkan nomor telepon"
            label="phone"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"></TextInput>
        </View>
        <View>
          <TextInput
            placeholder="Masukkan password"
            label="Password"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"></TextInput>
        </View>

        <View className="flex mt-8">
          <TouchableOpacity
            className="w-11/12 rounded-3xl mx-auto px-4  h-12 bg-[#f8f8f8] items-center justify-center"
            style={{backgroundColor: BLUE_COLOR}}
            onPress={() => navigation.navigate('Login')}>
            <Text className=" text-white  text-md font-extrabold ">DAFTAR</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center my-8 ">
          <Text style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Sudah punya akun?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: BLUE_COLOR}}> Masuk</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BantuanLogin')}>
          <Text className="text-center  text-md" style={{color: BLUE_COLOR}}>
            Butuh bantuan?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
