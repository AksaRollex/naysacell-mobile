import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
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

export default function BPJSKesehatan() {
  const isDarkMode = useColorScheme() === 'dark';
  const [customer_no, setCustomerNo] = useState('');

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
              placeholder="Masukan Nomor VA Keluarga  "
              onChange={text => setCustomerNo(text)}
              onDelete={() => setCustomerNo('')}
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

        <View style={[styles.bottom(isDarkMode)]}>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.buttonText}>Bayar</Text>
          </TouchableOpacity>
        </View>
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
    textAlign: 'center',
    color: WHITE_COLOR,
    fontFamily: 'Poppins-SemiBold',
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
    padding: 10,
  }),
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
});