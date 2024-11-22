import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ScrollView,
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
import axios from '../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import Header from '../../components/Header';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import {Eye, EyeCrossed} from '../../assets';
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
      setTimeout(() =>{
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
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Terjadi kesalahan saat mendaftar';
      setErrorMessage(message);
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
        <Header title="Daftar Akun" subtitle="Silahkan Daftar Akun Anda" />

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
                  <TextInput
                    placeholder="Username"
                    label="name"
                    style={{fontFamily: 'Poppins-Regular'}}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="default"
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                    className="h-12 w-11/12 rounded-3xl mx-auto  px-4  border border-stone-600"></TextInput>
                )}
              />
              {errors.name && (
                <Text
                  className="mt-1  text-red-400 font-poppins-regular"
                  style={{marginLeft: rem(2)}}>
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
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    style={{fontFamily: 'Poppins-Regular'}}
                    autoCapitalize="none"
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                    className="h-12 w-11/12 rounded-3xl mx-auto px-4 border border-stone-600"
                  />
                )}
              />
              {errors.email && (
                <Text className="mt-1 text-red-400 ml-8 font-poppins-regular">
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
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Alamat"
                    keyboardType="default"
                    style={{fontFamily: 'Poppins-Regular'}}
                    autoCapitalize="none"
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                    className="h-12 w-11/12 rounded-3xl mx-auto px-4 border border-stone-600"
                  />
                )}
              />
              {errors.address && (
                <Text className="mt-1 text-red-400 ml-8 font-poppins-regular">
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
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Nomor Telepon"
                    style={{fontFamily: 'Poppins-Regular'}}
                    keyboardType="phone-pad"
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                    className="h-12 w-11/12 rounded-3xl mx-auto px-4 border border-stone-600"
                  />
                )}
              />
              {errors.phone && (
                <Text className="mt-1 text-red-400 ml-8 font-poppins-regular">
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
                  <View className="relative">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{fontFamily: 'Poppins-Regular'}}
                      placeholder="Password"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : GREY_COLOR
                      }
                      keyboardType="numeric"
                      className="h-12 w-11/12 rounded-3xl mx-auto px-4 border border-stone-600"
                      secureTextEntry={showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: 30,
                        transform: [{translateY: -12}],
                      }}>
                      {showPassword ? <Eye /> : <EyeCrossed />}
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-red-400 ml-8 font-poppins-regular">
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
                    <View className="relative">
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Konfirmasi Password"
                        style={{fontFamily: 'Poppins-Regular'}}
                        keyboardType="numeric"
                        placeholderTextColor={
                          isDarkMode ? SLATE_COLOR : GREY_COLOR
                        }
                        secureTextEntry={showConfirmPassword}
                        className="h-12 w-11/12 rounded-3xl mx-auto px-4 border border-stone-600"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: 30,
                          transform: [{translateY: -12}],
                        }}>
                        {showConfirmPassword ? <Eye /> : <EyeCrossed />}
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {/* <PasswordIcon
                  shown={showConfirmPassword}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                /> */}
              </View>
              {errors.password_confirmation && (
                <Text className="mt-1 text-red-400 ml-8 font-poppins-regular">
                  {errors.password_confirmation.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <View className="mt-4 flex-1 justify-center items-center">
              {/* Ubah View ini untuk konten persetujuan */}
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
                    <Text className="font-poppins-regular">
                      Saya menyetujui
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SyaratDanKetentuan')}>
                      <Text
                        className="font-poppins-regular"
                        style={{color: BLUE_COLOR}}>
                        Syarat dan Ketentuan
                      </Text>
                    </TouchableOpacity>
                    <Text className="font-poppins-regular">serta</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SyaratDanKetentuan')}>
                      <Text
                        className="font-poppins-regular"
                        style={{color: BLUE_COLOR}}>
                        Kebijakan Privasi
                      </Text>
                    </TouchableOpacity>
                    <Text className="font-poppins-regular">yang berlaku</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                className="w-11/12 rounded-3xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                  opacity: isLoading ? 0.7 : 1,
                }}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}>
                <Text className="text-white text-md font-poppins-bold">
                  {isLoading ? 'MENDAFTAR...' : 'DAFTAR'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* CLOSE FORM */}

          {/* OPEN REGIST BUTTON TEXT */}
          <View className="flex-row items-center justify-center my-8 ">
            <Text
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}
              className="font-poppins-regular">
              Sudah punya akun ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{color: BLUE_COLOR, fontFamily: 'Poppins-Regular'}}
                className="mx-1">
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
          {/* CLOSE REGIST BUTTON TEXT */}

          <TouchableOpacity onPress={() => navigation.navigate('BantuanLogin')}>
            <Text
              className="text-center  text-md font-poppins-regular"
              style={{color: BLUE_COLOR}}>
              Butuh bantuan?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ModalAfterProcess
        url={require('../../assets/lottie/success-animation.json')}
        modalVisible={modalVisible}
        title="Pendaftaran Berhasil"
        subTitle="Silahkan Masuk Ke Aplikasi"
      />
      <ModalAfterProcess
        url={require('../../assets/lottie/failed-animation.json')}
        modalVisible={modalFailed}
        title="Pendaftaran Gagal"
        subTitle={errorMessage}
      />
      <ModalAfterProcess
        url={require('../../assets/lottie/failed-animation.json')}
        modalVisible={modalTerms}
        title="Centang Syarat & Ketentuan"
        subTitle="Harus centang syarat dan ketentuan terlebih dahulu untuk melanjutkan pendaftaran"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
