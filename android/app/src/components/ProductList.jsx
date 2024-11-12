import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREY_COLOR,
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  WHITE_BACKGROUND,
} from '../utils/const';
import {CheckProduct} from '../assets';
import { rupiah } from '../libs/utils';

export default function ProductList({action, selectItem, data}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <TouchableOpacity
        style={[styles.productWrapper(isDarkMode), selectItem === data.id]}
        onPress={action}>
        <Text style={styles.productLabel(isDarkMode)}>{data.label}</Text>
        <Text style={styles.productPrice(isDarkMode)}>
          {rupiah(data.price)}
        </Text>
        {selectItem === data.id && (
          <CheckProduct
            width={20}
            style={{position: 'absolute', right: 7, top: 2}}
          />
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  productWrapper: isDarkMode => ({
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 10,
    padding: 20,
    width: '47%',
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
});
