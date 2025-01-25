import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  BLUE_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
} from '../../../utils/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IndexLaporan({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const mainMenus = [
    {
      title: 'Grafik Penjualan',
      icon: 'chart-timeline-variant-shimmer',
      screen: 'GrafikPenjualan',
      color: '#138EE9',
      description: 'Ketuk untuk masuk ke halaman grafik penjualan',
    },
    {
      title: 'Transaksi Produk',
      icon: 'script-text',
      screen: 'Laporan',
      color: '#138EE9',
      description: 'Ketuk untuk masuk ke halaman transaksi produk',
    },
    {
      title: 'Transaksi Deposit',
      icon: 'credit-card-plus',
      screen: 'LaporanDeposit',
      color: '#138EE9',
      description: 'Ketuk untuk masuk ke halaman transaksi deposit',
    },
  ];

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View className="gap-y-4 ">
        <View className="flex-row flex-wrap justify-between px-3 gap-3">
          {mainMenus.map((menu, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard(isDarkMode)}
              className="w-[48%]"
              onPress={() => navigation.navigate(menu.screen)}>
              <View
                style={[
                  styles.menuIconContainer,
                  {backgroundColor: menu.color},
                ]}
                className="rounded-full">
                <MaterialCommunityIcons
                  name={menu.icon}
                  size={22}
                  color="white"
                />
              </View>
              <Text style={styles.menuTitle(isDarkMode)}>{menu.title}</Text>
              <Text style={styles.menuDescription(isDarkMode)}>
                {menu.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuCard: isDarkMode => ({
    backgroundColor: isDarkMode ? '#262626' : '#fff',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }),
  menuIconContainer: {
    backgroundColor: BLUE_COLOR,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: isDarkMode => ({
    fontSize: 17,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  }),
  menuDescription: isDarkMode => ({
    fontSize: 13,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
  }),
});
