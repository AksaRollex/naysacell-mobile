import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Controller, useForm} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import {APP_URL} from '@env';

export default function ProfileForm({route}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = React.useState(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const query = useQueryClient();
  const {control} = useForm();

  const onRefresh = React.useCallback(() => {
    fetchUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchUserData]);

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

  // FETCH PHOTO
  useEffect(() => {
    axios
      .get('/auth/me')
      .then(response => {
        setData(response.data);
        if (response.data.user.photo) {
          const photoUrl = `${APP_URL}${response.data.user.photo}`;
          setCurrentPhotoUrl(photoUrl);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        await axios.post(`/auth/user/update`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        });

        if (file) {
          const photoFormData = new FormData();
          photoFormData.append('name', formData.name);
          photoFormData.append('phone', formData.phone);
          photoFormData.append('address', formData.address);
          photoFormData.append('photo', {
            uri: file.uri,
            type: file.type || 'image/jpeg',
            name: file.fileName || 'profile_photo.jpg',
          });

          try {
            const photoUploadResponse = await axios.post(
              '/auth/user/update',
              photoFormData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            const updatedImageUrl = file
              ? file.uri
              : `${APP_URL}${photoUploadResponse.data.photo}`;
            setCurrentPhotoUrl(updatedImageUrl);
          } catch (error) {
            console.error('Photo upload error:', error.response?.data);
            setErrorMessage(
              error.response?.data?.message ||
                'Gagal Memperbarui Foto, Silahkan Coba Lagi',
            );
            setModalFailed(true);
            setTimeout(() => {
              setModalFailed(false);
            }, 2000);
          }
        }
        setIsEditing(false);
        fetchUserData();
        setModalSuccess(true);
        setTimeout(() => {
          setModalSuccess(false);
        }, 2000);
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
        }, 2000);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChoosePhoto = () => {
    if (!isEditing) {
      Toast.show({
        type: 'info',
        text1: 'Edit Data Pribadi Terlebih Dahulu',
        text2: 'Tekan tombol "Edit Data Pribadi" untuk mengubah foto',
      });
      return;
    }

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.errorMessage) {
        console.log('Image Error : ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        const fileSizeInBytes = file.fileSize;
        const fileSizeInKB = fileSizeInBytes / 1024;

        if (fileSizeInKB > 2048) {
          Toast.show({
            type: 'error',
            text1: 'Ukuran file terlalu besar',
            text2: 'Ukuran file tidak boleh melebihi 2048 KB (2 MB)',
          });
        } else {
          console.log('Chosen file:', file);
          setFile(file);
        }
      }
    });
  };

  const handleDeletePhoto = () => {
    if (!isEditing) {
      Toast.show({
        type: 'info',
        text1: 'Edit Data Pribadi Terlebih Dahulu',
        text2: 'Tekan tombol "Edit Data Pribadi" untuk menghapus foto',
      });
      return;
    }
    setFile(null);
    setCurrentPhotoUrl(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: data.user?.name || data.name || '',
      email: data.user?.email || data.email || '',
      phone: data.user?.phone || data.phone || '',
      address: data.user?.address || data.address || '',
      photo: data.user?.photo || data.photo || null,
    });
    setFile(null);
  };

  return (
    <View className="py-2 w-full">
      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
        {data && (
          <View>
            {/* <View className="px-4 py-2">
              <Text
                className="font-poppins-semibold my-1"
                style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                Foto Profil
              </Text>
              <View className="border-[0.5px] border-dashed border-neutral-700  rounded-md p-4">
                <View className="items-center ">
                  {(file || currentPhotoUrl) && (
                    <TouchableOpacity
                      className={`absolute top-0 right-0  rounded-full w-8 h-8 items-center justify-center shadow-lg border  ${
                        isEditing ? 'bg-white' : 'bg-white opacity-25'
                      }`}
                      onPress={handleDeletePhoto}>
                      <AntDesign name="close" size={20} color="red" />
                    </TouchableOpacity>
                  )}
                  <View className="relative  rounded-md">
                    <Image
                      source={
                        file
                          ? {uri: file.uri}
                          : currentPhotoUrl
                          ? {uri: currentPhotoUrl}
                          : require('../../../../assets/images/blank.png')
                      }
                      className="w-48 h-48 rounded-lg "
                      defaultSource={require('../../../../assets/images/blank.png')}
                      onError={() => {
                        setCurrentPhotoUrl(null);
                      }}
                    />
                    <TouchableOpacity
                      className={`absolute bottom-0 right-0 rounded-full w-10 h-10 items-center justify-center shadow-lg ${
                        isEditing ? 'bg-indigo-600' : 'bg-indigo-600 opacity-25'
                      }`}
                      onPress={handleChoosePhoto}
                      disabled={!isEditing}>
                      <AntDesign
                        name="camera"
                        size={20}
                        color={isEditing ? 'white' : 'black'}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    className="font-poppins-medium text-sm mt-3"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Ketuk ikon kamera untuk mengubah foto
                  </Text>
                </View>
              </View>
            </View> */}

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
                      keyboardType='phone-pad'
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
                      onChangeText={value =>
                        handleInputChange('address', value)
                      }
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
              <Text
                className="font-poppins-semibold my-1"
                style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                Tanggal Pendaftaran
              </Text>
              <TextInput
                value={new Date(data.created_at || '').toLocaleDateString(
                  'id-ID',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                )}
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
      </ScrollView>

      <ModalAfterProcess
        modalVisible={modalSuccess}
        title="Berhasil Memperbarui Data"
        subTitle="Data anda telah diperbarui"
        url={require('../../../../assets/lottie/success-animation.json')}
      />
      <ModalAfterProcess
        modalVisible={modalFailed}
        title="Gagal Memperbarui Data"
        subTitle={errorMessage}
        url={require('../../../../assets/lottie/failed-animation.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
