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
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import Input from '../../components/form/input';
import { rupiah } from '../../libs/utils';
import ProductPaginate from '../../components/ProductPaginate';
import BottomModal from '../../components/BottomModal';

export default function PLNPascaBayar({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const [nomorTujuan, setNomorTujuan] = useState('');

  const [selectItem, setSelectedItem] = useState(null);
  const paginateRef = useRef();

  const [ showModal, setShowModal ] = useState(false);

  const productPLN = ({item}) => {
    return (
      <TouchableOpacity
        className="p-2 border border-gray-500 rounded-xl m-1 bg-[#404040]"
        onPress={() => {
          setSelectedItem(item);
          setShowModal(true);
        }}>
        <View className="items-start flex-col ">
          <Text className="font-poppins-semibold text-base text-white">
            {item.product_name}
          </Text>
          <View className="w-full">
            <View className="justify-items-end items-end">
              <Text
                className="font-poppins-regular text-sm text-end "
                style={{color: WHITE_COLOR}}>
                {rupiah(item.product_transaction_admin)}
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
          backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        }}>
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Input
              value={nomorTujuan}
              placeholder="Masukan Nomor Meter"
              onChange={text => setNomorTujuan(text)}
              onDelete={() => setNomorTujuan('')}
              lebar={'100%'}
              type="numeric"
            />
            <TouchableOpacity style={styles.buttonSearch}>
              <Text style={styles.buttonText}>Cek</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoPelanggan(isDarkMode)}>
            <View style={styles.contentBlock(isDarkMode)}>
              <Text style={styles.label(isDarkMode)}>Nama</Text>
              <Text style={styles.value(isDarkMode)}>Lorem Ipsum</Text>
            </View>
            <View style={styles.contentBlock(isDarkMode)}>
              <Text style={styles.label(isDarkMode)}>ID Pelanggan</Text>
              <Text style={styles.value(isDarkMode)}>123456789</Text>
            </View>
            <View style={styles.contentBlock(isDarkMode)}>
              <Text style={styles.label(isDarkMode)}>Daya / Segmen Power</Text>
              <Text style={styles.value(isDarkMode)}> 900 kwh</Text>
            </View>
            <View style={styles.contentBlock(isDarkMode)}>
              <Text style={styles.label(isDarkMode)}>Lembar Tagihan</Text>
              <Text style={styles.value(isDarkMode)}> 2 lbr</Text>
            </View>
            <View style={styles.contentBlock(isDarkMode)}>
              <Text style={styles.label(isDarkMode)}>Total Tagihan</Text>
              <Text style={styles.value(isDarkMode)}>120.000</Text>
            </View>
          </View>
        </View>
        <ProductPaginate
          renderItem={productPLN}
          url="/master/product/pasca"
          ref={paginateRef}
          payload={{
            product_provider: 'PLN NONTAGLIS,PLN PASCABAYAR',
          }}
        />
        {selectItem && (
          <View style={[styles.bottom(isDarkMode)]}>
            <TouchableOpacity style={styles.bottomButton} onPress={() => setShowModal(true)}>
              <Text style={styles.buttonLabel}>Bayar</Text>
            </TouchableOpacity>
          </View>
        )}
        <BottomModal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          title="Detail Transaksi">
          <View>
            <View style={styles.modalData(isDarkMode)}>
              <Text style={styles.labelModalData(isDarkMode)}>
                Nomor Tujuan
              </Text>
              <Text style={styles.valueModalData(isDarkMode)}>
                {nomorTujuan}
              </Text>
            </View>
            <View style={styles.modalData(isDarkMode)}>
              <Text style={styles.labelModalData(isDarkMode)}>Produk </Text>
              <Text style={styles.valueModalData(isDarkMode)}>
                {selectItem?.product_name}
              </Text>
            </View>
            <View style={styles.modalData(isDarkMode)}>
              <Text style={styles.labelModalData(isDarkMode)}>Harga </Text>
              <Text style={styles.valueModalData(isDarkMode)}>
                {rupiah(selectItem?.product_transaction_admin)}
              </Text>
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
  formGroup: {
    flexDirection: 'column',
    columnGap: 5,
  },
  buttonSearch: {
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: WHITE_COLOR,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  infoPelanggan: isDarkMode => ({
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    borderRadius: 10,
  }),
  contentBlock: isDarkMode => ({
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    marginTop: 10,
    rowGap: 5,
  }),
  label: isDarkMode => ({
    fontFamily: 'Poppins-SemiBold',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
  value: isDarkMode => ({
    fontFamily: 'Poppins-Regular',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
  productWrapper: isDarkMode => ({
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 10,
    padding: 20,
    width: '45%',
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }),
  productLabel: isDarkMode => ({
    fontFamily: MEDIUM_FONT,
    fontSize: FONT_NORMAL,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
  productPrice: isDarkMode => ({
    fontFamily: REGULAR_FONT,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
  bottom: isDarkMode => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    marginHorizontal: HORIZONTAL_MARGIN,
    marginVertical : 10,
  }),
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
