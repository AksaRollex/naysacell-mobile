import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  FONT_SEDANG,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';

export default function SuccessNotifDeposit({route}) {
  const isDarkMode = useColorScheme() === 'dark';
  //   const {nomor_tujuan, nominal_deposit, metode_pembayaran} = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            width: 200,
            height: 200,
            marginTop: 15,
          }}>
          <LottieView
            source={require('../../../assets/lottie/success-animation.json')}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={{marginHorizontal: HORIZONTAL_MARGIN}}>
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>Nomor Tujuan </Text>
          <Text style={styles.valueModalData(isDarkMode)}>
            {/* {item?.nomor_tujuan || '085336970707'} */}
            085336970707
          </Text>
        </View>

        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>Jumlah Deposit</Text>
          <Text style={styles.valueModalData(isDarkMode)}>
            {/* {rupiah(item?.nominal_deposit || 0)} */}
            {rupiah(10000)}
          </Text>
        </View>
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>
            Metode Pembayaran
          </Text>
          <Text style={styles.valueModalData(isDarkMode)}>
            {/* {item?.metode_pembayaran || 'Transfer'} */}
            Transfer
          </Text>
        </View>
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>
            Tanggal Transaksi
          </Text>
          <Text style={styles.valueModalData(isDarkMode)}>
            {/* {item?.created_at || '2022-01-01 00:00:00'} */}
            2022-01-01 00:00:00
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalData: isDarkMode => ({
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    paddingVertical: 5,
    rowGap: 5,
  }),
  labelModalData: isDarkMode => ({
    fontFamily: REGULAR_FONT,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontSize: FONT_SEDANG,
  }),
  valueModalData: isDarkMode => ({
    fontFamily: REGULAR_FONT,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontSize: FONT_NORMAL,
  }),
});
