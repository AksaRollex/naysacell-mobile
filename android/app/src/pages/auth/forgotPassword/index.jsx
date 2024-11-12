import {
  StyleSheet,
  View,
  useColorScheme,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
} from '../../../utils/const';
import Credential from './step/credential';
import Password from './step/password';
import {If} from '../../../libs/component';
import OtpEmail from './step/otpEmail';

// export const useFormStep = create(set => ({
//   index: 0,
//   nextStep: () => set(state => ({index: state.index + 1})),
//   prevStep: () => set(state => ({index: state.index - 1})),
//   setIndex: index => set(state => ({index})),
// }));

export default function ForgotPassword({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <View
        className="  h-40 w-full "
        style={{borderBottomStartRadius: 100, backgroundColor: BLUE_COLOR}}>
        <View>
          <Image
            source={require('../../../assets/images/logo.png')}
            s
            className="w-16 h-16 mx-auto mt-3"
          />
        </View>
        <View className="flex-1 justify-center items-end pr-6">
          <Text className=" text-white font-bold text-base font-sans my-1 ">
            Reset Password
          </Text>
          <Text className="text-white text-sm font-sans text-right ">
            Silahkan melakukan reset password{'\n'} dengan langkah langkah yang
            di sediakan !
          </Text>
        </View>
      </View>
      <View>
        {/* <If isTrue={index === 0}>
          <Credential />
        </If> */}
        <Credential />
        {/* <If isTrue={index === 1}>
          <otpEmail />
        </If> */}
        <OtpEmail />
        {/* <If isTrue={index === 3}>
          <Password />
        </If> */}
        <Password />

        <View className="flex-row justify-center mt-4">
          <Text
            className="text-sm font-sans text-center mx-1"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            Sudah ingat ?  
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="ms-1">
            <Text
              className="text-sm font-sans text-center "
              style={{color: isDarkMode ? BLUE_COLOR : BLUE_COLOR}}>
                Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
