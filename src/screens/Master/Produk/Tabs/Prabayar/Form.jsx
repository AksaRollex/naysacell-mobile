import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_COLOR,
  SLATE_COLOR,
  BLUE_COLOR,
  WHITE_BACKGROUND,
} from '../../../../../utils/const';
import axios from '../../../../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import BackButton from '../../../../../components/BackButton';

export default function FormPrabayar({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {id} = route.params || {};
  const queryClient = useQueryClient();

  const {control, setError, setValue, handleSubmit} = useForm();
  const {data, isFetching: isLoadingData} = useQuery(
    ['prabayar', id],
    () =>
      axios
        .get(`/master/product/prepaid/get-pbb/${id}`)
        .then(res => res.data.data),
    {
      enabled: !!id,
      onSuccess: data => {
        setValue('product_name', data.product_name);
        setValue('product_price', data.product_price);
        setValue('product_provider', data.product_provider);
        setValue('product_sku', data.product_sku);
        setValue('product_desc', data.product_desc);
        setValue('product_category', data.product_category);
        console.log(data);
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.message,
        });
      },
    },
  );

  const {mutate: createOrUpdate, isLoading: isSaving} = useMutation(
    async data => {
      const requestData = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_provider: data.product_provider,
        product_sku: data.product_sku,
        product_desc: data.product_desc,
        product_category: data.product_category,
      };

      if (id) {
        return axios.put(
          `/master/product/prepaid/update-pbb/${id}`,
          requestData,
        );
      } else {
        return axios.post('/master/product/prepaid/store-pbb', requestData);
      }
    },
    {
      onSuccess: response => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: response.data.message || 'Data berhasil disimpan',
        });

        queryClient.invalidateQueries('/master/product/prepaid');
        navigation.goBack();
      },
      onError: error => {
        const message = error.response?.data?.message || 'Terjadi kesalahan';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });
      },
    },
  );

  const onSubmit = handleSubmit(data => {
    createOrUpdate(data);
  });

  return (
    <View
      className="w-full h-full p-3"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View
        className=" w-full h-full rounded-lg"
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
            {id ? 'Edit' : 'Tambah'} Produk
          </Text>
        </View>
        <ScrollView className="p-3">
          <Controller
            control={control}
            name="product_name"
            rules={{required: 'Harap Lengkapi Nama Produk'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Nama Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular 
                    ${!isLoadingData ? '' : 'bg-gray-100'}`}
                  placeholder="Harap Lengkapi Nama Produk"
                />
                {setError.product_name && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.product_name.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="product_price"
            rules={{required: 'Harap Lengkapi Harga Produk'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Harga Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  keyboardType="numeric"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular 
                    ${!isLoadingData ? '' : 'bg-gray-100'}`}
                  placeholder="Harap Lengkapi Harga Produk"
                />
                {setError.product_price && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.product_price.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="product_desc"
            rules={{required: 'Harap Lengkapi Harga Produk'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Deskripsi Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  keyboardType="default"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular 
                    ${!isLoadingData ? '' : 'bg-gray-100'}`}
                  placeholder="Harap Lengkapi Deskripsi Produk"
                />
                {setError.product_desc && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.product_desc.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="product_provider"
            rules={{required: 'Harap Lengkapi Produk Provider'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Produk Provider
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular 
                    ${!isLoadingData ? '' : 'bg-gray-100'}`}
                  placeholder="Harap Lengkapi Produk Provider"
                />
                {setError.product_provider && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.product_provider.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="product_category"
            rules={{required: 'Harap Lengkapi Produk Provider'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Kategori Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular 
                    ${!isLoadingData ? '' : 'bg-gray-100'}`}
                  placeholder="Harap Lengkapi Kategori Produk"
                />
                {setError.product_category && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.product_category.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="product_sku"
            rules={{required: 'Harap Lengkapi SKU Produk'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Kode SKU Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  className={`h-12 w-full mx-auto px-4 rounded-md border-[0.5px] border-neutral-700 font-poppins-regular 
                    ${!isLoadingData ? '' : 'bg-gray-100'}`}
                  placeholder="Harap Lengkapi SKU Produk"
                />
                {setError.product_sku && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.product_sku.message}
                  </Text>
                )}
              </>
            )}
          />
        </ScrollView>
          <View style={[styles.bottom]}  className="m-3">
            <TouchableOpacity
              style={[
                styles.bottomButton,
                {opacity: isLoadingData || isSaving ? 0.5 : 1},
              ]}
           
              disabled={isLoadingData || isSaving}
              onPress={onSubmit}>
              <Text style={styles.buttonLabel}>
                {isLoadingData || isSaving ? 'Loading...' : 'Simpan'}
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
