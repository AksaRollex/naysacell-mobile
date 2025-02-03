import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREY_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import BottomModal from '../../components/BottomModal';
import Input from '../../components/form/input';
import {rupiah} from '../../libs/utils';
import ProductPaginate from '../../components/ProductPaginate';

export default function Shopeepay({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [nomorTujuan, setNomorTujuan] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');

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

  const productShopeepay = ({item}) => {
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
            <Text className="text-red-500 mt-1 text-sm font-poppins-regular">
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
            <View className="my-3">
              <TouchableOpacity
                className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                  // opacity: isLoading ? 0.7 : 1,
                }}
                onPress={() =>
                  navigation.navigate('SuccessNotif', {
                    nomorTujuan: nomorTujuan,
                    item: selectItem,
                  })
                }>
                <Text className="text-white text-sm font-poppins-bold">
                  BAYAR
                </Text>
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
                // opacity: isLoading ? 0.7 : 1,
              }}
              onPress={() => setShowModal(true)}>
              <Text className="text-white text-sm font-poppins-bold">
                LANJUTKAN
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 15,
  },
  errorMessage: {
    color: '#FF4B4B',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'left',
  },
  bottom: isDarkMode => ({
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }),
  buttonText: {
    color: WHITE_COLOR,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
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
