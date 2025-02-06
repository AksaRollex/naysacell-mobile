import {
  ActivityIndicator,
  ScrollView,
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
import Toast from 'react-native-toast-message';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../../../../../libs/axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAfterProcess from '../../../../../components/ModalAfterProcess';

export default function FormUser({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = useQueryClient();
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
    setValue,
    watch,
  } = useForm();

  const {data, isFetching: isLoadingData} = useQuery(
    ['users', id],
    () => axios.get(`/master/users/get/${id}`).then(res => res.data.data),
    {
      enabled: !!id,
      onSuccess: data => {
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('address', data.address);
        setValue('role_id', data.role_id);
        setValue('password', '');
      },
      onError: error => {
        const errorMsg = error.response?.data?.message || error.message;
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 3000);
        setErrorMessage(errorMsg);
      },
      retry: false,
    },
  );

  const {mutate: createOrUpdate, isLoading} = useMutation(
    async data => {
      const requestData = {
        ...data,
        role_id: 2,
      };

      Object.keys(requestData).forEach(
        key =>
          (requestData[key] === undefined ||
            requestData[key] === null ||
            requestData[key] === '') &&
          delete requestData[key],
      );

      if (requestData.password !== requestData.password_confirmation) {
        throw new Error('password dan password konfirmasi tidak sama');
      }

      const response = await axios[id ? 'put' : 'post'](
        id ? `/master/users/update/${id}` : '/master/users/store',
        requestData,
      );
      return response.data.data;
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['/master/users/admin']);
        setModalSuccess(true);
        setTimeout(() => {
          setModalSuccess(false);
          navigation.navigate('User', {
            id: data?.id || null,
          });
        }, 3000);
      },
      onError: error => {
        console.log(error)
        const errorMsg = error.response?.data?.message || error.message;
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 3000);
        setErrorMessage(errorMsg);
      },
    },
  );

  const onSubmit = handleSubmit(data => {
    if (!data) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all required fields',
      });
      return;
    }
    createOrUpdate(data);
  });

  return (
    <>
      <View
        className="w-full h-full p-3 "
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}>
        <ScrollView
          className=" w-full h-full rounded-xl "
          style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
          <View className="px-3 pt-2 pb-3 ">
            <Controller
              control={control}
              name="name"
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
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-medium mt-2"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Nama Lengkap
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : SLATE_COLOR
                    }
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.name ? 'border-red-500' : 'border-stone-600'
                    }`}
                    placeholder="Nama Lengkap"
                  />
                  {errors.name && (
                    <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                      {errors.name.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email harus diisi',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email tidak valid',
                },
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-medium mt-2"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Email
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : SLATE_COLOR
                    }
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.email ? 'border-red-500' : 'border-stone-600'
                    }`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Nomor Telepon harus diisi',
                pattern: {
                  value: /^08[0-9]{8,13}$/,
                  message:
                    'Nomor telepon harus diawali 08 dan memiliki 10-15 digit',
                },
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-medium mt-2"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
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
                    keyboardType="numeric"
                    editable={!isLoadingData}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : SLATE_COLOR
                    }
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.phone ? 'border-red-500' : 'border-stone-600'
                    }`}
                    placeholder="Nomor Telepon"
                  />
                  {errors.phone && (
                    <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                      {errors.phone.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="address"
              rules={{
                required: 'Alamat harus diisi',
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-medium mt-2"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Alamat
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : SLATE_COLOR
                    }
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.address ? 'border-red-500' : 'border-stone-600'
                    }`}
                    placeholder="Alamat"
                  />
                  {errors.address && (
                    <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                      {errors.address.message}
                    </Text>
                  )}
                </>
              )}
            />
            {!id && (
              <>
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
                          Password
                        </Text>
                        <TextInput
                          value={value}
                          onChangeText={text => {
                            if (/^[0-9]*$/.test(text)) {
                              onChange(text);
                            }
                          }}
                          onBlur={onBlur}
                          placeholder="Password"
                          placeholderTextColor={
                            isDarkMode ? SLATE_COLOR : SLATE_COLOR
                          }
                          keyboardType="numeric"
                          style={{
                            fontFamily: 'Poppins-Regular',
                            backgroundColor: isDarkMode ? '#262626' : '#fff',
                          }}
                          className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                            errors.password
                              ? 'border-red-500'
                              : 'border-stone-600'
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
                          {showPassword ? (
                            <MaterialCommunityIcons name="eye" size={25} />
                          ) : (
                            <MaterialCommunityIcons name="eye-off" size={25} />
                          )}
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
                          Konfirmasi Password
                        </Text>
                        <TextInput
                          value={value}
                          onChangeText={text => {
                            if (/^[0-9]*$/.test(text)) {
                              onChange(text);
                            }
                          }}
                          onBlur={onBlur}
                          placeholder="Konfirmasi Password"
                          placeholderTextColor={
                            isDarkMode ? SLATE_COLOR : SLATE_COLOR
                          }
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
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{
                            position: 'absolute',
                            top: '70%',
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
                      {errors.password_confirmation && (
                        <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                          {errors.password_confirmation.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </>
            )}
          </View>
          <View style={[styles.bottom]} className="p-3">
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                opacity: isLoadingData || isLoading ? 0.7 : 1,
              }}
              onPress={onSubmit}>
              <Text style={styles.buttonLabel}>
                {isLoadingData || isLoading ? <ActivityIndicator color="#fff" /> : 'SIMPAN'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ModalAfterProcess
        url={require('../../../../../../assets/lottie/success-animation.json')}
        modalVisible={modalSuccess}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={22}
        bgIcon={'#e6f7e6'}
        title={'Berhasil Menyimpan Data'}
        subTitle={'Pastikan Data Sudah Benar'}
      />
      <ModalAfterProcess
        url={require('../../../../../../assets/lottie/failed-animation.json')}
        modalVisible={modalFailed}
        title={'Gagal Menyimpan Data'}
        subTitle={errorMessage || 'Silahkan Coba Lagi'}
        icon={'close-sharp'}
        iconColor={'#f43f5e'}
        iconSize={22}
        bgIcon={'#fdecef'}
      />
    </>
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
