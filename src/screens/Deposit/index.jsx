import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  GREY_COLOR,
  windowWidth,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../libs/axios';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import {Controller, useForm} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductPaginate from '../../components/ProductPaginate';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Deposit({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [depositAmount, setDepositAmount] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const paginateRef = useRef();

  const [showPayment, setShowPayment] = useState(false);
  const [snapToken, setSnapToken] = useState('');

  const {
    control,
    trigger,
    formState: {errors},
  } = useForm();

  const handlePresetAmount = amount => {
    setDepositAmount(amount.toString());
  };

  const queryClient = useQueryClient();
  const refetch = () => {
    queryClient.invalidateQueries(['/auth/check-saldo']);
  };

  const {mutate: handleTopup, isLoading} = useMutation(
    async () => {
      const requestData = {
        amount: parseInt(depositAmount.replace(/\D/g, '')) || 0,
      };

      const response = await axios.post('/auth/topup', requestData);
      const {snap_token, transaction} = response.data;
      AsyncStorage.setItem('currentTransaction', JSON.stringify(transaction));
      console.log('snap_token', snap_token);
      console.log('transaction start : ', transaction);
      console.log('Topup Response:', response.data);

      return response.data;
    },
    {
      onSuccess: data => {
        console.log('Snap Token:', data.snap_token);
        if (data.snap_token) {
          setSnapToken(data.snap_token);
          setShowPayment(true);
        }
      },
      onError: error => {
        console.error('Topup Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        const errorMsg = error.response?.data?.message || 'Deposit gagal';
        setErrorMessage(errorMsg);
        setModalFailed(true);
        setTimeout(() => {
          setModalFailed(false);
        }, 3000);
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

                    console.log('Callback data:', callbackData);

                    try {
                      await axios.post('/midtrans-callback', callbackData);
                      console.log('Callback success');
                      await AsyncStorage.removeItem('current_payment_type');
                      queryClient.invalidateQueries('/auth/check-saldo');
                      refetch();
                      queryClient.invalidateQueries('/auth/histori');
                      setShowPayment(false);
                      setSuccessModal(true);
                      setTimeout(() => {
                        setSuccessModal(false);
                      }, 3000);
                      navigation.navigate('Deposit');
                    } catch (error) {
                      console.error('Callback error:', error);
                      setErrorMessage('Gagal memproses pembayaran');
                      setModalFailed(true);
                      setTimeout(() => {
                        setModalFailed(false);
                      }, 3000);
                    }
                  })
                  .catch(error => {
                    console.error('Error getting transaction data:', error);
                    setShowPayment(false);
                    setModalFailed(true);
                    setTimeout(() => {
                      setModalFailed(false);
                    }, 3000);
                  });
              } else if (
                navState.url.includes('#/failed') ||
                navState.url.includes('#/cancel')
              ) {
                setShowPayment(false);
                setErrorMessage('Pembayaran gagal atau dibatalkan');
                setModalFailed(true);
                setTimeout(() => {
                  setModalFailed(false);
                }, 3000);
                (async () => {
                  try {
                    const authStatus = await axios.get('/auth/check-status');
                    if (authStatus.data.isAuthenticated) {
                      navigation.navigate('Deposit');
                    }
                  } catch (error) {
                    console.error('Auth check failed:', error);
                  }
                })();
              }
            }}
            injectedJavaScript={`
      window.addEventListener('message', function(event) {
        window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
      });
      
      (function() {
        let lastUrl = window.location.href;
        new MutationObserver(() => {
          const url = window.location.href;
          if (url !== lastUrl) {
            lastUrl = url;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'urlChanged',
              url: url
            }));
          }
        }).observe(document, {subtree: true, childList: true});
      })();
      true;
    `}
            onError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
              setShowPayment(false);
              setErrorMessage('Terjadi kesalahan pada pembayaran');
              setModalFailed(true);
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

  const onSubmit = () => {
    if (!depositAmount) {
      setErrorMessage('Nominal Deposit tidak boleh kosong');
      setModalFailed(true);
      setTimeout(() => setModalFailed(false), 3000);
      return;
    }
    handleTopup();
  };

  const colorStatusColor = status => {
    if (status === 'success') {
      return '#22c55e';
    } else if (status === 'pending') {
      return '#3b82f6';
    } else if (status === 'failed') {
      return '#ef4444';
    } else {
      return '#3b82f6';
    }
  };

  const historiDepositCards = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailHistoryDeposit', {item})}
        className="rounded-xl p-2 flex-col"
        style={{
          backgroundColor: isDarkMode ? '#232323' : '#f9f9f9',
          shadowColor: isDarkMode ? '#fff' : '#000',
        }}>
        <View
          id="cardTitle"
          className="flex-row  justify-between items-center"
          style={{borderColor: isDarkMode ? GREY_COLOR : LIGHT_COLOR}}>
          <Text
            className="font-poppins-semibold text-[13px]"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Jumlah Deposit : {rupiah(item?.amount || 0)}
          </Text>

          <MaterialCommunityIcons
            name="transfer"
            color={colorStatusColor(item?.status)}
            size={27}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View
        className="p-3  rounded-xl"
        style={{
          backgroundColor: isDarkMode ? '#262626' : '#fff',
          marginHorizontal: HORIZONTAL_MARGIN,
          marginTop: 15,
        }}>
        <View className="">
          <Controller
            control={control}
            name="depositAmount"
            rules={{
              required: 'Nominal Deposit tidak boleh kosong',
              validate: value => {
                if (!value) return 'Nominal Deposit tidak boleh kosong';
                const numericValue = parseInt(value.replace(/\D/g, ''));
                if (isNaN(numericValue) || numericValue < 1000) {
                  return 'Minimal deposit adalah Rp 1.000';
                }
                if (numericValue > 1000000) {
                  return 'Maksimal deposit adalah Rp 1.000.000';
                }
                return true;
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <View>
                <Text
                  className="font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Jumlah Deposit
                </Text>
                <TextInput
                  placeholder="Nominal Deposit"
                  value={depositAmount}
                  onChangeText={text => {
                    const numericValue = text.replace(/\D/g, '');
                    setDepositAmount(numericValue);
                    onChange(numericValue);
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={SLATE_COLOR}
                  onBlur={() => {
                    onBlur();
                    trigger('depositAmount');
                  }}
                  className={`h-12 w-full rounded-xl font-poppins-regular px-4  border-[0.5px] ${
                    error ? 'border-red-500' : 'border-stone-600'
                  }`}
                />
                {error && (
                  <Text className="text-red-400 mt-1 font-poppins-regular text-xs">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View
          id="referensi_nominal"
          className="py-2 flex flex-row flex-wrap justify-between items-center">
          {[100000, 150000, 300000, 400000, 600000, 900000].map(
            (amount, index) => (
              <TouchableOpacity
                key={index}
                className="px-1 py-4 my-1 rounded-xl justify-center items-center"
                style={{
                  backgroundColor: isDarkMode ? '#232323' : '#f9f9f9',
                  width: windowWidth * 0.255,
                }}
                onPress={() => handlePresetAmount(amount)}>
                <Text
                  className="font-poppins-regular text-[13px]"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {rupiah(amount)}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
        <View className=" py-2 ">
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

      <View
        className="p-3  rounded-xl"
        style={{
          backgroundColor: isDarkMode ? '#262626' : '#fff',
          marginHorizontal: HORIZONTAL_MARGIN,
          marginVertical: 15,
        }}>
        <Text
          className="font-poppins-regular"
          style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
          Riwayat Deposit
        </Text>
        <View className="-mx-2 h-[350px]">
          <ProductPaginate
            url="/auth/histori-deposit"
            renderItem={historiDepositCards}
            ref={paginateRef}
          />
        </View>
        <View className="items-end justify-end  w-full mt-5">
          <TouchableOpacity
            className="flex-row items-end justify-end"
            onPress={() => {
              navigation.navigate('HistoryDeposit');
            }}>
            <Text
              value
              className="text-xs font-poppins-regular "
              style={{color: isDarkMode ? SLATE_COLOR : SLATE_COLOR}}>
              Lihat Semua Riwayat Deposit
            </Text>
            <MaterialCommunityIcons
              name="chevron-double-right"
              size={17}
              color={isDarkMode ? SLATE_COLOR : SLATE_COLOR}
            />
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
        subTitle={errorMessage || 'Silahkan Coba Lagi'}
        bgIcon={'#fde3e3'}
        icon={'close-sharp'}
        iconColor={'#f43f5e'}
        iconSize={24}
      />
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
  paymentLogo: {
    width: 80,
    height: 50,
  },
  paymentName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
});
