import {
  Text,
  useColorScheme,
  View,
  Share,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  BLUE_COLOR,
} from '../../../utils/const';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {rupiah} from '../../../libs/utils';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../../libs/axios';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAfterProcess from '../../../components/ModalAfterProcess';

export default function DetailHistoryDeposit({route, navigation}) {
  const {item} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [showPayment, setShowPayment] = useState(false);
  const [snapToken, setSnapToken] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const statusColor = status => {
    if (status === 'success') {
      return '#22c55e';
    } else if (status === 'pending') {
      return '#3b82f6';
    } else if (status === 'failed') {
      return '#ef4444';
    } else if (status === 'cancelled') {
      return '#ef4444';
    } else {
      return '#3b82f6';
    }
  };

  const textStatus = status => {
    if (status === 'success') {
      return 'Berhasil';
    } else if (status === 'pending') {
      return 'Pending';
    } else if (status === 'failed') {
      return 'Gagal';
    } else {
      return 'Pending';
    }
  };

  const queryClient = useQueryClient();

  const {mutate: handleResumePayment, isLoading} = useMutation(
    async () => {
      try {
        const response = await axios.post(
          `/resume-payment/${item.deposit_code}`,
        );
        return response.data;
      } catch (error) {
        if (error.response?.status === 429) {
          throw new Error(
            'Terlalu banyak percobaan, silakan tunggu beberapa saat',
          );
        }
        throw error;
      }
    },
    {
      onSuccess: data => {
        if (data.snap_token) {
          setSnapToken(data.snap_token);
          setShowPayment(true);
        }
      },
      onError: error => {
        console.error('Resume Payment Error:', error);
        // Tambahkan feedback ke user
        Alert.alert('Error', error.message || 'Gagal melanjutkan pembayaran');
      },
    },
  );

  if (showPayment && snapToken) {
    return (
      <Modal
        visible={true}
        onRequestClose={() => setShowPayment(false)}
        animationType="slide">
        <View style={{flex: 1}}>
          <WebView
            source={{
              uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`,
            }}
            startInLoadingState={true}
            onNavigationStateChange={navState => {
              console.log('Navigation state changed:', navState);

              if (navState.url.includes('#/success')) {
                AsyncStorage.getItem('currentTransaction')
                  .then(async storedTransaction => {
                    const storedPaymentType = await AsyncStorage.getItem(
                      'current_payment_type',
                    );
                    console.log('Stored payment type:', storedPaymentType);

                    const transaction = JSON.parse(storedTransaction);
                    console.log('full transaction response : ', transaction);
                    const callbackData = {
                      order_id: transaction.deposit_code,
                      transaction_status: 'settlement',
                      payment_type: storedPaymentType || 'bank_transfer',
                    };

                    try {
                      await axios.post('/midtrans-callback', callbackData);
                      console.log('Callback success');
                      await AsyncStorage.removeItem('current_payment_type');
                      queryClient.invalidateQueries('/auth/check-saldo');
                      queryClient.invalidateQueries('/auth/histori');
                      setShowPayment(false);
                      setModalSuccess(true);
                      setTimeout(() => {
                        setModalSuccess(false);
                        navigation.navigate('Deposit');
                      }, 3000);
                    } catch (error) {
                      setErrorMessage(error.response?.data?.message || error);
                      setModalFailed(true);
                      setTimeout(() => {
                        setModalFailed(false);
                      }, 3000);
                      console.error('Callback error:', error);
                      setShowPayment(false);
                    }
                  })
                  .catch(error => {
                    console.error('Error getting transaction data:', error);
                    setShowPayment(false);
                  });
              } else if (
                navState.url.includes('#/failed') ||
                navState.url.includes('#/cancel')
              ) {
                setShowPayment(false);
                navigation.navigate('Deposit');
              }
            }}
            onError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
              setShowPayment(false);
              navigation.navigate('Deposit');
            }}
            renderLoading={() => (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color={BLUE_COLOR} />
              </View>
            )}
          />
        </View>
      </Modal>
    );
  }
  const shareTransaction = async () => {
    try {
      const shareMessage = `Detail Deposit
Kode Transaksi : ${item?.deposit_code}
Jumlah Deposit : ${rupiah(item?.amount)}
Nomor Tujuan  : ${item?.user?.phone}
Status Deposit : ${item.status}
Status Pembayaran : ${item?.payment_status || 'Pending'}
Tanggal Deposit : ${new Date(item?.created_at || '').toLocaleDateString(
        'id-ID',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      )}`;

      const result = await Share.share({
        message: shareMessage,
        title: 'Detail Transaksi',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      console.error('Error sharing transaction:', error);
    }
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View className="p-3">
        <View
          className="w-full p-3 rounded-xl justify-between flex-col flex-wrap"
          style={{backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'}}>
          <View
            className="w-full p-3 rounded-xl flex-col"
            style={{
              borderColor: '#464646',
              borderStyle: 'dashed',
              borderWidth: 1,
            }}>
            <View className="flex-row justify-between items-center my-1 ">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Kode Transaksi
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.deposit_code}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Status Deposit
              </Text>
              <Text
                className="text-sm font-poppins-semibold"
                style={{color: statusColor(item?.status)}}>
                {textStatus(item?.status)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Jumlah Deposit
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item?.amount)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Metode Pembayaran
              </Text>
              <Text
                className="text-sm font-poppins-regular uppercase"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.payment_type || '-'}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Nomor Tujuan
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.user.phone}
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-1">
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Tanggal Deposit
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {new Date(item?.created_at || '').toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        className="mx-3 rounded-t-2xl p-3"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}>
        <View className="items-center space-y-3">
          {item.status === 'pending' && (
            <TouchableOpacity
              onPress={handleResumePayment}
              disabled={isLoading}
              className="w-full">
              <View
                className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                  opacity: isLoading ? 0.7 : 1,
                }}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className=" normal-case font-poppins-bold text-white">
                      Lanjutkan Pembayaran
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={shareTransaction} className="w-full">
            <View
              className="p-3 w-full rounded-2xl flex-row space-x-2 items-center justify-center"
              style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
              <IonIcons name="share-social" size={25} color={BLUE_COLOR} />
              <Text
                className="text-sm normal-case font-poppins-medium"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Bagi bukti bayar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ModalAfterProcess
        modalVisible={modalSuccess}
        title="Deposit Berhasil"
        subTitle={`Deposit sebesar ${rupiah(item?.amount)} berhasil`}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={24}
        bgIcon={'#e6f7e6'}
      />
      <ModalAfterProcess
        modalVisible={modalFailed}
        title="Deposit Gagal"
        subTitle={errorMessage || 'Silahkan Coba Lagi'}
        bgIcon={'#fde3e3'}
        icon={'close-sharp'}
        iconColor={'#f43f5e'}
        iconSize={24}
      />
    </View>
  );
}
