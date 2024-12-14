import { StyleSheet, View, useColorScheme } from 'react-native'
import React from 'react'
import { DARK_BACKGROUND, LIGHT_BACKGROUND } from '../../../../utils/const';

export default function Prabayar() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View className="w-full h-full" style={{  backgroundColor  : isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND }}>
    </View>
  )
}

const styles = StyleSheet.create({})