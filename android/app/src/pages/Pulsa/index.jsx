import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
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
  GREEN_COLOR,
  FONT_SEDANG,
  LIGHT_BACKGROUND,
} from '../../utils/const';
import {useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {product_data, product_pulsa} from '../../data/product_pulsa';
import {CheckProduct} from '../../assets';
import BottomModal from '../../components/BottomModal';
import {rupiah} from '../../utils/utils';
import Input from '../../components/form/input';

export default function Pulsa({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [type, setType] = useState('Pulsa');
  const [selectItem, setSelectedItem] = useState(null);
  const [nomorTujuan, setNomor] = useState(null);
  const product_type = ['Pulsa', 'Data'];
  const [showModal, setShowModal] = useState(false);

  const clearNomor = () => {
    setNomor(null);
  };
  return (
    <>
      <View
        style={{
          backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
        }}
        className="w-full h-full">
        <SafeAreaView>
          <View style={{marginHorizontal: HORIZONTAL_MARGIN, marginTop: 15}}>
            <View style={{rowGap: 10}}>
              <Input
                value={nomorTujuan}
                placeholder="Masukan Nomor Tujuan"
                onChange={text => setNomor(text)}
                onDelete={clearNomor}
                type="numeric"
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonLabel}>Tampilkan Produk</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 15, columnGap: 15}}>
              {product_type.map(t => {
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.buttonTab,
                      t === type
                        ? {
                            borderBottomColor: BLUE_COLOR,
                            borderBottomWidth: 2,
                          }
                        : '',
                    ]}
                    onPress={() => {
                      setType(t);
                    }}>
                    <Text
                      style={[
                        styles.buttonTabLabel(isDarkMode),
                        t === type
                          ? {
                              color: BLUE_COLOR,
                            }
                          : '',
                      ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* PRODUK */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                rowGap: 25,
                marginTop: 20,
              }}>
              {type === 'Pulsa' ? (
                <>
                  {product_pulsa.map(p => {
                    return (
                      <TouchableOpacity
                        key={p.id}
                        style={[
                          styles.productWrapper(isDarkMode),
                          selectItem?.id === p.id
                            ? {
                                borderColor: GREEN_COLOR,
                              }
                            : '',
                        ]}
                        onPress={() => setSelectedItem(p)}>
                        <Text style={styles.productLabel(isDarkMode)}>
                          {p.product_name}
                        </Text>
                        <Text style={styles.productPrice(isDarkMode)}>
                          {rupiah(p.product_price)}
                        </Text>
                        {selectItem?.id === p.id && (
                          <CheckProduct
                            width={20}
                            style={{position: 'absolute', right: 7, top: 2}}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </>
              ) : (
                <>
                  {product_data.map(d => {
                    return (
                      <TouchableOpacity
                        key={d.id}
                        style={[
                          styles.productWrapper(isDarkMode),
                          selectItem?.id === d.id
                            ? {
                                borderColor: GREEN_COLOR,
                              }
                            : '',
                        ]}
                        onPress={() => setSelectedItem(d)}>
                        <Text style={styles.productLabel(isDarkMode)}>
                          {d.product_name}
                        </Text>
                        <Text style={styles.productPrice(isDarkMode)}>
                          {rupiah(d.product_price)}
                        </Text>
                        {selectItem?.id === d.id && (
                          <CheckProduct
                            width={20}
                            style={{position: 'absolute', right: 7, top: 2}}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}
            </View>
          </View>
        </SafeAreaView>
        {selectItem && (
          <View style={[styles.bottom(isDarkMode)]}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => setShowModal(!showModal)}>
              <Text style={styles.buttonLabel}>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        )}
        <BottomModal
          visible={showModal}
          onDismiss={() => setShowModal(showModal)}
          title="Detail Transaksi">
          <View>
            <View style={styles.modalData(isDarkMode)}>
              <Text style={styles.labelModalData(isDarkMode)}>
                Nomor Tujuan{' '}
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
                {rupiah(selectItem?.product_price)}
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
  button: {
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    padding: 10,
  },

  buttonTab: {
    width: '47%',
    borderBottomColor: GREY_COLOR,
    borderBottomWidth: 1,
    padding: 5,
  },
  buttonTabLabel: isDarkMode => ({
    textAlign: 'center',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontFamily: REGULAR_FONT,
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
  buttonLabel: {
    color: WHITE_BACKGROUND,
    textAlign: 'center',
    fontFamily: REGULAR_FONT,
  },
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
