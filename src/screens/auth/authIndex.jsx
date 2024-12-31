import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();

import LoginPage from './login';
import RegisterPage from './register';

const screenOptions = {
  headerShown: false,
};

export default memo(function Auth() {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="loginPage" component={LoginPage} />
      <Screen name="registerPage" component={RegisterPage} />
    </Navigator>
  );
});
