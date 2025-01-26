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
  HORIZONTAL_MARGIN,
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
        className="w-full h-full"
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}>
        <View style={styles.container}>
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

          {message !== '' && <Text style={styles.errorMessage}>{message}</Text>}

          {isValidNumber && !showProducts && (
            <TouchableOpacity
              style={[styles.bottomButton, {marginTop: 10}]}
              onPress={handleNext}>
              <Text style={styles.buttonText}>Lanjut</Text>
            </TouchableOpacity>
          )}
        </View>
        {showProducts && (
          <View
            style={{flex: 0.32, marginHorizontal: HORIZONTAL_MARGIN}}
            className="my-4 h-full">
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

        {selectItem && (
          <View style={[styles.bottom(isDarkMode)]}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Lanjutkan</Text>
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
                className="text-center capitalize  text-sm font-poppins-medium mt-2 mb-4"
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
                className="text-center capitalize text-sm font-poppins-medium mt-2 mb-4"
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
                style={styles.bottomButton}
                onPress={() =>
                  navigation.navigate('SuccessNotif', {
                    nomorTujuan: nomorTujuan,
                    item: selectItem,
                  })
                }>
                <Text style={styles.buttonLabel}>Bayar</Text>
              </TouchableOpacity>
            </View>
          )}
        </BottomModal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HORIZONTAL_MARGIN,
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
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 12,
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
