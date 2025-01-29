import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();

import LoginPage from './login';
import RegisterPage from './register';
import BantuanLogin from '../Bantuan/bantuan_login';
import SyaratDanKetentuan from '../S&K';
import ForgotPassScreen from './forgotPassword/ForgotPassScreen';
import {useColorScheme} from 'react-native';
import { DARK_COLOR, LIGHT_COLOR } from '../../utils/const';

export default memo(function Auth() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#252525' : '#fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Screen
        name="loginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Screen
        name="registerPage"
        component={RegisterPage}
        options={{headerShown: false}}
      />
      <Screen
        name="ForgotPassScreen"
        component={ForgotPassScreen}
        options={{headerShown: false}}
      />
      <Screen
        name="bantuanLogin"
        component={BantuanLogin}
        options={{
          title: 'Bantuan Login / Daftar Akun',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          },
          headerTintColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
        }}
      />
      <Screen name="S&K" component={SyaratDanKetentuan} />
    </Navigator>
  );
});
