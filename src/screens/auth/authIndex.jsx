import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();

import LoginPage from './login';
import RegisterPage from './register';
import BantuanLogin from '../Bantuan/bantuan_login';
import SyaratDanKetentuan from '../S&K';
import ForgotPassScreen from './forgotPassword/ForgotPassScreen';

const screenOptions = {
  headerShown: false,
};

export default memo(function Auth() {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="loginPage" component={LoginPage} />
      <Screen name="registerPage" component={RegisterPage} />
      <Screen name="ForgotPassScreen" component={ForgotPassScreen} />
      <Screen name="bantuanLogin" component={BantuanLogin} />
      <Screen name="S&K" component={SyaratDanKetentuan} />
    </Navigator>
  );
});
