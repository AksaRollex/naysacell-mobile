import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../../../libs/axios';
import {Controller, useForm} from 'react-hook-form';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../../utils/const';
import ModalAfterProcess from '../../../components/ModalAfterProcess';

export default function FormSaldoUser({route, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const queryClient = useQueryClient();
  const {id} = route.params;

  const {data: saldo, isLoading: isLoadingData} = useQuery(
    ['saldo', id],
    () => axios.get(`/auth/edit-saldo/${id}`).then(res => res.data.data),
    {
      onSuccess: data => {
        setValue('balance', data.balance ? data.balance.toString() : '');
      },
    },
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      balance: saldo?.balance ? saldo.balance.toString() : '',
    },
  });

  const {mutate: update, isLoading} = useMutation(
    async data => {
      const requestData = {
        balance: parseFloat(data.balance),
      };

      const response = await axios.put(`/auth/update-saldo/${id}`, requestData);
      return response.data;
    },
    {
      onSuccess: () => {
        setModalSuccess(true);
        queryClient.invalidateQueries(['/auth/saldo-user']);
        setTimeout(() => {
          setModalSuccess(false);
          navigation.navigate('SaldoUser');
        }, 2000);
      },
      onError: error => {
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 2000);
        setErrorMessage(
          error.response?.data?.message || 'Gagal menyimpan data',
        );
      },
    },
  );

  const onSubmit = handleSubmit(data => {
    update(data);
  });

  return (
    <>
      <View
        className="w-full h-full p-3"
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}>
        <ScrollView
          className="w-full h-full rounded-xl"
          style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
          <View className="px-3 pt-2 pb-3">
            <Controller
              control={control}
              name="balance"
              rules={{
                required: 'Saldo harus diisi',
                pattern: {value: /[0-9]{3,10}$/},
                message: 'Saldo hanya diperbolehkan angka',
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <>
                  <Text
                    className="font-poppins-medium mt-2"
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Saldo
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={text => {
                      const sanitizedText = text
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .slice(0, 8);
                      onChange(sanitizedText);
                    }}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    editable={!isLoadingData}
                    placeholderTextColor={SLATE_COLOR}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      backgroundColor: isDarkMode ? '#262626' : '#fff',
                    }}
                    className={`h-12 w-full rounded-xl px-4 border-[0.5px] ${
                      errors.balance ? 'border-red-500' : 'border-stone-600'
                    }`}
                    placeholder="Saldo"
                  />
                  {errors.balance && (
                    <Text className="text-red-400 font-poppins-regular text-xs mt-1">
                      {errors.balance.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
          <View style={[styles.bottom]} className="p-3">
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                opacity: isLoading || isLoadingData ? 0.7 : 1,
              }}
              disabled={isLoading || isLoadingData}
              onPress={onSubmit}>
              <Text style={styles.buttonLabel}>
                {isLoading || isLoadingData ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  'SIMPAN'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ModalAfterProcess
        url={require('../../../../assets/lottie/success-animation.json')}
        modalVisible={modalSuccess}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={22}
        bgIcon={'#e6f7e6'}
        title={'Berhasil Menyimpan Data'}
        subTitle={'Pastikan Data Sudah Benar'}
        onClose={() => setModalSuccess(false)}
      />
      <ModalAfterProcess
        url={require('../../../../assets/lottie/failed-animation.json')}
        modalVisible={modalFailed}
        title={'Gagal Menyimpan Data'}
        subTitle={errorMessage || 'Pastikan Data Sudah Benar'}
        icon={'close-sharp'}
        iconColor={'#f43f5e'}
        iconSize={22}
        bgIcon={'#fdecef'}
        onClose={() => setModalFailed(false)}
      />
    </>
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
