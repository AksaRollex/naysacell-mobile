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
import {useNavigation} from '@react-navigation/native';
export default function Password({}) {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();
  return (
    <View>
      <View>
        <View className="mt-6">
          <Controller
            name="password"
            control={control}
            rules={{required: 'Email Tidak Boleh Kosong'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Masukkan Password Lama"
                style={{fontFamily: 'Poppins-Regular'}}
                label="password"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
                onBlur={onBlur}
                value={value}
                secureTextEntry
                onChangeText={onChange}></TextInput>
            )}
          />
          {errors.password && (
            <Text className="mt-2 mx-auto text-red-400" body>
              {errors.password.message}
            </Text>
          )}
          <View className="mt-6">
            <Controller
              name="password"
              control={control}
              rules={{required: 'Email Tidak Boleh Kosong'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Masukkan Password Baru"
                  style={{fontFamily: 'Poppins-Regular'}}
                  label="password"
                  color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  onChangeText={onChange}></TextInput>
              )}
            />
            {errors.password && (
              <Text className="mt-2 mx-auto text-red-400" body>
                {errors.password.message}
              </Text>
            )}
          </View>
          <View className="my-6">
            <Controller
              name="password"
              control={control}
              rules={{required: 'Email Tidak Boleh Kosong'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Konfirmasi Password Baru"
                  label="password"
                  style={{fontFamily: 'Poppins-Regular'}}
                  color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                  placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
                  className="h-12 w-11/12 rounded-3xl mx-auto  px-4 bg-[#f8f8f8 ] border border-stone-600"
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  onChangeText={onChange}></TextInput>
              )}
            />
            {errors.password && (
              <Text className="mt-2 mx-auto text-red-400" body>
                {errors.password.message}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View className="flex">
        <TouchableOpacity
          className="w-11/12 rounded-3xl mx-auto px-4 h-12 items-center justify-center"
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: BLUE_COLOR,
          }}>
          <Text className="text-white text-md font-poppins-bold">SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
