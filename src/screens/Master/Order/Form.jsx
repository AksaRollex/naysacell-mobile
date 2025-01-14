import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ScrollView,
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
} from '../../../utils/const';
import axios from '../../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import BackButton from '../../../components/BackButton';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const orderStatusOptions = [
  {id: 'Pending', name: 'Pending'},
  {id: 'Processing', name: 'Processing'},
  {id: 'Completed', name: 'Completed'},
  {id: 'Cancelled', name: 'Cancelled'},
];

export default function FormOrder({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {id} = route.params || {};
  const queryClient = useQueryClient();

  const {control, setError, setValue, handleSubmit} = useForm();
  const {data, isFetching: isLoadingData} = useQuery(
    ['prabayar', id],
    () => axios.get(`/master/order/get/${id}`).then(res => res.data.data),
    {
      enabled: !!id,
      onSuccess: data => {
        setValue('order_status', [data.order_status]);
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

  const onSubmit = handleSubmit(data => {
    update(data);
  });

  return (
    <View
      className="w-full h-full p-3"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View
        className="w-full h-full rounded-lg"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
        <View className="w-full my-2 p-3 rounded-lg flex-row justify-between">
          <BackButton
            color={isDarkMode ? WHITE_COLOR : LIGHT_COLOR}
            size={25}
            action={() => navigation.goBack()}
          />
          <Text
            className="font-poppins-semibold text-lg text-end"
            style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
            {id ? 'Edit' : 'Tambah'} Pesanan
          </Text>
        </View>
        <ScrollView className="p-3">
          <Controller
            control={control}
            name="order_status"
            rules={{required: 'Harap pilih status pesanan'}}
            render={({field: {onChange, value}}) => (
              <>
                <Text
                  className="font-poppins-semibold my-1"
                  style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                  Status Pesanan
                </Text>
                <SectionedMultiSelect
                  IconRenderer={Icon}
                  items={orderStatusOptions}
                  uniqueKey="id"
                  selectText="Pilih status pesanan"
                  showDropDowns={false}
                  single={true}
                  selectedItems={value || []}
                  onSelectedItemsChange={items => {
                    console.log('Selected items:', items);
                    onChange(items);
                  }}
                  hideSearch={true}
                  styles={{
                    container: {
                      paddingHorizontal: 16,
                    },
                    selectToggle: {
                      padding: 12,
                      borderWidth: 0.5,
                      borderColor: '#404040',
                      borderRadius: 6,
                    },
                    selectToggleText: {
                      color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
                      fontFamily: 'Poppins-Regular',
                    },
                    item: {
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                    },
                    selectedItem: {
                      backgroundColor: BLUE_COLOR + '20', 
                    },
                    selectedItemText: {
                      color: BLUE_COLOR,
                      fontWeight: 'bold',
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
                {setError.order_status && (
                  <Text className="text-red-500 text-sm mt-1">
                    {setError.order_status.message}
                  </Text>
                )}
              </>
            )}
          />
        </ScrollView>
        <View style={[styles.bottom]} className="m-3">
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
