import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
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
  const query = useQueryClient();

  const {control} = useForm();

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/auth/me');
      setData(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
        address: response.data.user.address,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      Toast.show({
        type: 'error',
        text1: 'Gagal mengambil data',
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        const response = await axios.post(`/auth/user/update`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        });

        if (response.data) {
          setIsEditing(false);
          fetchUserData();
          setModalSuccess(true);
          setTimeout(() => {
            setModalSuccess(false);
          }, 2000);
          query.invalidateQueries(['auth', 'user']);
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            'Gagal Memperbarui Data, Silahkan Coba Lagi',
        );
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 2000);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data ke data asli
    setFormData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  };

  return (
    <View className="py-2 w-full">
      {data && (
        <View>
          <View className="px-4 py-2">
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Nama Harus Diisi',
                maxLength: {
                  value: 20,
                  message: 'Nama Tidak Boleh Lebih Dari 20 Karakter',
                },
              }}
              render={({field: {onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Nama Lengkap
                  </Text>
                  <TextInput
                    value={formData.name}
                    onChangeText={value => handleInputChange('name', value)}
                    onBlur={onBlur}
                    editable={isEditing}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                    }
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular ${
                      isEditing ? '' : ''
                    }`}
                  />
                </>
              )}
            />
          </View>

          <View className="px-4 py-2">
            <Text
              className="font-poppins-semibold my-1"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Email
            </Text>
            <TextInput
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              editable={false}
              placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
              className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700  font-poppins-regular ${
                isEditing ? '' : ''
              }`}
            />
          </View>

          <View className="px-4 py-2">
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Nomor Telepon Harus Diisi',
              }}
              render={({field: {onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Nomor Telepon
                  </Text>
                  <TextInput
                    value={formData.phone}
                    onBlur={onBlur}
                    onChangeText={value => handleInputChange('phone', value)}
                    editable={isEditing}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                    }
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700  font-poppins-regular ${
                      isEditing ? '' : ''
                    }`}
                  />
                </>
              )}
            />
          </View>

          <View className="px-4 py-2">
            <Controller
              control={control}
              name="address"
              rules={{required: 'Alamat Harus Diisi'}}
              render={({field: {onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Alamat Lengkap
                  </Text>
                  <TextInput
                    value={formData.address}
                    onBlur={onBlur}
                    onChangeText={value => handleInputChange('address', value)}
                    editable={isEditing}
                    placeholderTextColor={
                      isDarkMode ? SLATE_COLOR : LIGHT_COLOR
                    }
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700  font-poppins-regular ${
                      isEditing ? '' : ''
                    }`}
                  />
                </>
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
              value={new Date(data.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              editable={false}
              placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
              className="h-12 w-full mx-auto px-4  rounded-md border-[0.5px] border-neutral-700  font-poppins-regular"
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
                    Batal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="my-4 px-4 py-3 rounded-md flex-1 ml-2"
                  style={{backgroundColor: BLUE_COLOR}}
                  onPress={handleUpdate}>
                  <Text className="font-poppins-semibold text-center text-white">
                    Simpan
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                className="my-4 px-4 py-3 rounded-md flex-1"
                style={{backgroundColor: BLUE_COLOR}}
                onPress={handleUpdate}>
                <Text className="font-poppins-semibold text-center text-white">
                  Edit Data Pribadi
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <ModalAfterProcess
        modalVisible={modalSuccess}
        title="Berhasil Memperbarui Data"
        subTitle="Data anda telah diperbarui"
        url={require('../../../assets/lottie/success-animation.json')}
      />
      <ModalAfterProcess
        modalVisible={modalFailed}
        title="Gagal Memperbarui Data"
        subTitle={errorMessage}
        url={require('../../../assets/lottie/success-animation.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
