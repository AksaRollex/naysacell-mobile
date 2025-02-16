import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  SLATE_COLOR,
  WHITE_COLOR,
  LIGHT_COLOR,
  BLUE_COLOR,
} from '../../../utils/const';
import axios from '../../../libs/axios';
import Toast from 'react-native-toast-message';
import ModalAfterProcess from '../../../components/ModalAfterProcess';
import {Controller, useForm} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';

export default function ProfileForm({route}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalFailedData, setModalFailedData] = useState({});
  const query = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
    mode: 'onChange',
  });

  const onRefresh = React.useCallback(() => {
    fetchUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, [fetchUserData]);

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/auth/me');
      const userData = response.data.user;

      setValue('name', userData.name);
      setValue('phone', userData.phone);
      setValue('address', userData.address);
      setValue('email', userData.email);

      setData(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage(error.response?.data?.message || 'Gagal Memuat Data');
      setModalFailedData(true)
      setTimeout(() => {
        setModalFailedData(false)
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingOrValue = (value, placeholder = 'Memuat...') => {
    if (isLoading) {
      return placeholder;
    }
    return value || '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (isEditing) {
      handleSubmit(async formData => {
        try {
          const requestData = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
          };

          await axios.post(`/auth/user/update`, requestData);

          setIsEditing(false);
          fetchUserData();
          setModalSuccess(true);
          setTimeout(() => {
            setModalSuccess(false);
          }, 3000);
          query.invalidateQueries(['auth', 'user']);
        } catch (error) {
          console.error('Update error:', error.response?.data);
          setErrorMessage(
            error.response?.data?.message ||
              'Gagal Memperbarui Data, Silahkan Coba Lagi',
          );
          setModalFailed(true);
          setTimeout(() => {
            setModalFailed(false);
          }, 3000);
        }
      })();
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (data?.user) {
      setValue('name', data.user.name);
      setValue('phone', data.user.phone);
      setValue('address', data.user.address);
      setValue('email', data.user.email);
    }
  }, [data, setValue]);

  const handleCancel = () => {
    setIsEditing(false);
    reset({
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
    });
  };

  return (
    <View className="py-2 w-full">
      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
        {data && (
          <View>
            <View className="px-4 py-2">
              <Controller
                control={control}
                name="name"
                defaultValue={data?.user?.name || ''}
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
                render={({field: {value, onChange, onBlur}}) => (
                  <>
                    <Text
                      className="font-poppins-semibold my-1"
                      style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                      Nama Lengkap
                    </Text>
                    <TextInput
                      value={renderLoadingOrValue(value, 'Memuat...')}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={isEditing}
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.name ? 'border-red-500' : 'border-stone-600'
                      }`}
                      placeholder="Nama Lengkap"
                      maxLength={17}
                    />
                  </>
                )}
              />
              {errors.name && (
                <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View className="px-4 py-2">
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
                render={({field: {value, onChange, onBlur}}) => (
                  <>
                    <Text
                      className="font-poppins-semibold my-1"
                      style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                      Nomor Telepon
                    </Text>
                    <TextInput
                      value={renderLoadingOrValue(value, 'Memuat...')}
                      onChangeText={text => {
                        if (text.length <= 15 && /^[0-9]*$/.test(text)) {
                          onChange(text);
                        }
                      }}
                      onBlur={onBlur}
                      placeholder="Nomor Telepon"
                      keyboardType="numeric"
                      editable={isEditing}
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
                    />
                  </>
                )}
              />
              {errors.phone && (
                <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                  {errors.phone.message}
                </Text>
              )}
            </View>

            <View className="px-4 py-2">
              <Controller
                control={control}
                name="address"
                rules={{required: 'Alamat harus diisi'}}
                render={({field: {value, onChange, onBlur}}) => (
                  <>
                    <Text
                      className="font-poppins-semibold my-1"
                      style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                      Alamat Lengkap
                    </Text>
                    <TextInput
                      value={renderLoadingOrValue(value, 'Memuat...')}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={isEditing}
                      placeholder="Alamat"
                      placeholderTextColor={
                        isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                      }
                      style={{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: isDarkMode ? '#262626' : '#fff',
                      }}
                      className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                        errors.address ? 'border-red-500' : 'border-stone-600'
                      }`}
                    />
                  </>
                )}
              />
              {errors.address && (
                <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                  {errors.address.message}
                </Text>
              )}
            </View>

            <View className="px-4 py-2">
              <Text
                className="font-poppins-semibold my-1"
                style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                Email
              </Text>
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={renderLoadingOrValue(data.email)}
                    onChangeText={value => handleInputChange('email', value)}
                    editable={false}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                    }
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className="h-12 w-full rounded-xl px-4 border-[0.5px] border-stone-600"
                  />
                )}
              />
            </View>

            <View className="px-4 py-2">
              <Text
                className="font-poppins-semibold my-1"
                style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                Tanggal Pendaftaran
              </Text>
              <TextInput
                value={renderLoadingOrValue(
                  data.created_at
                    ? new Date(data.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Tanggal tidak tersedia',
                )}
                editable={false}
                placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                style={{
                  fontFamily: 'Poppins-Regular',
                  backgroundColor: isDarkMode ? '#262626' : '#fff',
                }}
                className="h-12 w-full rounded-xl px-4 border-[0.5px] border-stone-600"
              />
            </View>

            <View className="px-4 py-2 flex-row justify-between">
              {isEditing ? (
                <>
                  <TouchableOpacity
                    className="my-4 px-4 py-3 rounded-md flex-1 mr-2"
                    style={{backgroundColor: 'gray'}}
                    onPress={handleCancel}>
                    <Text className="font-poppins-semibold text-center text-white">
                      BATAL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="my-4 px-4 py-3 rounded-md flex-1 ml-2"
                    style={{backgroundColor: BLUE_COLOR}}
                    onPress={handleUpdate}>
                    <Text className="font-poppins-semibold text-center text-white">
                      {isLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        'SIMPAN'
                      )}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  className="my-4 px-4 py-3 rounded-md flex-1"
                  style={{backgroundColor: BLUE_COLOR}}
                  onPress={handleUpdate}>
                  <Text className="font-poppins-semibold text-center text-white">
                    EDIT DATA PRIBADI
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <ModalAfterProcess
        modalVisible={modalSuccess}
        title="Berhasil Memperbarui Data"
        subTitle="Data anda telah diperbarui"
        icon="checkmark-done-sharp"
        iconColor={'#95bb72'}
        bgIcon={'#e6f7e6'}
      />
      <ModalAfterProcess
        modalVisible={modalFailed}
        icon="close-sharp"
        iconColor={'#f43f5e'}
        bgIcon={'#fdecef'}
        title="Gagal Memperbarui Data"
        subTitle={errorMessage}
      />
      <ModalAfterProcess
        modalVisible={modalFailedData}
        icon="close-sharp"
        iconColor={'#f43f5e'}
        bgIcon={'#fdecef'}
        title="Gagal Mengambil Data"
        subTitle={errorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
