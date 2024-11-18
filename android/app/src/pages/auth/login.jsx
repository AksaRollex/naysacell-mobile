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
import {Controller, useForm} from 'react-hook-form';
import axios from '../../libs/axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import ModalProcess from '../../components/ModalProcess';
import ModalAfterProcess from '../../components/ModalAfterProcess';
rem = multiplier => baseRem * multiplier;
const baseRem = 16;
export default function LoginPage({}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isSecure, setIsSecure] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const queryClient = useQueryClient();

  // const onSubmit = async data => {
  //   try {
  //     const response = await axios.post(
  //       `/auth/login`,
  //       {
  //         email: data.email,
  //         password: data.password,
  //         type: 'email',
  //       },
  //       {
  //         timeout: 10000,
  //       },
  //     );

  //     if (response.data.token) {
  //       await AsyncStorage.setItem('userToken', response.data.token);
  //       await AsyncStorage.setItem(
  //         'userData',
  //         JSON.stringify(response.data.user),
  //       );

  //       axios.defaults.headers.common[
  //         'Authorization'
  //       ] = `Bearer ${response.data.token}`;

  //       Toast.show({
  //         type: 'success',
  //         text1: 'Success',
  //         text2: 'Login berhasil',
  //       });

  //       navigation.replace('MyTabs', {screen: 'Profile'});
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: 'Login gagal, Password / Email Salah',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error.response || error);

  //     const errorMessage =
  //       error.response?.data?.message ||
  //       'Terjadi kesalahan saat login. Silakan coba lagi.';

  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: errorMessage,
  //     });
  //   } finally {
  //   }
  // };

  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useMutation( {
    mutationFn: data => axios.post(`/auth/login`, data),
    onSuccess: async res => {
      await AsyncStorage.setItem('userToken', res.data.token);
      queryClient.invalidateQueries({
        queryKey: ['auth', 'user'],
      });
      navigation.replace('MyTabs', {screen: 'Profile'});
    },
    onError: error => {
      // console.error(error.response.data);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    },
  });

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}
      className="h-full">
      <Header title="Masuk" subtitle="Silahkan Login Ke NAYSA CELL" />

      {/* OPEN FORM */}
      <View>
        <View className="mt-6">
          <Controller
            name="email"
            control={control}
            rules={{required: 'Email Harus Diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Masukkan Email"
                label="Email"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                style={{fontFamily: 'Poppins-Regular'}}
                className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}></TextInput>
            )}
          />
          {errors.email && (
            <Text
              className="mt-1 text-red-400 font-poppins-regular"
              style={{marginLeft: rem(2)}}>
              {errors.email.message}
            </Text>
          )}
        </View>
        <View className="mt-6">
          <Controller
            name="password"
            control={control}
            rules={{required: 'Password Harus Diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <View className="relative">
                <TextInput
                  placeholder="Masukkan Password"
                  label="Password"
                  style={{fontFamily: 'Poppins-Regular'}}
                  color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-11/12 rounded-3xl mx-auto px-4 pr-10 border border-stone-600"
                  onBlur={onBlur}
                  value={value}
                  keyboardType='number-pad'
                  onChangeText={onChange}
                  secureTextEntry={isSecure}
                />
                <TouchableOpacity
                  onPress={() => setIsSecure(!isSecure)}
                  style={{
                    position: 'absolute',
                    right: 30,
                    top: '50%',
                    transform: [{translateY: -12}],
                  }}>
                  {isSecure ? <EyeCrossed /> : <Eye />}
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <Text
              className="mt-1 text-red-400 font-poppins-regular"
              style={{marginLeft: rem(2)}}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            className="text-right mx-6 my-8 text-black text-md"
            style={{color: BLUE_COLOR, fontFamily: 'Poppins-Regular'}}>
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
            onPress={handleSubmit(login)}>
            <Text className="text-white text-md font-poppins-bold">
              {isLoading ? 'LOADING...' : 'MASUK'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center my-8 ">
          <Text
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}
            className="mx-1 font-poppins-regular">
            Belum punya akun ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: BLUE_COLOR, fontFamily: 'Poppins-Regular'}}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BantuanLogin')}>
          <Text
            className="text-center  text-md font-poppins-regular"
            style={{color: BLUE_COLOR}}>
            Butuh bantuan?
          </Text>
        </TouchableOpacity>
      </View>
      {/* CLOSE FORM */}

      {/* <View>
        <View
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
      </View>
      </View> */}

      <ModalAfterProcess
        modalVisible={modalVisible}
        title="Login Gagal"
        subTitle="Email atau Password Salah, Silahkan Coba Lagi !"
        url={require('../../assets/lottie/failed-animation.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
