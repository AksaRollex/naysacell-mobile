import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IonIcons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Home/index';
import Pulsa from '../Pulsa';
import LayananPLN from '../Pln';
import PLNPascaBayar from '../Pln/pascabayar';
import PLNPrabayar from '../Pln/prabayar';
import DompetElektronik from '../Dompet_elektronik';
import BPJSKesehatan from '../BPJS';
import PDAM from '../PDAM';
import Profile from '../Profile';
import Transaksi from '../Transaction';
import Deposit from '../Deposit';
import BantuanLogin from '../Bantuan/bantuan_login';
import DetailHistoryDeposit from '../Deposit/HistoryDeposit/Detail';
import HistoryDeposit from '../Deposit/HistoryDeposit';
import DetailTransaction from '../Transaction/Detail';
import SuccessNotifDeposit from '../Notifikasi/SuccessNotifDeposit';
import SuccessNotif from '../Notifikasi/SuccessNotif';
import Notifikasi from '../Notifikasi/Notifikasi';
import Shopeepay from '../Dompet_elektronik/ShopeePay';
import Dana from '../Dompet_elektronik/Dana';
import OVO from '../Dompet_elektronik/Ovo';
import GoPay from '../Dompet_elektronik/Gopay';
import Master from '../Master';
import LiveChat from '../Bantuan/component_cs/livechat';
import CustomerService from '../Bantuan/customer_service';
import IndexUsersAdmin from '../Master/UsersAdmin';
import Admin from '../Master/UsersAdmin/Tabs/Admin/Admin';
import FormAdmin from '../Master/UsersAdmin/Tabs/Admin/Form';
import User from '../Master/UsersAdmin/Tabs/User/User';
import FormUser from '../Master/UsersAdmin/Tabs/User/Form';
import IndexMaster from '../Master/Master';
import Brand from '../Master/Master/Tabs/Brand';
import IndexProduk from '../Master/Produk';
import Prabayar from '../Master/Produk/Tabs/Prabayar/Prabayar';
import Pascabayar from '../Master/Produk/Tabs/Pascabayar';
import IndexLaporan from '../Master/Laporan';
import Laporan from '../Master/Laporan/Tabs/Laporan';
import GrafikPenjualan from '../Master/Laporan/Tabs/GrafikPenjualan';
import {BLUE_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../utils/const';
import FormPrabayar from '../Master/Produk/Tabs/Prabayar/Form';
import axios from '../../libs/axios';
import LoginPage from '../auth/login';
import Order from '../Master/Order';
import FormOrder from '../Master/Order/Form';
import FormSaldoUser from '../Master/SaldoUser/Form';
import SaldoUser from '../Master/SaldoUser';
import LaporanDeposit from '../Master/Laporan/Tabs/LaporanDeposit';
import FormPassAdmin from '../Master/UsersAdmin/Tabs/Admin/FormPassAdmin';
import FormPassUser from '../Master/UsersAdmin/Tabs/User/FormPassUser';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const route = state.routes[state.index];
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  const hideOnScreens = [
    'IndexUsersAdmin',
    'User',
    'Admin',
    'IndexMaster',
    'Brand',
    'IndexProduk',
    'Prabayar',
    'Pascabayar',
    'IndexLaporan',
    'Laporan',
    'GrafikPenjualan',
    'Order',
    'FormUser',
    'FormAdmin',
    'FormPrabayar',
    'FormOrder',
    'Transaksi',
    'Notifikasi',
    'SuccessNotif',
    'Pulsa',
    'LiveChat',
    'Shopeepay',
    'Dana',
    'OVO',
    'GoPay',
    'Deposit',
    'HistoryDeposit',
    'DetailHistoryDeposit',
    'DetailTransaction',
    'LaporanDeposit',
    'CustomerService',
    'SaldoUser',
    'FormSaldoUser',
    'FormPassAdmin',
    'FormPassUser',
  ];

  if (hideOnScreens.includes(routeName)) {
    return null;
  }

  if (hideOnScreens.includes(routeName)) {
    return null;
  }

  const handleTabPress = route => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });

    if (!event.defaultPrevented) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: route.name,
            params: {
              refresh: new Date().getTime(),
            },
          },
        ],
      });
    }
  };

  return (
    <View
      style={[
        styles.tabBar,
        {backgroundColor: isDarkMode ? '#1e1e1e' : Colors.lighter},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(route, isFocused)}
            style={[styles.tabItem, {borderTopWidth: 0.1}]}>
            <View style={[styles.iconContainer]}>
              <IonIcons
                name={
                  route.name === 'HomeScreen'
                    ? 'home'
                    : // : route.name === 'Transaksi'
                    // ? 'receipt'
                    route.name === 'Master'
                    ? 'settings'
                    : route.name === 'Profile'
                    ? 'person'
                    : 'list-circle'
                }
                size={25}
                color={isFocused ? BLUE_COLOR : '#7f7f7f'}
              />
              <Text
                style={[styles.label, isFocused && styles.labelFocused]}
                className="font-poppins-semibold">
                {route.name === 'HomeScreen'
                  ? 'Beranda'
                  : // : route.name === 'Transaksi'
                  // ? 'Transaksi'
                  route.name === 'Master'
                  ? 'Master'
                  : route.name === 'Profile'
                  ? 'Profile'
                  : 'Refresh'}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeScreenNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#252525' : '#fff',
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 18,
          color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        },
        headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pulsa"
        component={Pulsa}
        options={{
          title: 'Pulsa & Paket Data',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="CustomerService"
        component={CustomerService}
        options={{
          title: 'Pusat Bantuan',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen name="LayananPLN" component={LayananPLN} />
      <Stack.Screen
        name="SuccessNotif"
        component={SuccessNotif}
        options={{
          title: 'Detail Transaksi',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen name="PLNPascaBayar" component={PLNPascaBayar} />
      <Stack.Screen name="PLNPrabayar" component={PLNPrabayar} />
      <Stack.Screen name="DompetElektronik" component={DompetElektronik} />
      <Stack.Screen name="BPJSKesehatan" component={BPJSKesehatan} />
      <Stack.Screen name="PDAM" component={PDAM} />
      <Stack.Screen name="BantuanLogin" component={BantuanLogin} />
      <Stack.Screen
        name="LiveChat"
        component={LiveChat}
        options={{
          title: 'Live Chat',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="Deposit"
        component={Deposit}
        options={{
          title: 'Deposit',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="HistoryDeposit"
        component={HistoryDeposit}
        options={{
          title: 'Riwayat Deposit',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="DetailHistoryDeposit"
        component={DetailHistoryDeposit}
        options={{
          title: 'Detail Deposit',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="SuccessNotifDeposit"
        component={SuccessNotifDeposit}
      />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
      <Stack.Screen
        name="Shopeepay"
        component={Shopeepay}
        options={{
          title: 'ShopeePay',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />

      <Stack.Screen name="Dana" component={Dana} />
      <Stack.Screen name="OVO" component={OVO} />
      <Stack.Screen name="GoPay" component={GoPay} />
      <Stack.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          title: 'Riwayat Transaksi',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="DetailTransaction"
        component={DetailTransaction}
        options={{
          title: 'Detail Transaksi',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
    </Stack.Navigator>
  );
};

const MasterNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#252525' : '#fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
      }}>
      <Stack.Screen
        name="Master"
        component={Master}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IndexUsersAdmin"
        component={IndexUsersAdmin}
        options={{
          title: 'User / Admin',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          title: 'Admin',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Stack.Screen
        name="FormUser"
        component={FormUser}
        options={({route}) => ({
          title: route.params?.id ? 'Form Edit User' : 'Form Tambah User',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
      <Stack.Screen
        name="FormAdmin"
        component={FormAdmin}
        options={({route}) => ({
          title: route.params?.id ? 'Form Edit Admin' : 'Form Tambah Admin',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'User',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen name="IndexMaster" component={IndexMaster} />
      <Stack.Screen name="Brand" component={Brand} />
      <Stack.Screen name="IndexProduk" component={IndexProduk} />
      <Stack.Screen
        name="Prabayar"
        component={Prabayar}
        options={{
          title: 'Produk',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="FormPrabayar"
        component={FormPrabayar}
        options={({route}) => ({
          title: route.params?.id ? 'Form Edit Produk' : 'Form Tambah Produk',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
      <Stack.Screen name="Pascabayar" component={Pascabayar} />
      <Stack.Screen
        name="IndexLaporan"
        component={IndexLaporan}
        options={{
          title: 'Laporan',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{
          title: 'Laporan Pembelian Produk',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="GrafikPenjualan"
        component={GrafikPenjualan}
        options={{
          title: 'Grafik Penjualan',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'Pesanan',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="FormOrder"
        component={FormOrder}
        options={({route}) => ({
          title: route.params?.id ? 'Form Edit Pesanan' : 'Form Tambah Pesanan',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
      <Stack.Screen
        name="LaporanDeposit"
        component={LaporanDeposit}
        options={{
          title: 'Laporan Deposit',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="SaldoUser"
        component={SaldoUser}
        options={{
          title: 'Saldo Pengguna',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="FormSaldoUser"
        component={FormSaldoUser}
        options={({route}) => ({
          title: route.params?.id
            ? 'Form Edit Saldo Pengguna'
            : 'Form Tambah Saldo Pengguna',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
      <Stack.Screen
        name="FormPassUser"
        component={FormPassUser}
        options={({route}) => ({
          title: route.params?.id
            ? 'Form Edit Password'
            : 'Form Tambah Password',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
      <Stack.Screen
        name="FormPassAdmin"
        component={FormPassAdmin}
        options={({route}) => ({
          title: route.params?.id
            ? 'Form Edit Password'
            : 'Form Tambah Password',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
        })}
      />
    </Stack.Navigator>
  );
};

const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
};

export default function MainScreen() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
    axios
      .get('/auth/me')
      .then(res => {
        const userIsAdmin =
          res.data.user.role.name === 'admin' ||
          res.data.user.permissions.includes('master');

        setIsAdmin(userIsAdmin);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);
  return (
    <>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: (() => {
              const routeName = getFocusedRouteNameFromRoute(route);
              const hideOnScreens = [
                'IndexUsersAdmin',
                'User',
                'Admin',
                'IndexMaster',
                'Brand',
                'IndexProduk',
                'Prabayar',
                'Pascabayar',
                'IndexLaporan',
                'Laporan',
                'GrafikPenjualan',
                'FormUser',
                'FormAdmin',
                'FormPrabayar',
                'FormOrder',
                'Order',
                'SuccessNotif',
                'Pulsa',
                'Transaksi',
                'Shopeepay',
                'Dana',
                'LiveChat',
                'OVO',
                'Notifikasi',
                'GoPay',
                'Deposit',
                'HistoryDeposit',
                'DetailHistoryDeposit',
                'DetailTransaction',
                'LaporanDeposit',
                'SaldoUser',
                'FormSaldoUser',
                'FormPassUser',
                'FormPassAdmin',
              ];

              if (hideOnScreens.includes(routeName)) {
                return {
                  display: 'none',
                  height: 0,
                  opacity: 0,
                  position: 'absolute',
                };
              }

              return styles.tabBar;
            })(),
          })}>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreenNavigator}
            options={({route}) => ({
              tabBarVisible:
                getFocusedRouteNameFromRoute(route) === 'HomeScreen',
            })}
          />
          {/* <Tab.Screen
            name="Transaksi"
            component={TransactionNavigator}
            options={({route}) => ({
              tabBarVisible:
                getFocusedRouteNameFromRoute(route) === 'Transaksi',
            })}
          /> */}
          {isAdmin && (
            <Tab.Screen
              name="Master"
              component={MasterNavigation}
              options={({route}) => ({
                tabBarVisible: getFocusedRouteNameFromRoute(route) === 'Master',
              })}
            />
          )}
          <Tab.Screen
            name="Profile"
            component={ProfileNavigation}
            options={({route}) => ({
              tabBarVisible: getFocusedRouteNameFromRoute(route) === 'Profile',
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  iconContainerFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    width: 21,
    height: 21,
    marginBottom: 4,
    tintColor: 'white',
  },
  logoFocused: {
    tintColor: 'white',
  },
  label: {
    fontSize: 12,
    color: 'grey',
  },
  labelFocused: {
    color: '#138EE9',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 12,
    color: '#138EE9',
    textAlign: 'center',
  },
});
