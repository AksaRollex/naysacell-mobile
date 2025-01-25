import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  windowWidth,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';
import HistoryDeposit from './HistoryDeposit';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../libs/axios';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import {Controller, useForm} from 'react-hook-form';

export default function Deposit({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [depositAmount, setDepositAmount] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    formState: {errors},
  } = useForm();

  const handlePresetAmount = amount => {
    setDepositAmount(amount.toString());
  };

  const queryClient = useQueryClient();

  const {mutate: handleTopup, isLoading} = useMutation(
    async () => {
      const requestData = {
        amount: parseInt(depositAmount.replace(/\D/g, '')) || 0,
      };

      const response = await axios.post('/auth/topup', requestData);
      return response.data.data;
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries('/auth/check-saldo');
        queryClient.invalidateQueries('/auth/histori');
        setSuccessModal(true);
        setTimeout(() => {
          navigation.navigate('HomeScreen', {refresh: true});
          setSuccessModal(false);
        }, 2000);
      },
      onError: error => {
        const errorMsg = error.response?.data?.message || 'Deposit gagal';
        setErrorMessage(errorMsg);
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 2000);
      },
    },
  );

  const onSubmit = () => {
    if (!depositAmount) {
      setErrorMessage('Nominal Deposit tidak boleh kosong');
      setModalFailed(true);
      setTimeout(() => setModalFailed(false), 2000);
      return;
    }
    handleTopup();
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View>
        <View className="px-4 py-2">
          <Controller
            control={control}
            name="depositAmount"
            rules={{
              required: 'Nominal Deposit tidak boleh kosong',
              validate: value => {
                const numericValue = value.replace(/\D/g, '');
                return numericValue > 0 || 'Nominal Deposit harus lebih dari 0';
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View className="mt-3">
                <TextInput
                  placeholder="Nominal Deposit"
                  value={rupiah(depositAmount)}
                  onChangeText={text => {
                    const numericValue = text.replace(/\D/g, '');
                    setDepositAmount(numericValue);
                    onChange(text);
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : LIGHT_COLOR}
                  onBlur={onBlur}
                  className="h-12 w-full rounded-xl font-poppins-regular  px-4 bg-[#f8f8f8 ] border border-stone-600"
                />
                {errors.depositAmount && (
                  <Text className="text-red-400 mt-1">
                    {errors.depositAmount.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View
          id="referensi_nominal"
          className="px-4 py-2 flex flex-row flex-wrap justify-between items-center">
          {[
            10000, 25000, 50000, 100000, 150000, 200000, 400000, 600000,
            1000000,
          ].map((amount, index) => (
            <TouchableOpacity
              key={index}
              className="px-1 py-4 my-1 rounded-md justify-center items-center"
              style={{
                backgroundColor: isDarkMode ? '#262626' : WHITE_BACKGROUND,
                width: windowWidth * 0.3,
              }}
              onPress={() => handlePresetAmount(amount)}>
              <Text
                className="font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(amount)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="px-4 py-2 ">
          <TouchableOpacity
            className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
            style={{
              backgroundColor: BLUE_COLOR,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={onSubmit}>
            <Text className="font-poppins-bold" style={styles.buttonLabel}>
              {isLoading ? <ActivityIndicator color="white" /> : 'DEPOSIT'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalAfterProcess
        modalVisible={successModal}
        title="Deposit Berhasil"
        subTitle={`Deposit sebesar ${rupiah(depositAmount)} berhasil`}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={24}
        bgIcon={'#e6f7e6'}
      />
      <ModalAfterProcess
        modalVisible={failedModal}
        title="Deposit Gagal"
        subTitle={errorMessage}
        icon={'close-sharp'}
        iconColor={'#f43f5e'}
        iconSize={24}
      />
      <View className=" mx-4 justify-end items-end mt-11 py-2">
        <Text
          className="font-poppins-semibold text-end"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          Histori Deposit
        </Text>
      </View>
      <ScrollView className="  ">
        <HistoryDeposit />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
  },
  bottom: isDarkMode => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    padding: 10,
  }),
  bottomButton: isLoading => ({
    opacity: isLoading ? 0.7 : 1,
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
  }),
});
