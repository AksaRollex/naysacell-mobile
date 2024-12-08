import * as React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './src/components/BottomTab';
import {
  HomeScreen,
  Pulsa,
  SuccessNotif,
  LayananPLN,
  PLNPascaBayar,
  PLNPrabayar,
  DompetElektronik,
  TopupDompet,
  BPJSKesehatan,
  PDAM,
  Internet,
  LoginPage,
  RegisterPage,
  BantuanLogin,
  Profile,
  ProfileFormEdit,
  Transaksi,
  Deposit,
  HistoriDeposit,
  SuccessNotifDeposit,
  ForgotPassword,
  Credential,
  OtpEmail,
  Password,
  SyaratDanKetentuan,
  Notifikasi,
} from './src/pages';
import {WHITE_BACKGROUND, DARK_BACKGROUND} from './src/utils/const';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
        }}
      />
      <Stack.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          headerShown: false,
          headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
        }}
      />
      <Stack.Screen
        name="Profil"
        component={Profile}
        options={{
          headerShown: false,
          headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pulsa"
            component={Pulsa}
            options={{
              title: 'Pulsa & Paket Data',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="LayananPLN"
            component={LayananPLN}
            options={{
              title: 'Pilih Layanan PLN',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="PLNPascaBayar"
            component={PLNPascaBayar}
            options={{
              title: 'PLN Pasca Bayar',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="PLNPrabayar"
            component={PLNPrabayar}
            options={{
              title: 'PLN Prabayar',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="SuccessNotif"
            component={SuccessNotif}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="DompetElektronik"
            component={DompetElektronik}
            options={{
              title: 'Pilih Dompet Elektronik',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="TopupDompet"
            component={TopupDompet}
            options={{
              title: 'Topup Dompet',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="BPJSKesehatan"
            component={BPJSKesehatan}
            options={{
              title: 'BPJS Kesehatan',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="PDAM"
            component={PDAM}
            options={{
              title: 'PDAM',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="Internet"
            component={Internet}
            options={{
              title: 'Internet Pasca',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="BantuanLogin"
            component={BantuanLogin}
            options={{
              title: 'Bantuan',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="ProfileFormEdit"
            component={ProfileFormEdit}
            options={{
              title: 'Edit Profile',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="Deposit"
            component={Deposit}
            options={{
              title: 'Deposit',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="HistoriDeposit"
            component={HistoriDeposit}
            options={{
              title: 'Histori Deposit',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="SuccessNotifDeposit"
            component={SuccessNotifDeposit}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Credential"
            component={Credential}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OtpEmail"
            component={OtpEmail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Password"
            component={Password}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SyaratDanKetentuan"
            component={SyaratDanKetentuan}
            options={{
              title: 'Syarat Dan Ketentuan',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
          <Stack.Screen
            name="Notifikasi"
            component={Notifikasi}
            options={{
              title: 'Notifikasi',
              headerStyle: {
                backgroundColor: isDarkMode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
              },
              headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
              },
              headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
