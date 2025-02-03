import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  LIGHT_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import {useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomModal from '../../components/BottomModal';
import {rupiah} from '../../libs/utils';
import Input from '../../components/form/input';
import ProductPaginate from '../../components/ProductPaginate';
import {Controller, useForm} from 'react-hook-form';
import axios from '../../libs/axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import ModalAfterProcess from '../../components/ModalAfterProcess';

export default function Pulsa({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [type, setType] = useState('Pulsa');
  const [selectItem, setSelectedItem] = useState('');
  const [nomorTujuan, setNomorTujuan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const pulsaRef = useRef();
  const dataRef = useRef();
  const product_type = ['Pulsa', 'Data'];
  const queryClient = useQueryClient();
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [phoneOperator, setPhoneOperator] = useState(null);

  const {control} = useForm();

  const phoneOperators = [
    {
      operator: 'Telkomsel',
      prefix: [
        '0811',
        '0812',
        '0813',
        '0821',
        '0822',
        '0823',
        '0851',
        '0852',
        '0853',
      ],
    },
    {
      operator: 'Indosat',
      prefix: ['0814', '0815', '0816', '0855', '0856', '0857', '0858'],
    },
    {
      operator: 'XL',
      prefix: ['0817', '0818', '0819', '0859', '0877', '0878'],
    },
    {
      operator: 'Axis',
      prefix: ['0831', '0832', '0833', '0838'],
    },
    {
      operator: 'Three',
      prefix: ['0895', '0896', '0897', '0898', '0899'],
    },
    {
      operator: 'Smartfren',
      prefix: [
        '0881',
        '0882',
        '0883',
        '0884',
        '0885',
        '0886',
        '0887',
        '0888',
        '0889',
      ],
    },
  ];

  useEffect(() => {
    if (nomorTujuan) {
      const prefix = nomorTujuan.substring(0, 4);
      const operatorMatch = phoneOperators.find(op =>
        op.prefix.includes(prefix),
      );

      setPhoneOperator(operatorMatch ? operatorMatch.operator : null);

      const isValid = nomorTujuan.length >= 11 && nomorTujuan.length <= 13;
      setIsValidNumber(isValid);
      setIsSearchEnabled(nomorTujuan.length >= 4);
    } else {
      setIsSearchEnabled(false);
      setPhoneOperator(null);
      setIsValidNumber(false);
    }
  }, [nomorTujuan]);

  const clearNomor = () => {
    setNomorTujuan('');
    setIsSearchEnabled(false);
    setPhoneOperator(null);
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
        transaction_data: response.data.data,
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

      setErrorMessage(errorMsg);
      setModalFailed(true);
      setTimeout(() => {
        setModalFailed(false);
      }, 2000);
    }
  };

  const {mutate: topup, isLoading} = useMutation(handleTopup);

  const productPulsa = ({item}) => {
    const isSelected = selectItem && selectItem.id === item.id;
    return (
      <TouchableOpacity
        className={`p-2 border rounded-xl relative ${
          isSelected
            ? `border-green-500 bg-${isDarkMode ? '[#252525]' : '[]'}`
            : `border-gray-500 bg-${isDarkMode ? '[#262626]' : '[]'}`
        }`}
        onPress={() => {
          setSelectedItem(isSelected ? null : item);
        }}>
        <View className="items-start flex-col ">
          <Text
            className="font-poppins-semibold text-sm"
            style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
            {item.product_name}
          </Text>
          <View className="w-full">
            <View className="justify-items-end items-end">
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
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}
        className="w-full h-full p-3">
        <SafeAreaView>
          <View>
            <View style={{rowGap: 10}}>
              <View className="flex-row items-center ">
                <View
                  className="p-3  rounded-xl"
                  style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
                  <Text
                    className="text-sm font-poppins-semibold my-1 "
                    style={{color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR}}>
                    Nomor Tujuan
                  </Text>
                  <View className="flex-row">
                    <Input
                      value={nomorTujuan}
                      placeholder="Masukkan Nomor Tujuan"
                      onChange={text => setNomorTujuan(text)}
                      type="numeric"
                      onDelete={clearNomor}
                    />
                    {/* {phoneOperator && (
                      <View className="bg-blue-500 p-4 rounded-xl">
                        <Text className="text-white font-poppins-bold uppercase text-xs">
                          {phoneOperator}
                        </Text>
                      </View>
                    )} */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>

        {isSearchEnabled ? (
          type === 'Pulsa' ? (
            <View
              className="w-full flex-1 mt-4 rounded-xl p-3"
              style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
              {/* Tab Navigation */}
              <View
                className="w-full mb-3 "
                style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
                <View className="flex-row justify-between">
                  {product_type.map(tabType => (
                    <TouchableOpacity
                      key={tabType}
                      style={[
                        styles.buttonTab,
                        {
                          borderBottomColor:
                            type === tabType ? BLUE_COLOR : GREY_COLOR,
                          borderBottomWidth: type === tabType ? 2 : 1,
                        },
                      ]}
                      onPress={() => setType(tabType)}>
                      <Text
                        style={[
                          styles.buttonTabLabel(isDarkMode),
                          {
                            color:
                              type === tabType
                                ? BLUE_COLOR
                                : isDarkMode
                                ? DARK_COLOR
                                : LIGHT_COLOR,
                          },
                        ]}>
                        {tabType}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <ProductPaginate
                url="/master/product/prepaid"
                editUrl="/master/product/prepaid/{id}"
                renderItem={productPulsa}
                ref={pulsaRef}
                payload={{
                  product_category: 'Pulsa',
                  product_provider: phoneOperator,
                }}
                onItemPress={selectedItem => {
                  setSelectedItem(selectedItem);
                }}
              />
            </View>
          ) : (
            <View
              className="w-full flex-1 mt-4 rounded-xl p-3"
              style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
              {/* Tab Navigation */}
              <View
                className="w-full mb-3 "
                style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
                <View className="flex-row justify-between">
                  {product_type.map(tabType => (
                    <TouchableOpacity
                      key={tabType}
                      style={[
                        styles.buttonTab,
                        {
                          borderBottomColor:
                            type === tabType ? BLUE_COLOR : GREY_COLOR,
                          borderBottomWidth: type === tabType ? 2 : 1,
                        },
                      ]}
                      onPress={() => setType(tabType)}>
                      <Text
                        style={[
                          styles.buttonTabLabel(isDarkMode),
                          {
                            color:
                              type === tabType
                                ? BLUE_COLOR
                                : isDarkMode
                                ? DARK_COLOR
                                : LIGHT_COLOR,
                          },
                        ]}>
                        {tabType}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <ProductPaginate
                url="/master/product/prepaid"
                editUrl="/master/product/prepaid/{id}"
                renderItem={productPulsa}
                ref={dataRef}
                payload={{
                  product_category: 'Data',
                  product_provider: phoneOperator,
                }}
                onItemPress={selectedItem => {
                  setSelectedItem(selectedItem);
                }}
              />
            </View>
          )
        ) : (
          <View className=" justify-center items-center">
            <Text className="text-red-500 mt-2 text-sm font-poppins-regular">
              Masukkan nomor minimal 4 digit untuk melihat produk
            </Text>
          </View>
        )}

        {/* Ganti kondisi selectItem menjadi seperti ini */}
        {selectItem && isSearchEnabled && (
          <View className="mt-3">
            <TouchableOpacity
              className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
              style={{
                backgroundColor: BLUE_COLOR,
                // opacity: isLoading ? 0.7 : 1,
              }}
              disabled={!isValidNumber}
              onPress={() => setShowModal(true)}>
              {/* Modifikasi juga pesan error-nya */}

              {selectItem && isSearchEnabled && !isValidNumber ? (
                <Text className="text-red-100 text-xs font-poppins-bold text-center">
                  Mohon Untuk Memasukkan Nomor Dengan Benar
                </Text>
              ) : (
                <Text
                  className="text-white text-sm font-poppins-bold"
                  style={[{opacity: isValidNumber ? 1 : 0.5}]}>
                  LANJUTKAN
                </Text>
              )}
            </TouchableOpacity>
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
                rincian pembelian
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
                rincian pembayaran
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
            <View style={[styles.bottom(isDarkMode)]}>
              <TouchableOpacity
                className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                  opacity: isLoading ? 0.7 : 1,
                }}
                disabled={isLoading}
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

const styles = StyleSheet.create({
  buttonTab: {
    width: '47%',
    borderBottomColor: GREY_COLOR,
    borderBottomWidth: 1,
    padding: 5,
  },
  buttonTabLabel: isDarkMode => ({
    textAlign: 'center',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontFamily: 'Poppins-SemiBold',
  }),
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  bottom: isDarkMode => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    marginHorizontal: HORIZONTAL_MARGIN,
    marginVertical: 10,
  }),

  buttonText: {
    color: WHITE_COLOR,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
  modalData: isDarkMode => ({
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    paddingVertical: 5,
    rowGap: 5,
  }),
  labelModalData: isDarkMode => ({
    fontFamily: 'Poppins-SemiBold',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontSize: FONT_NORMAL,
  }),
  valueModalData: isDarkMode => ({
    fontFamily: 'Poppins-Regular',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontSize: FONT_NORMAL,
  }),
});
