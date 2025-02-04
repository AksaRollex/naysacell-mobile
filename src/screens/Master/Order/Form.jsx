import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
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
  BLUE_COLOR,
  WHITE_BACKGROUND,
  DARK_COLOR,
} from '../../../utils/const';
import axios from '../../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const orderStatusOptions = [
  {id: 'Pending', name: 'Menunggu'},
  {id: 'Processing', name: 'Proses'},
  {id: 'success', name: 'Berhasil'},
  {id: 'Cancelled', name: 'Dibatalkan'},
];

export default function FormOrder({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {id} = route.params || {};
  const queryClient = useQueryClient();

  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      order_status: [],
    },
    mode: 'onSubmit',
  });

  const {data, isFetching: isLoadingData} = useQuery(
    ['prabayar', id],
    () => axios.get(`/master/order/get/${id}`).then(res => res.data.data),
    {
      enabled: !!id,
      onSuccess: data => {
        // Ensure we're setting an array with the status
        setValue('order_status', data.order_status ? [data.order_status] : []);
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

  const {mutate: update, isLoading: isSaving} = useMutation(
    async data => {
      const requestData = {
        order_status: data.order_status[0],
      };

      return axios.put(`/master/order/update/${id}`, requestData);
    },
    {
      onSuccess: response => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: response.data.message || 'Data berhasil disimpan',
        });

        queryClient.invalidateQueries('/master/order');
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

  const onSubmit = handleSubmit(
    data => {
      update(data);
    },
    errors => {
      console.log('Form errors:', errors);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Harap lengkapi semua field yang diperlukan',
      });
    },
  );
  return (
    <View
      className="w-full h-full p-3"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View
        className="w-full h-full rounded-xl"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
        <ScrollView className="px-3 pt-2 pb-3">
          <Controller
            control={control}
            name="order_status"
            rules={{
              required: 'Harap pilih status pesanan',
              validate: value =>
                value.length > 0 || 'Harap pilih status pesanan',
            }}
            render={({field: {onChange, value}}) => (
              <>
                <Text
                  className="font-poppins-medium mt-2"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Status Pesanan
                </Text>
                <SectionedMultiSelect
                  IconRenderer={Icon}
                  items={orderStatusOptions}
                  uniqueKey="id"
                  selectText="Status Pesanan"
                  searchPlaceholderText="Cari..."
                  showDropDowns={false}
                  single={true}
                  showCancelButton={true}
                  selectedItems={value || []}
                  onSelectedItemsChange={items => {
                    onChange(items);
                  }}
                  loadingComponent={<ActivityIndicator color={'white'} />}
                  hideSearch={false}
                  confirmText="KONFIRMASI"
                  styles={{
                    searchBar: {
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                      borderRadius: 12,
                      height: 48,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    searchTextInput: {
                      fontFamily: 'Poppins-Regular',
                      color: isDarkMode ? LIGHT_COLOR : DARK_COLOR,
                      fontSize: 14,
                    },

                    cancelButton: {
                      backgroundColor: 'red',
                      margin: 8,
                      height: 48,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    container: {
                      backgroundColor: isDarkMode ? '#262626' : Colors.lighter,
                      gap: 8,
                    },
                    selectToggle: {
                      padding: 12,
                      borderWidth: 0.5,
                      borderColor: '#404040',
                      borderRadius: 12,
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                    selectToggleText: {
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                    },
                    item: {
                      paddingVertical: 12,
                      backgroundColor: isDarkMode ? '#292929' : '#f8f8f8',
                      paddingHorizontal: 10,
                    },
                    itemText: {
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                      fontFamily: 'Poppins-Regular',
                    },

                    chipIcon: {
                      color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                    },
                    subComponent: {
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    },
                    selectedItemText: {
                      color: BLUE_COLOR,
                      fontFamily: 'Poppins-SemiBold',
                    },

                    modalWrapper: {
                      backgroundColor: isDarkMode
                        ? 'rgba(0,0,0,0.5)'
                        : 'rgba(0,0,0,0.2)',
                    },
                    button: {
                      backgroundColor: BLUE_COLOR,
                      margin: 8,
                      height: 48,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },

                    modal: {
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    },
                    backdrop: {
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                    },
                    scrollView: { 
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    },
                    confirmText: {
                      color: WHITE_COLOR,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 15,
                    },
                  }}
                  colors={{
                    primary: BLUE_COLOR,
                    success: BLUE_COLOR,
                  }}
                  selectedIconComponent={
                    <Icon name="check" size={20} color={BLUE_COLOR} />
                  }
                  iconRight
                />
              </>
            )}
          />
          {errors.order_status && (
            <Text className="mt-1  text-red-400 font-poppins-regular">
              {errors.order_status.message}
            </Text>
          )}
          <View style={[styles.bottom]} className="py-3">
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
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
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
