import {
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_COLOR,
} from '../../utils/const';
import BottomModal from '../../components/BottomModal';
import Input from '../../components/form/input';
import {rupiah} from '../../libs/utils';
import ProductPaginate from '../../components/ProductPaginate';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../libs/axios';

export default function Shopeepay({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [nomorTujuan, setNomorTujuan] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();

  const paginateRef = useRef();

  const resetInput = () => {
    setNomorTujuan('');
    setShowProducts(false);
    setSelectedItem(null);
    setMessage('');
  };

  const isValidNumber = nomorTujuan.length >= 3;

  const handleNext = () => {
    if (nomorTujuan.length < 8) {
      setMessage('Nomor Minimal 8 Digit Ya!');
      setShowProducts(false);
    } else {
      setMessage('');
      setShowProducts(true);
    }
  };

  const [userId, setUserId] = useState(null);
  const [nameCustomer, setNameCustomer] = useState('');

  useEffect(() => {
    axios
      .get('auth/me')
      .then(res => {
        setNameCustomer(res.data.user?.name);
        setUserId(res.data.user?.id);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleTopup = async () => {
    try {
      if (!userId) {
        Alert.alert('Error', 'User data tidak ditemukan');
        return;
      }

      const response = await axios.post('/auth/submit-product', {
        product_id: selectItem?.id,
        customer_no: nomorTujuan,
        quantity: 1,
        product_name: selectItem?.product_name,
        product_price: selectItem?.product_price,
        customer_name: nameCustomer,
        user_id: userId,
      });
      queryClient.invalidateQueries('/auth/histori');
      navigation.replace('SuccessNotif', {
        item: selectItem,
        customer_no: nomorTujuan,
        transaction_data: response.data.transaction,
      });
    } catch (error) {
      let errorMsg = error.response?.data?.message || 'Terjadi kesalahan';

      if (error.response?.data?.details) {
        const details = error.response.data.details;
        errorMsg += `\nSaldo: ${details.saldo_sekarang}\nTotal: ${details.total_pembelian}\nKurang: ${details.kekurangan_saldo}`;
      }

      if (error.response?.data?.suggestion) {
        errorMsg += `\n${error.response.data.suggestion}`;
      }

      console.log(error);
      setErrorMessage(errorMsg);
      setModalFailed(true);
      setTimeout(() => {
        setModalFailed(false);
      }, 3000);
    }
  };

  const {mutate: topup, isLoading} = useMutation(handleTopup);

  const productShopeepay = ({item}) => {
    const isSelected = selectItem && selectItem.id === item.id;
    return (
      <TouchableOpacity
        className={`p-2 border rounded-xl h-20 relative ${
          isSelected
            ? `border-green-500 bg-${isDarkMode ? '[#252525]' : '[]'}`
            : `border-gray-500 bg-${isDarkMode ? '[#262626]' : '[]'}`
        }`}
        onPress={() => {
          setSelectedItem(isSelected ? null : item);
        }}>
        <View className="items-start flex-col">
          <Text
            className="font-poppins-semibold text-sm "
            style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
            {item.product_name}
          </Text>
          <View className="w-full">
            <View className="justify-items-end items-start">
              <Text
                className="font-poppins-regular text-sm"
                style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                {rupiah(item.product_price)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        className="w-full h-full p-3"
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}>
        <View>
          <View
            className="p-3  rounded-xl"
            style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
            <Text
              className="text-sm font-poppins-semibold my-1 "
              style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
              Nomor Tujuan
            </Text>
            <Input
              value={nomorTujuan}
              placeholder="Masukkan Nomor Tujuan"
              onChange={text => {
                setNomorTujuan(text);
                setMessage('');
                if (showProducts) {
                  setShowProducts(false);
                  setSelectedItem(null);
                }
              }}
              type="numeric"
              onDelete={resetInput}
            />
          </View>

          {message !== '' && (
            <Text className="text-red-400 mt-1 text-xs font-poppins-regular">
              {message}
            </Text>
          )}

          {isValidNumber && !showProducts && (
            <TouchableOpacity
              className="w-full rounded-xl mx-auto my-3 px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                // opacity: isLoading ? 0.7 : 1,
              }}
              onPress={handleNext}>
              <Text className="text-white text-sm font-poppins-bold">
                LANJUTKAN
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {showProducts && (
          <View style={{flex: 1}} className="my-4 h-full">
            <View
              className="w-full h-full rounded-xl p-3"
              style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
              <ProductPaginate
                renderItem={productShopeepay}
                url="/master/product/prepaid"
                ref={paginateRef}
                payload={{
                  product_category: 'E-Money',
                  product_provider: 'ShopeePay',
                }}
              />
            </View>
          </View>
        )}

        <BottomModal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          title="Konfirmasi Pesanan">
          <View
            className="w-full p-3 rounded-xl   justify-between flex-col flex-wrap"
            style={{
              backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
            }}>
            <View
              className="w-full p-3 rounded-xl flex-col "
              style={{
                borderColor: '#464646',
                borderStyle: 'dashed',
                borderWidth: 1,
              }}>
              <Text
                className="text-center normal-case  text-sm font-poppins-medium mt-2 mb-4"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Rincian pembelian
              </Text>
              <View className="flex-row justify-between items-center my-1 ">
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Layanan
                </Text>
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {selectItem?.product_provider}
                </Text>
              </View>
              <View className="flex-row justify-between items-center my-1 ">
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Nomor Tujuan
                </Text>
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {nomorTujuan}
                </Text>
              </View>
              <View className="flex-row justify-between items-center my-1 ">
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Produk
                </Text>
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {selectItem?.product_name}
                </Text>
              </View>
              <View className="flex-row justify-between items-center my-1 ">
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Harga
                </Text>
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {rupiah(selectItem?.product_price)}
                </Text>
              </View>
            </View>
          </View>
          <View
            className="w-full p-3 rounded-xl  mt-5 justify-between flex-col flex-wrap"
            style={{
              backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
            }}>
            <View
              className="w-full p-3 rounded-xl flex-col "
              style={{
                borderColor: '#464646',
                borderStyle: 'dashed',
                borderWidth: 1,
              }}>
              <Text
                className="text-center normal-case text-sm font-poppins-medium mt-2 mb-4"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Rincian pembayaran
              </Text>
              <View className="flex-row justify-between items-center my-1 ">
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Harga Produk
                </Text>
                <Text
                  className="text-sm font-poppins-regular"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {rupiah(selectItem?.product_price)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center my-1 ">
                <Text
                  className="text-sm font-poppins-semibold"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Total
                </Text>
                <Text
                  className="text-sm font-poppins-semibold"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {rupiah(selectItem?.product_price)}
                </Text>
              </View>
            </View>
          </View>

          {selectItem && (
            <View className="my-3">
              <TouchableOpacity
                className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                  opacity: isLoading ? 0.7 : 1,
                }}
                onPress={() => topup()}>
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white text-sm font-poppins-bold uppercase">
                    Bayar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </BottomModal>

        {selectItem && (
          <View>
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                opacity: isLoading ? 0.7 : 1,
              }}
              onPress={() => setShowModal(true)}>
              <Text className="text-white text-sm font-poppins-bold">
                LANJUTKAN
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <ModalAfterProcess
          modalVisible={modalFailed}
          title={'Kesalahan Pada Pembayaran'}
          subTitle={errorMessage || 'Saldo Tidak Mencukupi'}
          icon={'close-sharp'}
          iconColor={'#f43f5e'}
          iconSize={24}
        />
      </View>
    </>
  );
}
