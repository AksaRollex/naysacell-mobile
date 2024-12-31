import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  import React from 'react';
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
  import BackButton from '../../../../../components/BackButton';
  export default function FormAdmin({route, navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const queryClient = useQueryClient();
    const {id} = route.params || {};
  
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();
  
    const {data, isFetching: isLoadingData} = useQuery(
      ['users', id],
      () => axios.get(`/master/users/${id}`).then(res => res.data.data),
      {
        enabled: !!id,
        onSuccess: data => {
          setValue('name', data.name);
          setValue('email', data.email);
          setValue('phone', data.phone);
          setValue('address', data.address);
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to load data',
          });
          console.error(error);
        },
      },
    );
  
    const {mutate: createOrUpdate} = useMutation(
      async data => {
        const requestData = {
          ...data,
        };
  
        Object.keys(requestData).forEach(
          key =>
            (requestData[key] === undefined || requestData[key] === null) &&
            delete requestData[key],
        );
  
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
          navigation.navigate('User', {
            id: data?.id || null,
          });
          queryClient.invalidateQueries(['/master/users/admin']);
  
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: id ? 'User updated successfully' : 'User created successfully',
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to create user',
          });
          console.error(error);
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
      <View
        className="w-full h-full p-3 "
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}>
        <View
          className=" w-full h-full rounded-lg "
          style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
          <View className="w-full my-2  p-3 rounded-lg flex-row justify-between">
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
          </View>
          <View className="p-3">
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Nama Harus Diisi',
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Nama Lengkap
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular ${
                      !isLoadingData ? '' : 'bg-gray-100'
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
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Email
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular ${
                      !isLoadingData ? '' : 'bg-gray-100'
                    }`}
                    placeholder="Harap Lengkapi Email"
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
              name="phone"
              rules={{
                required: 'Nomor Telepon Harus Diisi',
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Nomor Telepon
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular ${
                      !isLoadingData ? '' : 'bg-gray-100'
                    }`}
                    placeholder="Harap Lengkapi Nomor Telepon"
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
              name="address"
              rules={{
                required: 'Nama Harus Diisi',
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-semibold my-1"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Alamat
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoadingData}
                    placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                    className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular ${
                      !isLoadingData ? '' : 'bg-gray-100'
                    }`}
                    placeholder="Harap Lengkapi Alamat"
                  />
                  {errors.name && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
          <View style={[styles.bottom]} className="p-3">
            <TouchableOpacity
              style={[styles.bottomButton, {opacity: isLoadingData ? 0.5 : 1}]}
              onPress={onSubmit}>
              <Text style={styles.buttonLabel}>
                {isLoadingData ? 'Loading...' : 'Simpan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    bottomButton: {
      backgroundColor: BLUE_COLOR,
      padding: 10,
      borderRadius: 5,
    },
    buttonLabel: {
      color: WHITE_BACKGROUND,
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
    },
  });
  