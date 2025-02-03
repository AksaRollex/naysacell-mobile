import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ScrollView,
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
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import axios from '../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import Checkbox from '@react-native-community/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const baseRem = 16;
const rem = multiplier => baseRem * multiplier;

export default function RegisterPage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [modalTerms, setModalTerms] = useState(false);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [otpCode, setOtpCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
      // Send all registration data when requesting OTP
      await axios.post('/auth/send-user-otp-regist', {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        password: data.password,
      });

      // Store registration data for later use
      setRegistrationData(data);
      // Show OTP input
      setShowOtpInput(true);
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

  const handleVerifyButtonPress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/verify-user-otp-regist', {
        email: registrationData.email,
        otp: otpCode,
      });

      console.log('Response:', response.data); // Tambahkan ini

      if (response.data.status) {
        console.log('Verifikasi sukses, akan navigasi ke login'); // Tambahkan ini
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.replace('loginPage');
        }, 2000);
      } else {
        console.log('Status tidak true:', response.data); // Tambahkan ini
      }
    } catch (error) {
      console.error('Error detail:', error); // Tambahkan ini
      const message = error.response?.data?.message || 'Verifikasi OTP gagal';
      setErrorMessage(message);
      setModalFailed(true);
      setTimeout(() => {
        setModalFailed(false);
      }, 2000);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      await axios.post('/auth/user/send-otp-regist', {
        email: registrationData.email,
        name: registrationData.name,
        phone: registrationData.phone,
        address: registrationData.address,
        password: registrationData.password,
      });
      // Show success message
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Gagal mengirim ulang OTP';
      setErrorMessage(message);
      setModalFailed(true);
      setTimeout(() => {
        setModalFailed(false);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  if (showOtpInput) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        }}>
        <ImageBackground
          source={require('../../../assets/images/headerBg.jpg')}
          className="w-full h-[200px] items-start justify-start ">
          <View className="p-4">
            <View className="justify-start flex-col items-start">
              <Text className="text-white normal-case text-2xl font-poppins-semibold">
                Verifikasi Email
              </Text>
              <Text className="text-white normal-case text-sm font-poppins-medium">
                Masukkan kode OTP yang telah dikirim ke email Anda
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View className="my-4 w-full ">
          <View className="flex-row flex-wrap mb-2 px-3 gap-x-1">
            <Text
              className="text-sm text-start normal-case font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Kode OTP telah dikirim ke email :
            </Text>
            <Text
              className="text-sm text-start font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {registrationData?.email}
            </Text>
          </View>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: 'Kode OTP tidak boleh kosong',
              minLength: {
                value: 6,
                message: 'Kode OTP harus 6 digit',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View className="px-3" pointerEvents="auto">
                <OTPInputView
                  style={{
                    width: '100%',
                    height: 60,
                    alignSelf: 'center',
                    zIndex: 1,
                    justifyContent: 'center',
                  }}
                  pinCount={6}
                  autoFocusOnLoad
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  codeInputFieldStyle={{
                    width: 60,
                    height: 50,
                    borderWidth: 1,
                    borderColor: errors.otp ? '#ef4444' : '#404040',
                    borderRadius: 12,
                    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                    fontSize: 20,
                    backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
                  }}
                  codeInputHighlightStyle={{
                    borderColor: BLUE_COLOR,
                  }}
                  onCodeChanged={code => setOtpCode(code)}
                />
              </View>
            )}
          />
          {errors.otp && (
            <Text className="text-red-400 text-xs mt-1 font-poppins-regular">
              {errors.otp.message}
            </Text>
          )}
          <View className="items-start flex-row justify-start px-3 mt-2 gap-x-2">
            <Text
              className="text-sm text-start normal-case font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Tidak menerima email ?
            </Text>
            <TouchableOpacity onPress={handleResendOTP} disabled={isLoading}>
              <Text
                style={{
                  color: BLUE_COLOR,
                  fontFamily: 'Poppins-Regular',
                  opacity: isLoading ? 0.7 : 1,
                }}>
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  'Kirim Ulang'
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex mx-3 my-4">
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              onPress={handleVerifyButtonPress}
              disabled={isLoading}
              style={{
                backgroundColor: BLUE_COLOR,
                opacity: isLoading ? 0.7 : 1,
              }}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-sm font-poppins-bold">
                  VERIFIKASI
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      <View
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}
        className="h-[100vh]">
        <ImageBackground
          source={require('../../../assets/images/headerBg.jpg')}
          className="w-full h-[200px] items-start justify-start ">
          <View className="p-4">
            <View className="justify-start flex-col items-start">
              <Text className="text-white normal-case text-2xl font-poppins-semibold">
                Daftar Akun
              </Text>
              <Text className="text-white normal-case text-sm font-poppins-medium">
                Silahkan lengkapi form berikut untuk mendaftar
              </Text>
            </View>
          </View>
        </ImageBackground>
        <ScrollView>
          {/* OPEN FORM */}
          <View>
            {/* NAME */}
            <View className="mt-2">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Nama harus diisi',
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: 'Hanya huruf dan angka yang diperbolehkan',
                  },
                  maxLength: {
                    value: 17,
                    message: 'Nama Tidak Boleh Lebih Dari 17 Karakter',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-medium "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Nama
                    </Text>
                    <TextInput
                      placeholder="Username"
                      label="name"
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.name ? 'border-red-500' : 'border-stone-600'
                      }`}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                      placeholderTextColor={SLATE_COLOR}></TextInput>
                  </View>
                )}
              />
              {errors.name && (
                <Text
                  className="mt-1  text-red-400 text-xs font-poppins-regular"
                  style={{marginLeft: rem(1)}}>
                  {errors.name.message}
                </Text>
              )}
            </View>
            {/* EMAIL */}
            <View className="mt-2">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email harus diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email tidak valid',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-medium "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Email
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="email@example.com"
                      keyboardType="email-address"
                      autonormal-case="none"
                      placeholderTextColor={SLATE_COLOR}
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.email ? 'border-red-500' : 'border-stone-600'
                      }`}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="mt-1 text-red-400 text-xs mx-3 font-poppins-regular">
                  {errors.email.message}
                </Text>
              )}
            </View>
            {/* ADDRESS */}
            <View className="mt-2">
              <Controller
                name="address"
                control={control}
                rules={{
                  required: 'Alamat harus diisi',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-medium "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Alamat
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Alamat"
                      keyboardType="default"
                      autonormal-case="none"
                      placeholderTextColor={SLATE_COLOR}
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.address ? 'border-red-500' : 'border-stone-600'
                      }`}
                    />
                  </View>
                )}
              />
              {errors.address && (
                <Text className="mt-1 text-red-400 text-xs mx-3 font-poppins-regular">
                  {errors.address.message}
                </Text>
              )}
            </View>
            {/* PHONE */}
            <View className="mt-2">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Nomor Telepon harus diisi',
                  pattern: {
                    value: /^08[0-9]{8,13}$/,
                    message:
                      'Nomor telepon harus diawali 08 dan memiliki 10-15 digit',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="mx-3">
                    <Text
                      className="font-poppins-medium"
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Nomor Telepon
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={text => {
                        if (text.length <= 15 && /^[0-9]*$/.test(text)) {
                          onChange(text);
                        }
                      }}
                      onBlur={onBlur}
                      placeholder="Nomor Telepon"
                      keyboardType="numeric"
                      placeholderTextColor={SLATE_COLOR}
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.phone ? 'border-red-500' : 'border-stone-600'
                      }`}
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <Text className="mt-1 text-red-400 text-xs mx-3 font-poppins-regular">
                  {errors.phone.message}
                </Text>
              )}
            </View>
            {/* PASSWORD */}
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
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="relative mx-3">
                    <Text
                      className="font-poppins-medium "
                      style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                      Password
                    </Text>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Password"
                      placeholderTextColor={SLATE_COLOR}
                      keyboardType="numeric"
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.password ? 'border-red-500' : 'border-stone-600'
                      }`}
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
                      {showPassword ? (
                        <MaterialCommunityIcons name="eye" size={25} />
                      ) : (
                        <MaterialCommunityIcons name="eye-off" size={25} />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-red-400 text-xs mx-3 font-poppins-regular">
                  {errors.password.message}
                </Text>
              )}
            </View>
            {/* PASSWORD CONFIRMATION */}
            <View className="mt-2">
              <View className="relative">
                <Controller
                  name="password_confirmation"
                  control={control}
                  rules={{
                    required: 'Konfirmasi Password harus diisi',
                    validate: value =>
                      value === password || 'Password tidak cocok',
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View className="relative mx-3">
                      <Text
                        className="font-poppins-medium "
                        style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                        Konfirmasi Password
                      </Text>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Konfirmasi Password"
                        keyboardType="numeric"
                        placeholderTextColor={SLATE_COLOR}
                        secureTextEntry={showConfirmPassword}
                        style={{
                          fontFamily: 'Poppins-Regular',
                          backgroundColor: isDarkMode ? '#262626' : '#fff',
                        }}
                        className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                          errors.password_confirmation
                            ? 'border-red-500'
                            : 'border-stone-600'
                        }`}
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
                        {showConfirmPassword ? (
                          <MaterialCommunityIcons name="eye" size={25} />
                        ) : (
                          <MaterialCommunityIcons name="eye-off" size={25} />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
              {errors.password_confirmation && (
                <Text className="mt-1 text-red-400 text-xs mx-3 font-poppins-regular">
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
                  {isLoading ? <ActivityIndicator color="#fff" /> : 'DAFTAR'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* CLOSE FORM */}

          <View className="flex-row items-center justify-start my-8 mx-3 ">
            <Text
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}
              className="font-poppins-regular normal-case">
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

          <View className="-mt-7 mb-8 mx-3">
            <TouchableOpacity
              onPress={() => navigation.navigate('bantuanLogin')}>
              <Text
                className="text-start  text-sm font-poppins-regular "
                style={{color: BLUE_COLOR}}>
                Butuh Bantuan ?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

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
