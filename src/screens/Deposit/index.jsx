import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  GREY_COLOR,
  LIGHT_BACKGROUND,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  windowWidth,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';
import HistoryDeposit from './HistoryDeposit';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../libs/axios';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/BackButton';
export default function Deposit({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [depositAmount, setDepositAmount] = useState('');

  const handlePresetAmount = amount => {
    setDepositAmount(amount.toString());
  };

  const queryClient = useQueryClient();

  const {mutate: handleTopup} = useMutation(
    async () => {
      const requestData = {
        amount: parseInt(depositAmount.replace(/\D/g, '')), // Hapus karakter non-digit
      };

      const response = await axios.post('/auth/topup', requestData);
      return response.data.data;
    },
    {
      onSuccess: data => {
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'Deposit Saldo Berhasil',
        });
        navigation.navigate('HomeScreen', {refresh: true});
        queryClient.invalidateQueries('/auth/check-saldo');
      },
      onError: error => {
        console.error('Full error:', error.response);
        Toast.show({
          type: 'error',
          text1: 'Gagal',
          text2: error.response?.data?.message || 'Deposit Saldo Gagal',
        });
      },
    },
  );

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View>
        <View className="px-4 py-2 ">
          <TextInput
            label="deposit"
            placeholder="Nominal Deposit"
            value={rupiah(depositAmount)}
            onChangeText={setDepositAmount}
            keyboardType="numeric"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            className="h-12 w-full  mx-auto px-4 bg-[#f8f8f8 ] rounded-md border border-stone-600"></TextInput>
        </View>
        {/* // REFERENSI NOMINAL */}
        <View
          id="referensi_nominal"
          className="px-4 py-2 flex flex-row flex-wrap justify-between items-center">
          {[10000, 25000, 50000, 100000, 150000, 200000].map(
            (amount, index) => (
              <TouchableOpacity
                key={index}
                className="px-1 py-4 my-1 rounded-md justify-center items-center"
                style={{
                  backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
                  width: windowWidth * 0.3,
                }}
                onPress={() => handlePresetAmount(amount)}>
                <Text className="font-poppins-regular">{rupiah(amount)}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
        <View className="px-4 py-2 ">
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => handleTopup()}>
            <Text className="font-poppins-semibold" style={styles.buttonLabel}>
              Deposit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* HISTORI */}
      <ScrollView className=" py-2 mt-11">
        <View className="my-2 mx-4">
          <Text className="font-poppins-semibold">Histori Deposit</Text>
        </View>
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
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
});
