import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {BLUE_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../../../utils/const';
import OtpInputs from 'react-native-otp-inputs';

export default function OtpEmail({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  return (
    <View>
      <View style={styles.otpContainer}>
        <Text className="text-base font-sans font-bold  text-center my-5">
          Masukkan Kode OTP
        </Text>
        <Controller
          control={control}
          name="otp"
          rules={{required: 'Kode OTP tidak boleh kosong'}}
          render={({field: {onChange, value}}) => (
            <View className="flex-row flex-wrap">
              <OtpInputs
                // handleChange={code => onChange(code)}
                numberOfInputs={5}
                autofillFromClipboard={true}
                inputStyles={{
                  ...styles.otpInput,
                  color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
                }}
                inputContainerStyles={styles.otpInputContainer}
              />
            </View>
          )}
        />
        {errors.otp && (
          <Text style={styles.errorText}>{errors.otp.message}</Text>
        )}
      </View>
      <View className="flex">
        <TouchableOpacity
          className="w-11/12 rounded-3xl mx-auto px-4 h-12 items-center justify-center"
          onPress={() => navigation.navigate('otpEmail')}
          style={{
            backgroundColor: BLUE_COLOR,
          }}>
          <Text className="text-white text-md font-extrabold">LANJUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    borderColor: '#ccc',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
