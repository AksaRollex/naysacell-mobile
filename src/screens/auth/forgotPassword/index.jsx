import {
  StyleSheet,
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
} from '../../../utils/const';
import Credential from './step/credential';
import Password from './step/password';
import { If } from '../../../libs/component';
import Header from '../../../components/Header';
import {create} from 'zustand';
import {useNavigation} from '@react-navigation/native';

export const useFormStore = create(set => ({
  credential: {
    email: '',
  },
  password: {
    password: '',
    password_confirmation: '',
  },

  setCredential: credential => set(state => ({credential})),
  setOtp: otp => set(state => ({otp})),
  setPassword: password => set(state => ({password})),
}));

export const useFormStep = create(set => ({
  index: 0,
  nextStep: () => set(state => ({index: state.index + 1})),
  prevStep: () => set(state => ({index: state.index - 1})),
  setIndex: index => set(state => ({index})),
}));

export default function ForgotPassword() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const {index} = useFormStep();

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <Header
        title="Lupa Kata Sandi"
        subtitle="Silahkan Mengikuti Langkah Langkah Berikut !"
      />
      <View>
        <If isTrue={index === 0}>
          <Credential />
        </If>
        <If isTrue={index === 2}>
          <Password />
        </If>
        <View className="flex-row justify-center mt-4">
          <Text
            className="text-sm font-sans text-center mx-1"
            style={{
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
              fontFamily: 'Poppins-Regular',
            }}>
            Sudah ingat ?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="ms-1">
            <Text
              className="text-sm font-sans text-center "
              style={{
                color: isDarkMode ? BLUE_COLOR : BLUE_COLOR,
                fontFamily: 'Poppins-Regular',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
