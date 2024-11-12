import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {Eye, EyeCrossed} from '../../assets';
import {Colors} from 'react-native-ui-lib';
import {Controller, useForm} from 'react-hook-form';
import axios from '../../libs/axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

export default function LoginPage({}) {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      console.log('Sending login request with data:', data); // Debug log

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 10000, // Timeout setelah 10 detik
        },
      );

      console.log('Login response:', response.data); // Debug log

      if (response.data.status) {
        // Simpan token
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response.data.user),
        );

        // Set default header untuk request selanjutnya
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.token}`;

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Login berhasil',
        });

        navigation.replace('Home'); // Gunakan replace agar tidak bisa kembali ke halaman login
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'Login gagal, Password / Email Salah',
        });
      }
    } catch (error) {
      console.error('Login error:', error.response || error); // Debug log

      const errorMessage =
        error.response?.data?.message ||
        'Terjadi kesalahan saat login. Silakan coba lagi.';

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
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
            Masuk
          </Text>
          <Text className="text-white text-sm font-sans">
            Silahkan login ke akun NAYSA CELL
          </Text>
        </View>
      </View>
      <View>
        <View className="my-6">
          <Controller
            name="email"
            control={control}
            rules={{required: 'Email Tidak Boleh Kosong'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Masukkan email"
                label="Email"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}></TextInput>
            )}
          />
          {errors.email && (
            <Text className="mt-2 mx-auto text-red-400" body>
              {errors.email.message}
            </Text>
          )}
        </View>
        <View>
          <Controller
            name="password"
            control={control}
            rules={{required: 'Password Tidak Boleh Kosong'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Masukkan Password"
                label="Password"
                placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                secureTextEntry={isSecure}
              />
            )}
          />
          {errors.password && (
            <Text className="mt-2 mx-auto text-red-400" body>
              {errors.password.message}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            className="text-right mx-6 my-8 text-black text-md"
            style={{color: BLUE_COLOR}}>
            Lupa Kata Sandi?
          </Text>
        </TouchableOpacity>
        <View className="flex">
          <TouchableOpacity
            className="w-11/12 rounded-3xl mx-auto px-4 h-12 items-center justify-center"
            style={{
              backgroundColor: BLUE_COLOR,
              opacity: isLoading ? 0.7 : 1,
            }}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-white text-md font-extrabold">
              {isLoading ? 'LOADING...' : 'MASUK'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center my-8 ">
          <Text style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Belum punya akun?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: BLUE_COLOR}}> Daftar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BantuanLogin')}>
          <Text className="text-center  text-md" style={{color: BLUE_COLOR}}>
            Butuh bantuan?
          </Text>
        </TouchableOpacity>
      </View>
      <View>
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
    </View>
  );
}

const styles = StyleSheet.create({});
