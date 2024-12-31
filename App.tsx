import React from 'react';

import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useUser} from './src/service/useUser';

import main from './src/screens/main/index';
import authIndex from './src/screens/auth/authIndex';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retry: false,
      networkMode: 'always',
    },
    mutations: {
      retry: false,
      networkMode: 'always',
    },
  },
});

function Navigation(): React.JSX.Element {
  const {data: user, isSuccess} = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user && isSuccess ? (
          <>
            <Stack.Screen name="main" component={main} />
          </>
        ) : (
          <Stack.Screen name="authIndex" component={authIndex} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;

// import * as React from 'react';
// import {useColorScheme} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MyTabBar from './src/components/BottomTab';
// import {
//   HomeScreen,
//   Pulsa,
//   SuccessNotif,
//   LayananPLN,
//   PLNPascaBayar,
//   PLNPrabayar,
//   DompetElektronik,
//   BPJSKesehatan,
//   PDAM,
//   Internet,
//   LoginPage,
//   RegisterPage,
//   BantuanLogin,
//   Profile,
//   Transaksi,
//   Deposit,
//   HistoriDeposit,
//   SuccessNotifDeposit,
//   ForgotPassword,
//   Credential,
//   OtpEmail,
//   Password,
//   SyaratDanKetentuan,
//   Notifikasi,
//   Shopeepay,
//   Dana,
//   OVO,
//   GoPay,
//   Master,
//   IndexLaporan,
//   Laporan,
//   GrafikPenjualan,
//   IndexProduk,
//   Prabayar,
//   Pascabayar,
//   IndexUsersAdmin,
//   User,
//   Admin,
//   IndexMaster,
//   Brand,
//   FormUser,
// } from './src/screens';
// import {WHITE_BACKGROUND, DARK_BACKGROUND} from './src/utils/const';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import axios from './src/libs/axios';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnReconnect: true,
//       retry: false,
//       networkMode: 'always',
//     },
//     mutations: {
//       retry: false,
//       networkMode: 'always',
//     },
//   },
// });

// function MyTabs() {
//   const [isAdmin, setIsAdmin] = React.useState(false);
//   React.useEffect(() => {
//     axios
//       .get('/auth/me')
//       .then(res => {
//         // console.log(res.data.user);

//         const userIsAdmin =
//           res.data.user.role.name === 'admin' ||
//           res.data.user.permissions.includes('master');

//         setIsAdmin(userIsAdmin);
//       })
//       .catch(err => {
//         console.error('Error fetching data:', err);
//       });
//   }, []);

//   return (
//     <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
//         }}
//       />
//       <Stack.Screen
//         name="Transaksi"
//         component={Transaksi}
//         options={{
//           headerShown: false,
//           headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
//         }}
//       />
//       {isAdmin && (
//         <Stack.Screen
//           name="Master"
//           component={Master}
//           options={{
//             headerShown: false,
//             headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
//           }}
//         />
//       )}
//       <Stack.Screen
//         name="Profil"
//         component={Profile}
//         options={{
//           headerShown: false,
//           headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <QueryClientProvider client={queryClient}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen
//             name="Login"
//             component={LoginPage}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegisterPage}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="MyTabs"
//             component={MyTabs}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Pulsa"
//             component={Pulsa}
//             options={{
//               title: 'Pulsa & Paket Data',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="LayananPLN"
//             component={LayananPLN}
//             options={{
//               title: 'Pilih Layanan PLN',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="PLNPascaBayar"
//             component={PLNPascaBayar}
//             options={{
//               title: 'PLN Pasca Bayar',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="PLNPrabayar"
//             component={PLNPrabayar}
//             options={{
//               title: 'PLN Prabayar',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="SuccessNotif"
//             component={SuccessNotif}
//             options={{
//               title: '',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="DompetElektronik"
//             component={DompetElektronik}
//             options={{
//               title: 'Pilih Dompet Elektronik',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="BPJSKesehatan"
//             component={BPJSKesehatan}
//             options={{
//               title: 'BPJS Kesehatan',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="PDAM"
//             component={PDAM}
//             options={{
//               title: 'PDAM',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Internet"
//             component={Internet}
//             options={{
//               title: 'Internet Pasca',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="BantuanLogin"
//             component={BantuanLogin}
//             options={{
//               title: 'Bantuan',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Deposit"
//             component={Deposit}
//             options={{
//               title: 'Deposit',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="HistoriDeposit"
//             component={HistoriDeposit}
//             options={{
//               title: 'Histori Deposit',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="SuccessNotifDeposit"
//             component={SuccessNotifDeposit}
//             options={{
//               title: '',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="ForgotPassword"
//             component={ForgotPassword}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="Credential"
//             component={Credential}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="OtpEmail"
//             component={OtpEmail}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="Password"
//             component={Password}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="SyaratDanKetentuan"
//             component={SyaratDanKetentuan}
//             options={{
//               title: 'Syarat Dan Ketentuan',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Notifikasi"
//             component={Notifikasi}
//             options={{
//               title: 'Notifikasi',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Shopeepay"
//             component={Shopeepay}
//             options={{
//               title: 'Shopeepay',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Dana"
//             component={Dana}
//             options={{
//               title: 'Dana',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="OVO"
//             component={OVO}
//             options={{
//               title: 'OVO',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="GoPay"
//             component={GoPay}
//             options={{
//               title: 'GoPay',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="IndexUsersAdmin"
//             component={IndexUsersAdmin}
//             options={{
//               title: 'User / Admin',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="User"
//             component={User}
//             options={{
//               title: 'User',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="FormUser"
//             component={FormUser}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="Admin"
//             component={Admin}
//             options={{
//               title: 'Admin',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="IndexMaster"
//             component={IndexMaster}
//             options={{
//               title: 'Master',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Brand"
//             component={Brand}
//             options={{
//               title: 'Brand',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="IndexProduk"
//             component={IndexProduk}
//             options={{
//               title: 'Produk',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Prabayar"
//             component={Prabayar}
//             options={{
//               title: 'Prabayar',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Pascabayar"
//             component={Pascabayar}
//             options={{
//               title: 'Pascabayar',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="IndexLaporan"
//             component={IndexLaporan}
//             options={{
//               title: 'Macam Laporan',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="Laporan"
//             component={Laporan}
//             options={{
//               title: 'Laporan',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//           <Stack.Screen
//             name="GrafikPenjualan"
//             component={GrafikPenjualan}
//             options={{
//               title: 'Grafik Penjualan',
//               headerStyle: {
//                 backgroundColor: isDarkMode
//                   ? DARK_BACKGROUND
//                   : WHITE_BACKGROUND,
//               },
//               headerTitleStyle: {
//                 fontFamily: 'Poppins-SemiBold',
//               },
//               headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </QueryClientProvider>
//   );
// }

// export default App;
