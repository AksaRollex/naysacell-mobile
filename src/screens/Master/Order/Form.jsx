import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
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
import ModalAfterProcess from '../../../components/ModalAfterProcess';

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

  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [modalField, setModalField] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageField, setErrorMessageField] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
        setValue('order_status', data.order_status ? [data.order_status] : []);
      },
      onError: error => {
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 3000);
        setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan');
      },
    },
  );

  const { mutate: update, isLoading: isSaving } = useMutation(
    async (data) => {
      const requestData = {
        order_status: data.order_status[0], // Pastikan ini hanya mengirim status yang dipilih
      };
  
      return axios.put(`/master/order/update/${id}`, requestData);
    },
    {
      onSuccess: (response) => {
        setModalSuccess(true);
        queryClient.invalidateQueries('/master/order');
        setTimeout(() => {
          setModalSuccess(false);
          navigation.goBack();
        }, 3000);
        setSuccessMessage(response.data.message || 'Data Berhasil Diperbarui');
      },
      onError: (error) => {
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 3000);
        setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan');
      },
    }
  );
  

  const onSubmit = handleSubmit(
    data => {
      update(data);
    },
    errors => {
      console.log('Form errors:', errors);
      setModalField(true);
      setTimeout(() => {
        setModalField(false);
      }, 3000);
      setErrorMessageField(errors.order_status?.message || 'Terjadi kesalahan');
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
                      backgroundColor: isDarkMode
                        ? 'rgba(0,0,0,0.5)'
                        : 'rgba(0,0,0,0.2)',
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
                opacity: isSaving ? 0.7 : 1,
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
      <ModalAfterProcess
        modalVisible={modalFailed}
        icon={'close-sharp'}
        bgIcon={'#fef2f2'}
        iconColor={'#ef5350'}
        iconSize={24}
        title={'Gagal Disimpan !'}
        subTitle={errorMessage || 'Gagal menyimpan file'}
      />
      <ModalAfterProcess
        modalVisible={modalField}
        icon={'close-sharp'}
        bgIcon={'#fef2f2'}
        iconColor={'#ef5350'}
        iconSize={24}
        title={'Gagal Disimpan !'}
        subTitle={errorMessage || 'Gagal menyimpan file'}
      />
      <ModalAfterProcess
        modalVisible={modalField}
        icon={'close-sharp'}
        bgIcon={'#fef2f2'}
        iconColor={'#ef5350'}
        iconSize={24}
        title={'Field Tidak Boleh Kosong !'}
        subTitle={errorMessageField || 'field harus diisi'}
      />
      <ModalAfterProcess
        modalVisible={modalSuccess}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={24}
        bgIcon={'#e6f7e6'}
        title={successMessage || 'Data berhasil disimpan'}
        subTitle={'Pastikan data sudah benar'}
      />
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
