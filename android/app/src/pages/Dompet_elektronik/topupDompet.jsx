import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  WHITE_BACKGROUND,
  windowWidth,
} from '../../utils/const';
import Input from '../../components/form/input';
import {product_dompet} from '../../data/product_dompet';
import BottomButton from '../../components/BottomButton';
import ProductList from '../../components/ProductList';

export default function TopupDompet({route}) {
  const {item} = route.params;

  const isDarkMode = useColorScheme() === 'dark';

  const [customer_no, setCustomerNo] = useState('');

  const [selectItem, setSelectedItem] = useState(null);

  const resetInput = () => {
    setCustomerNo('');
  };

  return (
    <>
      <View className="h-full w-full" style={{ backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND }}>
        <View style={styles.container}>
          <View style={{marginBottom: 15}}>
            <Text
              style={{
                fontFamily: MEDIUM_FONT,
                fontSize: 16,
                color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
              }}>
              {item}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Input
              value={customer_no}
              placeholder="Masukan Nomor meter"
              onChange={text => setCustomerNo(text)}
              type="numeric"
              lebar={windowWidth * 0.9}
              onDelete={resetInput}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 25,
              marginTop: 20,
            }}>
            {product_dompet.map(p => {
              return (
                <ProductList
                  selectItem={selectItem?.id}
                  action={() => setSelectedItem(p)}
                  // otomatis memunculkan data ( berapapun itemnya)
                  data={p}></ProductList>
              );
            })}
          </View>
        </View>

        {selectItem && (
          <BottomButton
            label="Lanjutkan"
            action={() => console.log(selectItem)}
            isLoading={false}
          />
        )}
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
