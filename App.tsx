import * as React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './android/app/src/components/BottomTab';
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
} from './android/app/src/pages';
import {
  DARK_BACKGROUND,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from './android/app/src/utils/const';

function Transaksi() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Transaksi!</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transaksi"
        component={Transaksi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profil"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
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
              backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
            },
            headerTintColor: isDarkMode ? WHITE_BACKGROUND : 'black',
          }}
        />
        <Stack.Screen
          name="ProfileFormEdit"
          component={ProfileFormEdit}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
