import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IonIcons from 'react-native-vector-icons/Ionicons';
// SCREENS
import HomeScreen from '../Home/index';
import Pulsa from '../Pulsa';
import LayananPLN from '../Pln';
import SuccessNotif from '../Notifikasi/SuccessNotif';
import PLNPascaBayar from '../Pln/pascabayar';
import PLNPrabayar from '../Pln/prabayar';
import DompetElektronik from '../Dompet_elektronik';
import BPJSKesehatan from '../BPJS';
import PDAM from '../PDAM';
import BantuanLogin from '../Bantuan/bantuan_login';
import Profile from '../Profile';
import Transaksi from '../Transaction';
import Deposit from '../Deposit';
import HistoriDeposit from '../Deposit/HistoryDeposit';
import SuccessNotifDeposit from '../Notifikasi/SuccessNotifDeposit';
import Notifikasi from '../Notifikasi/Notifikasi';
import Shopeepay from '../Dompet_elektronik/ShopeePay';
import Dana from '../Dompet_elektronik/Dana';
import OVO from '../Dompet_elektronik/Ovo';
import GoPay from '../Dompet_elektronik/Gopay';
import Master from '../Master';
import SyaratDanKetentuan from '../S&K';
// USERS ADMIN
import IndexUsersAdmin from '../Master/UsersAdmin';
import Admin from '../Master/UsersAdmin/Tabs/Admin/Admin';
import FormAdmin from '../Master/UsersAdmin/Tabs/Admin/Form';
import User from '../Master/UsersAdmin/Tabs/User/User';
import FormUser from '../Master/UsersAdmin/Tabs/User/Form';
// MASTER
import IndexMaster from '../Master/Master';
import Brand from '../Master/Master/Tabs/Brand';
// PRODUK
import IndexProduk from '../Master/Produk';
import Prabayar from '../Master/Produk/Tabs/Prabayar/Prabayar';
import Pascabayar from '../Master/Produk/Tabs/Pascabayar';
// LAPORAN
import IndexLaporan from '../Master/Laporan';
import Laporan from '../Master/Laporan/Tabs/Laporan';
import GrafikPenjualan from '../Master/Laporan/Tabs/GrafikPenjualan';
import {BLUE_COLOR} from '../../utils/const';
import FormPrabayar from '../Master/Produk/Tabs/Prabayar/Form';
import axios from '../../libs/axios';
import LoginPage from '../auth/login';
import Order from '../Master/Order';
import FormOrder from '../Master/Order/Form';

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
  ];

  if (hideOnScreens.includes(routeName)) {
    return null;
  }

  return (
    <View
      style={[
        styles.tabBar,
        {backgroundColor: isDarkMode ? '#262626' : 'fff'},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabItem, {borderTopWidth: 0.1}]}>
            <View style={[styles.iconContainer]}>
              <IonIcons
                name={
                  route.name === 'HomeScreen'
                    ? 'home'
                    : route.name === 'Transaksi'
                    ? 'receipt'
                    : route.name === 'Master'
                    ? 'settings'
                    : route.name === 'Profile'
                    ? 'person'
                    : 'list-circle'
                }
                size={25}
                color={isFocused ? BLUE_COLOR : '#5f5f5f'}
              />
              <Text
                style={[styles.label, isFocused && styles.labelFocused]}
                className="font-poppins-semibold">
                {route.name === 'HomeScreen'
                  ? 'Beranda'
                  : route.name === 'Transaksi'
                  ? 'Transaksi'
                  : route.name === 'Master'
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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Pulsa" component={Pulsa} />
      <Stack.Screen name="LayananPLN" component={LayananPLN} />
      <Stack.Screen name="SuccessNotif" component={SuccessNotif} />
      <Stack.Screen name="PLNPascaBayar" component={PLNPascaBayar} />
      <Stack.Screen name="PLNPrabayar" component={PLNPrabayar} />
      <Stack.Screen name="DompetElektronik" component={DompetElektronik} />
      <Stack.Screen name="BPJSKesehatan" component={BPJSKesehatan} />
      <Stack.Screen name="PDAM" component={PDAM} />
      <Stack.Screen name="BantuanLogin" component={BantuanLogin} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="HistoriDeposit" component={HistoriDeposit} />
      <Stack.Screen
        name="SuccessNotifDeposit"
        component={SuccessNotifDeposit}
      />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
      <Stack.Screen name="Shopeepay" component={Shopeepay} />
      <Stack.Screen name="Dana" component={Dana} />
      <Stack.Screen name="OVO" component={OVO} />
      <Stack.Screen name="GoPay" component={GoPay} />
    </Stack.Navigator>
  );
};
const TransactionNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Transaksi" component={Transaksi} />
    </Stack.Navigator>
  );
};

const MasterNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Master" component={Master} />
      <Stack.Screen name="IndexUsersAdmin" component={IndexUsersAdmin} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="FormUser" component={FormUser} />
      <Stack.Screen name="FormAdmin" component={FormAdmin} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="IndexMaster" component={IndexMaster} />
      <Stack.Screen name="Brand" component={Brand} />
      <Stack.Screen name="IndexProduk" component={IndexProduk} />
      <Stack.Screen name="Prabayar" component={Prabayar} />
      <Stack.Screen name="FormPrabayar" component={FormPrabayar} />
      <Stack.Screen name="Pascabayar" component={Pascabayar} />
      <Stack.Screen name="IndexLaporan" component={IndexLaporan} />
      <Stack.Screen name="Laporan" component={Laporan} />
      <Stack.Screen name="GrafikPenjualan" component={GrafikPenjualan} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="FormOrder" component={FormOrder} />
    </Stack.Navigator>
  );
};

const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="loginPage" component={LoginPage} />
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
                'Order'
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
          <Tab.Screen
            name="Transaksi"
            component={TransactionNavigator}
            options={({route}) => ({
              tabBarVisible:
                getFocusedRouteNameFromRoute(route) === 'Transaksi',
            })}
          />
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
    backgroundColor: '#ececec',
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
