import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  SLATE_COLOR,
  WHITE_COLOR,
  LIGHT_COLOR,
  LIGHT_BACKGROUND,
  WHITE_BACKGROUND,
  REGULAR_FONT,
  BLUE_COLOR,
  GREY_COLOR,
} from '../../../utils/const';
import {useMutation} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';

export default function ProfileFormEdit({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm();

  // const updateData = async () => {
  //   const formData = new FormData();
  //   formData.append('name', getValues('name'));
  //   formData.append('email', getValues('email'));
  //   formData.append('phone', getValues('phone'));
  //   formData.append('password', getValues('password'));
  //   formData.append('address', getValues('address'));

  //   try {
  //     const response = await axios.post(`/auth/user/update`, formData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   axios
  //     .get('/auth/me')
  //     .then(response => {
  //       userData(response.data.user);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const {uuid} = route.params;

  const {mutate: update, isLoading: isUpdating} = useMutation(
    data => axios.post(`/user/${uuid}/update`, data),
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Data updated successfully',
        });
        setTimeout(() => {
          navigation.navigate('Profile');
        }, 2000);
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data?.message || 'Failed to update data',
        });
        console.error(error.response?.data || error);
      },
    },
  );

  const onSubmit = data => {
    console.log('Submitting data:', data);
    update(data);
  };

  return (
    <View
      className="py-2 w-full h-full "
      style={{backgroundColor: isDarkMode ? '#18181B' : LIGHT_BACKGROUND}}>
      {data && (
        <View>
          <View className="px-4 py-2 ">
            <Text
              className="font-poppins-semibold my-1"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Nama Lengkap
            </Text>
            <Controller
              control={control}
              name="name"
              rules={{required: 'Nama Harus Di Isi'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  label="name"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-full mx-auto  px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600 font-poppins-regular"></TextInput>
              )}
            />
          </View>
          <View className="px-4 py-2 ">
            <Text
              className="font-poppins-semibold my-1"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{required: 'Email Harus Di Isi'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  value={value}
                  label="email"
                  onChangeTex={onChange}
                  onBlur={onBlur}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600 font-poppins-regular"></TextInput>
              )}
            />
          </View>
          <View className="px-4 py-2 ">
            <Text
              className="font-poppins-semibold my-1"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Nomor Telepon
            </Text>
            <Controller
              name="phone"
              control={control}
              rules={{required: 'Nomor Telepon Harus Di Isi'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  value={value}
                  label="phone"
                  onChangeTex={onChange}
                  onBlur={onBlur}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ]  rounded-md border border-stone-600 font-poppins-regular"></TextInput>
              )}
            />
          </View>
          <View className="px-4 py-2 ">
            <Text
              className="font-poppins-semibold my-1"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Alamat Lengkap
            </Text>
            <Controller
              name="address"
              control={control}
              rules={{required: 'Alamat Harus Di Isi'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  value={value}
                  label="address"
                  onChangeTex={onChange}
                  onBlur={onBlur}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600 font-poppins-regular"></TextInput>
              )}
            />
          </View>
          <View className="px-4 py-2 ">
            <Text
              className="font-poppins-semibold my-1"
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Tanggal Pendaftaran
            </Text>
            <Controller
              name="created_at"
              control={control}
              rules={{required: 'Tanggal Pendaftaran Harus Di Isi'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  value={value}
                  label="created_at"
                  onChangeTex={onChange}
                  onBlur={onBlur}
                  editable={false}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600 font-poppins-regular"></TextInput>
              )}
            />
          </View>
        </View>
      )}

      <View className="px-4 py-2 ">
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleSubmit(updateData)}>
          <Text style={styles.buttonLabel}>Perbarui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  bottom: isDarkMode => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    padding: 10,
  }),
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
});
