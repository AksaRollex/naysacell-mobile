import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BLUE_COLOR} from '../utils/const';

export default function Header({title, subtitle}) {
  return (
    <View
      className="  h-40 w-full "
      style={{borderBottomStartRadius: 100, backgroundColor: BLUE_COLOR}}>
      <View>
        <Image
          source={require('../assets/images/logo.png')}
          className="w-16 h-16 mx-auto mt-3"
        />
      </View>
      <View className="flex-1 justify-center items-end pr-6">
        <Text className=" text-white font-poppins-semibold text-base  my-1 ">
          {title}
        </Text>
        <Text className="text-white text-sm font-poppins-regular">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
