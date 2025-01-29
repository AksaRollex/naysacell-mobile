import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
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

export default function FormPrabayar({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {id} = route.params || {};
  const queryClient = useQueryClient();

  const {
    control,
    setError,
    formState: {errors},
    setValue,
    handleSubmit,
  } = useForm();
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
      <ScrollView
        className=" w-full h-full rounded-lg"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
        <View className="px-3 pb-3 pt-2">
          <Controller
            control={control}
            name="product_name"
            rules={{required: 'Nama Produk harus diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Nama Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.product_name ? 'border-red-500' : 'border-stone-600'
                  }`}
                  placeholder="Nama Produk"
                />
              </>
            )}
          />
          {errors.product_name && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.product_name.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_price"
            rules={{required: 'Harga Produk harus diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Harga Produk
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
                  editable={!isLoadingData}
                  keyboardType="numeric"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.product_price ? 'border-red-500' : 'border-stone-600'
                  }`}
                  placeholder="Harga Produk"
                />
              </>
            )}
          />
          {errors.product_price && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.product_price.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_desc"
            rules={{required: 'Harga Produk diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
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
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.product_desc ? 'border-red-500' : 'border-stone-600'
                  }`}
                  placeholder="Deskripsi Produk"
                />
              </>
            )}
          />

          {errors.product_desc && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.product_desc.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_provider"
            rules={{required: 'Produk Provider harus diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Produk Provider
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.product_provider
                      ? 'border-red-500'
                      : 'border-stone-600'
                  }`}
                  placeholder="Produk Provider"
                />
              </>
            )}
          />
          {errors.product_provider && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.product_provider.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_category"
            rules={{required: 'Produk Kategori harus diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Kategori Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.product_category
                      ? 'border-red-500'
                      : 'border-stone-600'
                  }`}
                  placeholder="Kategori Produk"
                />
              </>
            )}
          />
          {errors.product_category && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.product_category.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_sku"
            rules={{required: 'SKU Produk harus diisi'}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Kode SKU Produk
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                    errors.product_sku ? 'border-red-500' : 'border-stone-600'
                  }`}
                  placeholder="SKU Produk"
                />
              </>
            )}
          />
          {errors.product_sku && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.product_sku.message}
            </Text>
          )}
        </View>
        <View style={[styles.bottom]} className="p-3">
          <TouchableOpacity
            className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
            style={{
              backgroundColor: BLUE_COLOR,
              opacity: isLoadingData ? 0.7 : 1,
            }}
            disabled={isLoadingData || isSaving}
            onPress={onSubmit}>
            <Text style={styles.buttonLabel}>
              {isLoadingData || isSaving ? (
                <ActivityIndicator color="white" />
              ) : (
                'SIMPAN'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
