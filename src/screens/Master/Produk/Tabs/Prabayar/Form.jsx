import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
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
  DARK_COLOR,
  WHITE_BACKGROUND,
} from '../../../../../utils/const';
import axios from '../../../../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function FormPrabayar({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {id} = route.params || {};
  const queryClient = useQueryClient();
  const [modalType, setModalType] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const {
    control,
    formState: {errors},
    setValue,
    watch,
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

  const providerOptions = {
    Pulsa: ['Axis', 'Telkomsel', 'Indosat', 'XL', 'Three'],
    Data: ['Axis', 'Telkomsel', 'Indosat', 'XL', 'Three'],
    'e-money': ['Shopeepay', 'OVO', 'Dana', 'Gopay'],
  };

  const TypePicker = ({onClose}) => {
    const [tempSelectedCategory, setTempSelectedCategory] =
      React.useState(selectedCategory);
    const [tempSelectedProvider, setTempSelectedProvider] = React.useState(
      watch('product_provider'),
    );

    const isCategory = modalType === 'category';
    const options = isCategory
      ? Object.keys(providerOptions)
      : providerOptions[selectedCategory] || [];

    const handleConfirm = () => {
      if (isCategory) {
        setSelectedCategory(tempSelectedCategory);
        setValue('product_category', tempSelectedCategory);
        setValue('product_provider', '');
      } else {
        setValue('product_provider', tempSelectedProvider);
      }
      setModalType(null);
    };
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalType !== null}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent(isDarkMode)]}>
            <View style={[styles.modalHeader(isDarkMode)]}>
              <Text style={[styles.modalTitle(isDarkMode)]}>
                {isCategory ? 'Pilih Kategori' : 'Pilih Provider'}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between px-4">
              <View className="flex-1 mr-2">
                <Text
                  className="font-poppins-semibold mb-2"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {isCategory ? 'Kategori' : 'Provider'}
                </Text>
                <ScrollView className="max-h-64">
                  {options.map(option => (
                    <TouchableOpacity
                      key={option}
                      className={`p-3 rounded-xl mb-2 ${
                        isCategory
                          ? tempSelectedCategory === option
                            ? 'bg-blue-100'
                            : isDarkMode
                            ? 'bg-[#262626]'
                            : 'bg-[#f8f8f8]'
                          : tempSelectedProvider === option
                          ? 'bg-blue-100'
                          : isDarkMode
                          ? 'bg-[#262626]'
                          : 'bg-[#f8f8f8]'
                      }`}
                      onPress={() => {
                        if (isCategory) {
                          setTempSelectedCategory(option);
                        } else {
                          setTempSelectedProvider(option);
                        }
                      }}>
                      <Text
                        className={`${
                          isCategory
                            ? tempSelectedCategory === option
                              ? 'text-blue-600 font-poppins-semibold'
                              : isDarkMode
                              ? 'text-white font-poppins-regular'
                              : 'text-black font-poppins-regular'
                            : tempSelectedProvider === option
                            ? 'text-blue-600 font-poppins-semibold'
                            : isDarkMode
                            ? 'text-white font-poppins-regular'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {option.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View className="mt-4 px-4">
              <TouchableOpacity
                className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                }}
                onPress={handleConfirm}>
                <Text className="text-white text-center font-poppins-semibold">
                  TERAPKAN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
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
                  placeholderTextColor={SLATE_COLOR}
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
            <Text className="mt-1  text-red-400 font-poppins-regular text-xs">
              {errors.product_name.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_price"
            rules={{
              required: 'Harga Produk harus diisi',
              pattern: {value: /[0-9]{3,10}$/},
              message: 'Harga Produk hanya diperbolehkan angka',
            }}
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
                      .slice(0, 10);
                    onChange(sanitizedText);
                  }}
                  onBlur={onBlur}
                  editable={!isLoadingData}
                  keyboardType="numeric"
                  placeholderTextColor={SLATE_COLOR}
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
            <Text className="mt-1  text-red-400 font-poppins-regular text-xs">
              {errors.product_price.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_desc"
            rules={{required: 'Deskripsi Produk diisi'}}
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
                  placeholderTextColor={SLATE_COLOR}
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
            <Text className="mt-1  text-red-400 font-poppins-regular text-xs">
              {errors.product_desc.message}
            </Text>
          )}
          <Controller
            control={control}
            name="product_category"
            rules={{required: 'Kategori Produk harus diisi'}}
            render={({field: {value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Kategori Produk
                </Text>
                <TouchableOpacity
                  onPress={() => setModalType('category')}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl justify-center  items-start px-4 border-[0.5px] ${
                    errors.product_provider
                      ? 'border-red-500'
                      : 'border-stone-600'
                  }`}>
                  <Text
                    className="font-poppins-regular normal-case"
                    style={{
                      color: isDarkMode
                        ? value
                          ? DARK_COLOR
                          : SLATE_COLOR
                        : value
                        ? LIGHT_COLOR
                        : SLATE_COLOR,
                    }}>
                    {value || 'Pilih Kategori'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
          {errors.product_category && (
            <Text className="mt-1  text-red-400 font-poppins-regular text-xs">
              {errors.product_category.message}
            </Text>
          )}

          <Controller
            control={control}
            name="product_provider"
            rules={{required: 'Produk Provider harus diisi'}}
            render={({field: {value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Produk Provider
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!watch('product_category')) {
                      Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Pilih kategori terlebih dahulu',
                      });
                      return;
                    }
                    setModalType('provider');
                  }}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: isDarkMode ? '#262626' : '#fff',
                  }}
                  className={`h-12 w-full rounded-xl justify-center  items-start px-4 border-[0.5px] ${
                    errors.product_provider
                      ? 'border-red-500'
                      : 'border-stone-600'
                  }`}>
                  <Text
                    className="font-poppins-regular normal-case"
                    style={{
                      color: isDarkMode
                        ? value
                          ? DARK_COLOR
                          : SLATE_COLOR
                        : value
                        ? LIGHT_COLOR
                        : SLATE_COLOR,
                    }}>
                    {value || 'Pilih Provider'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
          {errors.product_provider && (
            <Text className="mt-1  text-red-400 font-poppins-regular text-xs">
              {errors.product_provider.message}
            </Text>
          )}

          <TypePicker onClose={() => setModalType(null)} />
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: isDarkMode => ({
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  }),
  modalHeader: isDarkMode => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  }),
  modalTitle: isDarkMode => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
});
