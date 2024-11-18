import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  BLUE_COLOR,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  SLATE_COLOR,
} from '../../../../utils/const';
import {useFormStep} from '..';
import axios from '../../../../libs/axios';
import {API_URL} from '@env';

export default function Credential({navigation}) {
  //   const {nextStep, setIndex} = useFormStep();
  const isDarkMode = useColorScheme() === 'dark';

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  //   const onSubmit = data => {
  //     axios
  //       .post(`${API_URL}/forgot-password`, data)
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .then(res => {
  //         // nextStep();
  //         navigation.navigate('otpEmail');
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };
  return (
    <View>
      <View className="my-6">
        <Controller
          name="email"
          control={control}
          rules={{required: 'Email Tidak Boleh Kosong'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Masukkan email"
              label="Email"
              color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
              className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
              style={{fontFamily: 'Poppins-Regular'}}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}></TextInput>
          )}
        />
        {errors.email && (
          <Text className="mt-2 mx-auto text-red-400 font-poppins-regular" body>
            {errors.email.message}
          </Text>
        )}
      </View>
      <View className="flex">
        <TouchableOpacity
          className="w-11/12 rounded-3xl mx-auto px-4 h-12 items-center justify-center"
          onPress={() => navigation.navigate('otpEmail')}
          style={{
            backgroundColor: BLUE_COLOR,
          }}>
          <Text className="text-white text-md font-poppins-bold">
            LANJUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
