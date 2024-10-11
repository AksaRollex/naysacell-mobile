import * as React from 'react';
import {View, Text} from 'react-native';
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
} from './android/app/src/pages';

function Transaksi() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Transaksi!</Text>
    </View>
  );
}
function Profil() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profil!</Text>
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
        component={Profil}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          // initialRouteName="MyTabs"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pulsa"
          component={Pulsa}
          options={{title: 'Pulsa & Paket Data'}}
        />
        <Stack.Screen
          name="LayananPLN"
          component={LayananPLN}
          options={{title: 'Pilih Layanan PLN'}}
        />
        <Stack.Screen
          name="PLNPascaBayar"
          component={PLNPascaBayar}
          options={{title: 'PLN Pasca Bayar'}}
        />
        <Stack.Screen
          name="PLNPrabayar"
          component={PLNPrabayar}
          options={{title: 'PLN Prabayar'}}
        />
        <Stack.Screen
          name="SuccessNotif"
          component={SuccessNotif}
          options={{title: ''}}
        />
        <Stack.Screen
          name="DompetElektronik"
          component={DompetElektronik}
          options={{title: 'Pilih Dompet Elektronik'}}
        />
        <Stack.Screen
          name="TopupDompet"
          component={TopupDompet}
          options={{title: 'Topup Dompet'}}
        />
        <Stack.Screen
          name="BPJSKesehatan"
          component={BPJSKesehatan}
          options={{title: 'BPJS Kesehatan'}}
        />
        <Stack.Screen name="PDAM" component={PDAM} options={{title: 'PDAM'}} />
        <Stack.Screen
          name="Internet"
          component={Internet}
          options={{title: 'Internet Pasca'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
