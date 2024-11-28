import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  FONT_SEDANG,
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
import FullModal from '../../components/FullModal';
import {wilayah} from '../../data/wilayah_pdam';
import { ArrowRight } from '../../../assets';
import BottomButton from '../../components/BottomButton';

export default function PDAM() {
  const isDarkMode = useColorScheme() === 'dark';
  const [customer_no, setCustomerNo] = useState('');
  const [showModalWilayah, setShowModalWilayah] = useState(false);
  const [wilayahPDAM, setWilayah] = useState(null);
  const handleSetWilayah = item => {
    setWilayah(item);
    setShowModalWilayah(!showModalWilayah);
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
              value={customer_no}
              placeholder="Masukan Nomor motor  "
              onChange={text => setCustomerNo(text)}
              onDelete={() => setCustomerNo('')}
              type="numeric"
            />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
                borderRadius: 5,
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
                padding: 10,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowModalWilayah(!showModalWilayah)}>
              <Text
                style={{
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                  fontFamily: REGULAR_FONT,
                }}>
                {wilayahPDAM ? wilayahPDAM?.label : 'Pilih Wilayah'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSearch}>
              <Text style={styles.buttonText}>Cek</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoPelanggan(isDarkMode)}>
            <View className="pb-2">
              <View style={styles.contentBlock(isDarkMode)}>
                <Text style={styles.label(isDarkMode)}>Nama</Text>
                <Text style={styles.value(isDarkMode)}>Lorem Ipsum</Text>
              </View>
              <View style={styles.contentBlock(isDarkMode)}>
                <Text style={styles.label(isDarkMode)}>ID Pelanggan</Text>
                <Text style={styles.value(isDarkMode)}>123456789</Text>
              </View>
              <View style={styles.contentBlock(isDarkMode)}>
                <Text style={styles.label(isDarkMode)}>Jumlah Peserta</Text>
                <Text style={styles.value(isDarkMode)}> 2</Text>
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
        </View>
        <BottomButton
          label="Bayar Tagihan"
          action={() => console.log(selectItem)}
          isLoading={false}
        />
        <FullModal
          visible={showModalWilayah}
          onDismiss={() => setShowModalWilayah(!showModalWilayah)}
          title="Wilayah PDAM">
          <View>
            <FlatList
              data={wilayah}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.wilayahButton(isDarkMode)}
                  onPress={() => handleSetWilayah(item)}>
                  <Text style={styles.textOption(isDarkMode)}>
                    {item.label}
                  </Text>
                  <ArrowRight />
                </TouchableOpacity>
              )}
            />
          </View>
        </FullModal>
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
  textOption: isDarkMode => ({
    fontFamily: 'Poppins-Regular',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
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
    padding: 10,
  }),
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
  wilayahButton: isDarkMode => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    padding: 10,
    justifyContent: 'space-between',
  }),
});
