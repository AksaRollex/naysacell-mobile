import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import axios from '../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import {Eye, EyeCrossed} from '../../../assets';
import Checkbox from '@react-native-community/checkbox';

const baseRem = 16;
const rem = multiplier => baseRem * multiplier;

export default function RegisterPage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [modalTerms, setModalTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
    },
  });

  const password = watch('password');

  const onSubmit = async data => {
    if (!isTermsAccepted) {
      setModalTerms(true);
      setTimeout(() => {
        setModalTerms(false);
      }, 2000);
      return;
    }
    try {
      setIsLoading(true);
      const formData = {
        ...data,
      };
      await axios.post(`/auth/user/store`, formData);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('loginPage');
      }, 2000);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Terjadi kesalahan saat mendaftar';
      const errors = error.response?.data?.errors || {};
      if (errors.email) {
        setErrorMessage(errors.email[0]);
      } else if (errors.phone) {
        setErrorMessage(errors.phone[0]);
      } else {
        setErrorMessage(message);
      }
      setModalFailed(true);
      setTimeout(() => {
        setModalFailed(false);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 ">
      <ScrollView
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        }}
        className="h-[100vh]">
        <ImageBackground
          source={require('../../../assets/images/headerBg.jpg')}
          className="w-full h-[200px] items-start justify-start ">
          <View className="p-4">
            <View className="justify-start flex-col items-start">
              <Text className="text-white capitalize text-2xl font-poppins-semibold">
                Daftar Akun
              </Text>
              <Text className="text-white capitalize text-sm font-poppins-medium">
                Silahkan lengkapi form berikut untuk mendaftar
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View>
          {/* OPEN FORM */}
          <View>
            {/* NAME */}
            <View className="mt-6">
              <Controller
                name="name"
                control={control}
                rules={{required: 'Nama Harus Diisi'}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-regular "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Nama
                    </Text>
                    <TextInput
                      placeholder="Username"
                      label="name"
                      style={{fontFamily: 'Poppins-Regular'}}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      className="h-12 w-full rounded-xl mx-auto  px-4  border border-stone-600"></TextInput>
                  </View>
                )}
              />
              {errors.name && (
                <Text
                  className="mt-1  text-red-400 font-poppins-regular"
                  style={{marginLeft: rem(1)}}>
                  {errors.name.message}
                </Text>
              )}
            </View>
            {/* EMAIL */}
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
                  <View className="mx-3">
                    <Text
                      className="font-poppins-regular "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Email
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="email@example.com"
                      keyboardType="email-address"
                      style={{fontFamily: 'Poppins-Regular'}}
                      autoCapitalize="none"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      className="h-12 w-full rounded-xl mx-auto px-4 border border-stone-600"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="mt-1 text-red-400 ml-4 font-poppins-regular">
                  {errors.email.message}
                </Text>
              )}
            </View>
            {/* ADDRESS */}
            <View className="mt-6">
              <Controller
                name="address"
                control={control}
                rules={{
                  required: 'Alamat Harus Diisi',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-regular "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Alamat
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Alamat"
                      keyboardType="default"
                      style={{fontFamily: 'Poppins-Regular'}}
                      autoCapitalize="none"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      className="h-12 w-full rounded-xl mx-auto px-4 border border-stone-600"
                    />
                  </View>
                )}
              />
              {errors.address && (
                <Text className="mt-1 text-red-400 ml-4 font-poppins-regular">
                  {errors.address.message}
                </Text>
              )}
            </View>
            {/* PHONE */}
            <View className="mt-6">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Nomor Telepon Harus Diisi',
                  pattern: {
                    value: /^[0-9]{10,13}$/,
                    message: 'Nomor telepon tidak valid',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-regular "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Nomor Telepon
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Nomor Telepon"
                      style={{fontFamily: 'Poppins-Regular'}}
                      keyboardType="numeric"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      className="h-12 w-full rounded-xl px-4 border border-stone-600"
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <Text className="mt-1 text-red-400 ml-4 font-poppins-regular">
                  {errors.phone.message}
                </Text>
              )}
            </View>
            {/* PASSWORD */}
            <View className="mt-6">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password Harus Diisi',
                  minLength: {
                    value: 8,
                    message: 'Password minimal 8 karakter',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="relative mx-3">
                    <Text
                      className="font-poppins-regular "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Password
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{fontFamily: 'Poppins-Regular'}}
                      placeholder="Password"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      keyboardType="numeric"
                      className="h-12 w-full rounded-xl mx-auto px-4 border border-stone-600"
                      secureTextEntry={showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        top: '65%',
                        right: 10,
                        transform: [{translateY: -12}],
                      }}>
                      {showPassword ? <Eye /> : <EyeCrossed />}
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-red-400 ml-4 font-poppins-regular">
                  {errors.password.message}
                </Text>
              )}
            </View>
            {/* PASSWORD CONFIRMATION */}
            <View className="mt-6">
              <View className="relative">
                <Controller
                  name="password_confirmation"
                  control={control}
                  rules={{
                    required: 'Konfirmasi Password Harus Diisi',
                    validate: value =>
                      value === password || 'Password tidak cocok',
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View className="relative mx-3">
                      <Text
                        className="font-poppins-regular "
                        style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                        Konfirmasi Password
                      </Text>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Konfirmasi Password"
                        style={{fontFamily: 'Poppins-Regular'}}
                        keyboardType="numeric"
                        placeholderTextColor={
                          isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                        }
                        secureTextEntry={showConfirmPassword}
                        className="h-12 w-full rounded-xl mx-auto px-4 border border-stone-600"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          position: 'absolute',
                          top: '65%',
                          right: 10,
                          transform: [{translateY: -12}],
                        }}>
                        {showConfirmPassword ? <Eye /> : <EyeCrossed />}
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
              {errors.password_confirmation && (
                <Text className="mt-1 text-red-400 ml-4 font-poppins-regular">
                  {errors.password_confirmation.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <View className="mt-4 flex-1 justify-center items-center">
              <View className="items-center px-4">
                <View className="flex-row items-center mb-4">
                  <Checkbox
                    value={isTermsAccepted}
                    onValueChange={setIsTermsAccepted}
                    tintColors={{
                      true: BLUE_COLOR,
                      false: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                    }}
                  />
                  <View className="flex-row flex-wrap space-x-1 w-10/12 ml-2">
                    <Text
                      className="font-poppins-regular"
                      style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                      Saya menyetujui
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('S&K')}>
                      <Text
                        className="font-poppins-regular"
                        style={{color: BLUE_COLOR}}>
                        Syarat dan Ketentuan
                      </Text>
                    </TouchableOpacity>
                    <Text
                      className="font-poppins-regular"
                      style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                      serta
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('S&K')}>
                      <Text
                        className="font-poppins-regular"
                        style={{color: BLUE_COLOR}}>
                        Kebijakan Privasi
                      </Text>
                    </TouchableOpacity>
                    <Text
                      className="font-poppins-regular"
                      style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                      yang berlaku
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="mx-3">
              <TouchableOpacity
                className="w-full rounded-xl px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                  opacity: isLoading ? 0.7 : 1,
                }}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}>
                <Text className="text-white text-sm font-poppins-bold">
                  {isLoading ? 'MENDAFTAR...' : 'DAFTAR'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* CLOSE FORM */}

          {/* OPEN REGIST BUTTON TEXT & S&K */}
          <View className="flex-row items-center justify-center my-8 ">
            <Text
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}
              className="font-poppins-regular capitalize">
              Sudah punya akun ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('loginPage')}>
              <Text
                style={{color: BLUE_COLOR, fontFamily: 'Poppins-Regular'}}
                className="mx-1">
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
          {/* CLOSE REGIST BUTTON TEXT & S&K */}

          <View className="mb-8">
            <TouchableOpacity
              onPress={() => navigation.navigate('bantuanLogin')}>
              <Text
                className="text-center  text-sm font-poppins-regular "
                style={{color: BLUE_COLOR}}>
                Butuh bantuan?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ModalAfterProcess
        url={require('../../../assets/lottie/success-animation.json')}
        modalVisible={modalVisible}
        title="Pendaftaran Berhasil"
        subTitle="Silahkan Masuk Ke Aplikasi"
      />
      <ModalAfterProcess
        url={require('../../../assets/lottie/failed-animation.json')}
        modalVisible={modalFailed}
        title="Pendaftaran Gagal"
        subTitle={errorMessage}
      />
      <ModalAfterProcess
        url={require('../../../assets/lottie/failed-animation.json')}
        modalVisible={modalTerms}
        icon={'close-sharp'}
        iconColor={'#F44336'}
        iconSize={30}
        bgIcon={'#fef2f2'}
        title="Centang Syarat & Ketentuan"
        subTitle="Harus centang syarat dan ketentuan terlebih dahulu untuk melanjutkan pendaftaran"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
