import {
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
import {Eye, EyeCrossed} from '../../../assets';
import {Controller, useForm} from 'react-hook-form';
import axios from '../../libs/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import ModalAfterProcess from '../../components/ModalAfterProcess';
rem = multiplier => baseRem * multiplier;
const baseRem = 16;
export default function LoginPage() {
  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isSecure, setIsSecure] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const queryClient = useQueryClient();

  const {mutate: login, isLoading} = useMutation({
    mutationFn: data => axios.post(`/auth/login`, data),
    onSuccess: async res => {
      await AsyncStorage.setItem('userToken', res.data.token);
      queryClient.invalidateQueries({
        queryKey: ['auth', 'user'],
      });
    },
    onError: error => {
      const message =
        error.response?.data?.message || 'Terjadi kesalahan saat login';
      setErrorMessage(message);
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
            rules={{
              required: 'Email Harus Diisi',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email tidak valid',
              },
            }}
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
                  keyboardType="number-pad"
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
                  {isSecure ? <Eye /> : <EyeCrossed />}
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

        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
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
          <TouchableOpacity onPress={() => navigation.navigate('registerPage')}>
            <Text style={{color: BLUE_COLOR, fontFamily: 'Poppins-Regular'}}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('bantuanLogin')}>
          <Text
            className="text-center  text-md font-poppins-regular"
            style={{color: BLUE_COLOR}}>
            Butuh bantuan?
          </Text>
        </TouchableOpacity>
      </View>
      {/* CLOSE FORM */}

      <ModalAfterProcess
        modalVisible={modalVisible}
        title="Login Gagal"
        subTitle={
          errorMessage || 'Email atau Password Salah, Silahkan Coba Lagi !'
        }
        url={require('../../../assets/lottie/failed-animation.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
