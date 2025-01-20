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
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import BottomModal from '../../components/BottomModal';
import Input from '../../components/form/input';
import {rupiah} from '../../libs/utils';
import ProductPaginate from '../../components/ProductPaginate';
import {CheckProduct} from '../../../assets';

export default function Shopeepay({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [nomorTujuan, setNomorTujuan] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectItem, setSelectedItem] = useState(null);

  const paginateRef = useRef();
  const resetInput = () => {
    setCustomerNo('');
  };

  const productShopeepay = ({item}) => {
    const isSelected = selectItem && selectItem.id === item.id;
    return (
      <View className="flex-row">
        <TouchableOpacity
          className={`p-2 border rounded-xl w-full m-1 relative ${
            isSelected
              ? 'border-green-500 bg-[#2a2a2a]'
              : 'border-gray-500 bg-[#404040]'
          }`}
          onPress={() => {
            setSelectedItem(isSelected ? null : item);
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
                  {rupiah(item.product_price)}
                </Text>
              </View>
            </View>
          </View>
          {isSelected && (
            <CheckProduct
              width={20}
              style={{position: 'absolute', right: 7, top: 2}}
            />
          )}
        </TouchableOpacity>
      </View>
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
              placeholder="Masukkan Nomor Tujuan"
              onChange={text => setNomorTujuan(text)}
              type="numeric"
              onDelete={resetInput}
              style={{fontFamily: 'Poppins-Regular'}}
            />
          </View>
        </View>
        <ProductPaginate
          renderItem={productShopeepay}
          url="/master/product/prepaid"
          ref={paginateRef}
          payload={{
            product_category: 'E-Money',
            product_provider: 'ShopeePay',
          }}
        />

        {selectItem && (
          <View style={[styles.bottom(isDarkMode)]}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Bayar</Text>
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
                {rupiah(selectItem?.product_buyer_price)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 5,
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
