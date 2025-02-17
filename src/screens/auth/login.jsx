import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
} from '../../utils/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Controller, useForm} from 'react-hook-form';
import axios from '../../libs/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
    mutationFn: data => axios.post(`/auth/loginMobile`, data),
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
      }, 3000);
    },
  });
  return (
    <View>
      <ImageBackground
        source={require('../../../assets/images/headerBg.jpg')}
        className="w-full h-[200px] items-start justify-start ">
        <View className="p-4">
          <View className="flex-row justify-start items-center ">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="w-10 h-10 "
            />
            <Text className="text-xl mx-2 font-poppins-bold text-white">
              NAYSA CELL
            </Text>
          </View>
          <View className="justify-start flex-col items-start my-5 ">
            <Text className="normal-case text-2xl font-poppins-semibold text-white">
              Selamat Datang
            </Text>
            <Text className="normal-case text-xs font-poppins-medium text-white">
              Aplikasi naysa cell menyediakan layanan topup pulsa & paket data
              dan uang elektronik
            </Text>
          </View>

          <View className="flex-row items-start justify-start">
            <Text className="font-poppins-semibold normal-case text-sm text-white">
              Belum punya akun ?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('registerPage')}>
              <Text className="text-white underline font-poppins-semibold text-sm mx-1">
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}
        className="h-full">
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
                <View className="mx-3 justify-center flex-col items-start">
                  <Text
                    className="font-poppins-medium"
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Email
                  </Text>
                  <TextInput
                    placeholder="Email"
                    label="Email"
                    color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                    placeholderTextColor={SLATE_COLOR}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.email ? 'border-red-500' : 'border-stone-600'
                    }`}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}></TextInput>
                </View>
              )}
            />
            {errors.email && (
              <Text className="mt-1 text-red-400 font-poppins-regular text-xs mx-3">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View className="mt-2">
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password harus diisi',
                minLength: {
                  value: 8,
                  message: 'Password minimal 8 karakter',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Hanya angka yang diperbolehkan',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View className="relative mx-3">
                  <Text
                    className="font-poppins-medium "
                    style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                    Password
                  </Text>
                  <TextInput
                    placeholder="Password"
                    label="Password"
                    color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                    placeholderTextColor={SLATE_COLOR}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.password ? 'border-red-500' : 'border-stone-600'
                    }`}
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
                      right: 10,
                      top: '65%',
                      transform: [{translateY: -12}],
                    }}>
                    {isSecure ? (
                      <MaterialCommunityIcons name="eye" size={25} />
                    ) : (
                      <MaterialCommunityIcons name="eye-off" size={25} />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text className="mt-1 text-red-400 font-poppins-regular text-xs mx-3">
                {errors.password.message}
              </Text>
            )}
          </View>

          <View className="flex mx-3 mt-4">
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                opacity: isLoading ? 0.7 : 1,
              }}
              disabled={isLoading}
              onPress={handleSubmit(login)}>
              <Text className="text-white text-sm font-poppins-bold">
                {isLoading ? <ActivityIndicator color="white" /> : 'MASUK'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="my-4 "
            onPress={() => navigation.navigate('ForgotPassScreen')}>
            <Text
              className="text-start mx-3  text-black text-sm"
              style={{color: BLUE_COLOR, fontFamily: 'Poppins-Regular'}}>
              Lupa kata sandi ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('bantuanLogin')}
            className="mx-3">
            <Text
              className="text-start normal-case text-sm font-poppins-regular"
              style={{color: BLUE_COLOR}}>
              Butuh bantuan ?
            </Text>
          </TouchableOpacity>
        </View>
        {/* CLOSE FORM */}

        <ModalAfterProcess
          modalVisible={modalVisible}
          title="Login Gagal"
          icon={'close-sharp'}
          iconColor={'#f43f5e'}
          iconSize={22}
          subTitle={
            errorMessage || 'Email atau Password Salah, Silahkan Coba Lagi !'
          }
          url={require('../../../assets/lottie/failed-animation.json')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
