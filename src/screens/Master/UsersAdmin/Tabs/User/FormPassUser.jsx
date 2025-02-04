import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  LIGHT_COLOR,
} from '../../../../../utils/const';
import {useMutation} from '@tanstack/react-query';
import axios from '../../../../../libs/axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAfterProcess from '../../../../../components/ModalAfterProcess';

export default function FormPassUser({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {id} = route.params || {};
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const {mutate: updatePassword, isLoading} = useMutation(
    async data => {
      const response = await axios.put(`/master/users/update-password/${id}`, {
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      return response.data;
    },
    {
      onSuccess: data => {
        setModalSuccess(true);
        setTimeout(() => {
          setModalSuccess(false);
          navigation.goBack();
        }, 2000);
      },
      onError: error => {
        const errorMsg = error.response?.data?.message || error.message;
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 2000);
        setErrorMessage(errorMsg);
      },
    },
  );

  const onSubmit = handleSubmit(data => {
    updatePassword(data);
  });

  return (
    <View
      className="w-full h-full p-3"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View
        className="w-full rounded-xl p-3"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
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
              message: 'Password hanya boleh angka',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <View className="relative">
                <Text
                  className="font-poppins-medium mt-2"
                  style={{
                    color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                  }}>
                  Password Baru
                </Text>
                <TextInput
                  value={value}
                  onChangeText={text => {
                    if (/^[0-9]*$/.test(text)) {
                      onChange(text);
                    }
                  }}
                  onBlur={onBlur}
                  placeholder="Password Baru"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : SLATE_COLOR}
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
                    top: '70%',
                    right: 10,
                    transform: [{translateY: -12}],
                  }}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                  {errors.password.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          rules={{
            required: 'Konfirmasi password harus diisi',
            validate: value => {
              const password = watch('password');
              return value === password || 'Password tidak sama';
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Password hanya boleh angka',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <View className="relative">
                <Text
                  className="font-poppins-medium mt-2"
                  style={{
                    color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                  }}>
                  Konfirmasi Password Baru
                </Text>
                <TextInput
                  value={value}
                  onChangeText={text => {
                    if (/^[0-9]*$/.test(text)) {
                      onChange(text);
                    }
                  }}
                  onBlur={onBlur}
                  placeholder="Konfirmasi Password Baru"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : SLATE_COLOR}
                  keyboardType="numeric"
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.password_confirmation
                      ? 'border-red-500'
                      : 'border-stone-600'
                  }`}
                  secureTextEntry={showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    top: '70%',
                    right: 10,
                    transform: [{translateY: -12}],
                  }}>
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              {errors.password_confirmation && (
                <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                  {errors.password_confirmation.message}
                </Text>
              )}
            </>
          )}
        />

        <View style={styles.bottom} className="mt-4">
          <TouchableOpacity
            className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
            style={{
              backgroundColor: BLUE_COLOR,
              opacity : isLoading ? 0.7 : 1,
            }}
            onPress={onSubmit}>
            <Text style={styles.buttonLabel}>
              {isLoading ? <ActivityIndicator color="#fff" /> : 'SIMPAN'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalAfterProcess
        url={require('../../../../../../assets/lottie/success-animation.json')}
        modalVisible={modalSuccess}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={22}
        bgIcon={'#e6f7e6'}
        title={'Berhasil Mengubah Password'}
        subTitle={'Password berhasil diperbarui'}
      />

      <ModalAfterProcess
        url={require('../../../../../../assets/lottie/failed-animation.json')}
        modalVisible={modalFailed}
        title={'Gagal Mengubah Password'}
        subTitle={errorMessage || 'Pastikan data sudah benar'}
        icon={'close-sharp'}
        iconColor={'#f43f5e'}
        iconSize={22}
        bgIcon={'#fdecef'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
