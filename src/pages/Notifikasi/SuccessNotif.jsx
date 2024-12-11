import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';

export default function SuccessNotif({route}) {
  const {item, nomorTujuan} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
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
        {/* {nomorTujuan && (
          <View style={styles.modalData(isDarkMode)}>
            <Text style={styles.labelModalData(isDarkMode)}>Nomor Tujuan </Text>
            <Text style={styles.valueModalData(isDarkMode)}>{nomorTujuan}</Text>
          </View>
        )} */}
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>Nomor Tujuan </Text>
          <Text style={styles.valueModalData(isDarkMode)}>{nomorTujuan || 'Kosong'}</Text>
        </View>
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>Produk </Text>
          <Text style={styles.valueModalData(isDarkMode)}>
            {item?.product_name}
          </Text>
        </View>
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>Harga </Text>
          <Text style={styles.valueModalData(isDarkMode)}>
            {rupiah(item?.product_buyer_price)}
          </Text>
        </View>
        <View style={styles.modalData(isDarkMode)}>
          <Text style={styles.labelModalData(isDarkMode)}>SN </Text>
          <Text style={styles.valueModalData(isDarkMode)}>3534534534534</Text>
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
