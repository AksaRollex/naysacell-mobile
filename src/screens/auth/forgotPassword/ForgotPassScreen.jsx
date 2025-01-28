import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../../utils/const';
import {Controller, useForm} from 'react-hook-form';
import axios from '../../../libs/axios';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Eye, EyeCrossed} from '../../../../assets';
const PHASES = {
  EMAIL: 'EMAIL',
  OTP: 'OTP',
  NEW_PASSWORD: 'NEW_PASSWORD',
};

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [phase, setPhase] = useState(PHASES.EMAIL);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordIsSecure, setPasswordIsSecure] = useState(true);
  const [confirmPasswordIsSecure, setConfirmPasswordIsSecure] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const isDarkMode = useColorScheme() === 'dark';

  const handleEmailSubmit = async data => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/auth/send-user-otp', {
        email: data.email,
      });

      if (response.data.status) {
        setEmail(data.email);
        setPhase(PHASES.OTP);
        reset();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async data => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/auth/verify-user-otp', {
        email,
        otp: data.otp,
      });

      if (response.data.status) {
        setPhase(PHASES.NEW_PASSWORD);
        reset();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async data => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/auth/reset-user-password', {
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.data.status) {
        navigation.navigate('LoginScreen');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const renderEmailPhase = () => (
    <>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email tidak boleh kosong',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email tidak valid',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View className="mx-3 justify-center flex-col items-start">
            <Text
              className="font-poppins-regular "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Email
            </Text>
            <TextInput
              placeholder="Masukkan Email"
              label="Email"
              color={isDarkMode ? DARK_COLOR : '#000'}
              placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
              className="h-12 w-full rounded-xl px-4 border border-stone-600"
              style={{fontFamily: 'Poppins-Regular'}}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />
    </>
  );

  const renderOTPPhase = () => (
    <>
      <View className="flex-row flex-wrap mb-2 px-3 gap-x-1">
        <Text
          className="text-sm text-start capitalize font-poppins-regular"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          Kode OTP telah dikirim ke email : 
        </Text>
        <Text
          className="text-sm text-start ms-2 font-poppins-regular"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          {email}
        </Text>
      </View>
      <View className="px-3">
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
            <OTPInputView
              style={{
                width: '100%',
                height: 60,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              pinCount={6}
              code={value}
              onCodeChanged={onChange}
              autoFocusOnLoad
              codeInputFieldStyle={{
                width: 60,
                height: 50,
                borderWidth: 1,
                borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
                borderRadius: 12,
                color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                fontSize: 20,
              }}
              codeInputHighlightStyle={{
                borderColor: BLUE_COLOR,
              }}
            />
          )}
        />
      </View>

      <View className="items-start flex-row justify-start px-3 mt-2 gap-x-2">
        <Text
          className="text-sm text-start capitalize font-poppins-regular"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          Tidak menerima email ?
        </Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              setLoading(true);
              setError('');
              const response = await axios.post('/auth/send-user-otp', {
                email: email,
              });

              if (response.data.status) {
                setError('OTP baru telah dikirim ke email Anda');
                setTimeout(() => setError(''), 5000);
              }
            } catch (err) {
              setError(
                err.response?.data?.message || 'Gagal mengirim ulang OTP',
              );
            } finally {
              setLoading(false);
            }
          }}>
          <Text
            className="text-sm text-center capitalize font-poppins-regular"
            style={{color: BLUE_COLOR}}>
            Kirim ulang
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderPasswordPhase = () => (
    <>
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password baru tidak boleh kosong',
          minLength: {
            value: 8,
            message: 'Password minimal 8 karakter',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View className="mx-3 relative justify-center items-start">
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Password Baru
            </Text>
            <TextInput
              placeholder="Masukkan Password Baru"
              label="Password"
              secureTextEntry={passwordIsSecure}
              color={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
              placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
              className="h-12 w-full rounded-xl mx-auto px-4 border border-stone-600 mb-4"
              style={{fontFamily: 'Poppins-Regular'}}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() => setPasswordIsSecure(!passwordIsSecure)}
              style={{
                position: 'absolute',
                right: 10,
                top: '55%',
                transform: [{translateY: -12}],
              }}>
              {passwordIsSecure ? <Eye /> : <EyeCrossed />}
            </TouchableOpacity>
          </View>
        )}
      />
      <Controller
        name="password_confirmation"
        control={control}
        rules={{
          required: 'Konfirmasi password tidak boleh kosong',
          validate: (value, formValues) =>
            value === formValues.password || 'Password tidak sama',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View className="relative mx-3 justify-center items-start">
            <Text
              className="font-poppins-regular "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Konfirmasi Password
            </Text>
            <TextInput
              placeholder="Konfirmasi Password Baru"
              label="Konfirmasi Password"
              color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
              className="h-12 w-full rounded-xl mx-auto px-4 border border-stone-600"
              style={{fontFamily: 'Poppins-Regular'}}
              onBlur={onBlur}
              value={value}
              secureTextEntry={confirmPasswordIsSecure}
              onChangeText={onChange}
            />
            <TouchableOpacity
              onPress={() =>
                setConfirmPasswordIsSecure(!confirmPasswordIsSecure)
              }
              style={{
                position: 'absolute',
                right: 10,
                top: '65%',
                transform: [{translateY: -12}],
              }}>
              {confirmPasswordIsSecure ? <Eye /> : <EyeCrossed />}
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );

  const getPhaseTitle = () => {
    switch (phase) {
      case PHASES.EMAIL:
        return 'Lupa Kata Sandi';
      case PHASES.OTP:
        return 'Verifikasi OTP';
      case PHASES.NEW_PASSWORD:
        return 'Reset Password';
      default:
        return 'Lupa Kata Sandi';
    }
  };

  const getPhaseSubtitle = () => {
    switch (phase) {
      case PHASES.EMAIL:
        return 'Masukkan email Anda untuk menerima kode OTP';
      case PHASES.OTP:
        return 'Masukkan kode OTP yang telah dikirim ke email Anda';
      case PHASES.NEW_PASSWORD:
        return 'Masukkan password baru Anda';
      default:
        return 'Silahkan Mengikuti Langkah Langkah Berikut!';
    }
  };

  const onSubmit = data => {
    switch (phase) {
      case PHASES.EMAIL:
        return handleEmailSubmit(data);
      case PHASES.OTP:
        return handleOTPSubmit(data);
      case PHASES.NEW_PASSWORD:
        return handlePasswordSubmit(data);
    }
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <ImageBackground
        source={require('../../../../assets/images/headerBg.jpg')}
        className="w-full h-[200px] items-start justify-start ">
        <View className="p-4">
          <View className="justify-start flex-col items-start">
            <Text className="text-white capitalize text-2xl font-poppins-semibold">
              {getPhaseTitle()}
            </Text>
            <Text className="text-white capitalize text-sm font-poppins-medium">
              {getPhaseSubtitle()}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View>
        <View className="my-4">
          {phase === PHASES.EMAIL && renderEmailPhase()}
          {phase === PHASES.OTP && renderOTPPhase()}
          {phase === PHASES.NEW_PASSWORD && renderPasswordPhase()}

          {errors[Object.keys(errors)[0]] && (
            <Text className="mt-2 mx-3 text-red-400 font-poppins-regular text-start">
              {errors[Object.keys(errors)[0]].message}
            </Text>
          )}

          {error && (
            <Text className="mt-2 mx-3 capitalize text-red-400 font-poppins-regular text-start">
              {error}
            </Text>
          )}
        </View>

        <View className="flex mx-3">
          <TouchableOpacity
            className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{
              backgroundColor: BLUE_COLOR,
              opacity: loading ? 0.7 : 1,
            }}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-sm font-poppins-bold">
                {phase === PHASES.NEW_PASSWORD ? 'RESET PASSWORD' : 'LANJUT'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {phase === PHASES.EMAIL && (
        <View>
          <View className="flex-row justify-center my-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              className="ms-1 flex-row">
              <Text
                className="text-sm font-poppins-medium text-center"
                style={{
                  color: isDarkMode ? BLUE_COLOR : BLUE_COLOR,
                }}>
                Kembali
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('bantuanLogin')}>
            <Text
              className="text-center capitalize text-sm font-poppins-regular"
              style={{color: BLUE_COLOR}}>
              Butuh bantuan ?
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
}
