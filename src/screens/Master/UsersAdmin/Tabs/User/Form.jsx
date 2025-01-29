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
import {Eye, EyeCrossed} from '../../../../../../assets';
import BackButton from '../../../../../components/BackButton';
import ModalAfterProcess from '../../../../../components/ModalAfterProcess';
export default function FormUser({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = useQueryClient();
  const {id} = route.params || {};
  const [showPassword, setShowPassword] = useState(true);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
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
      },
      onError: error => {
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 2000);
        setErrorMessage(error.response?.data || error.message);
      },
      retry: false,
    },
  );

  const {mutate: createOrUpdate} = useMutation(
    async data => {
      const requestData = {
        ...data,
        role_id: 2,
        password_confirmation: data.password,
      };

      Object.keys(requestData).forEach(
        key =>
          (requestData[key] === undefined || requestData[key] === null) &&
          delete requestData[key],
      );
      if (!id) {
        requestData.password_confirmation = data.password;
      } else {
        delete requestData.password;
        delete requestData.password_confirmation;
      }
      if (id) {
        const response = await axios.put(
          `/master/users/update/${id}`,
          requestData,
        );
        return response.data.data;
      } else {
        const response = await axios.post(`/master/users/store`, requestData);
        return response.data.data;
      }
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
        }, 2000);
      },
      onError: error => {
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 2000);
        setErrorMessage(error.response?.data || error.message);
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
          {/* <View className="w-full my-2  p-3 rounded-lg flex-row justify-between">
            <BackButton
              color={isDarkMode ? WHITE_COLOR : LIGHT_COLOR}
              size={25}
              action={() => navigation.goBack()}
            />
            <Text
              className="font-poppins-semibold text-lg text-end  "
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              {id ? 'Edit' : 'Tambah'} User
            </Text>
          </View> */}
          <View className="px-3 pt-2 pb-3 ">
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Nama Harus Diisi',
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
                    placeholder="Harap Lengkapi Nama Lengkap"
                  />
                  {errors.name && (
                    <Text className="text-red-500 text-sm mt-1">
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
                required: 'Email Harus Diisi',
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
                    placeholder="Harap Lengkapi Email"
                  />
                  {errors.email && (
                    <Text className="text-red-500 text-sm mt-1">
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
                required: 'Nomor Telepon Harus Diisi',
                pattern: {
                  value: /^[0-9]{10,13}$/,
                  message: 'Nomor telepon tidak valid',
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
                      const sanitizedText = text
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .slice(0, 13);
                      onChange(sanitizedText);
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
                    placeholder="Harap Lengkapi Nomor Telepon"
                  />
                  {errors.phone && (
                    <Text className="text-red-500 text-sm mt-1">
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
                required: 'Alamat Harus Diisi',
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
                    placeholder="Harap Lengkapi Alamat"
                  />
                  {errors.address && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </Text>
                  )}
                </>
              )}
            />
            {!id && (
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
                  <>
                    <View className="relative">
                      <Text
                        className="font-poppins-medium mt-2"
                        style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                        Password
                      </Text>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
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
                        {showPassword ? <Eye /> : <EyeCrossed />}
                      </TouchableOpacity>
                    </View>

                    {errors.password && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />
            )}
          </View>
          <View style={[styles.bottom]} className="p-3">
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                opacity: isLoadingData ? 0.7 : 1,
              }}
              onPress={onSubmit}>
              <Text style={styles.buttonLabel}>
                {isLoadingData ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  'SIMPAN'
                )}
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
        subTitle={errorMessage || 'Pastikan Data Sudah Benar'}
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
