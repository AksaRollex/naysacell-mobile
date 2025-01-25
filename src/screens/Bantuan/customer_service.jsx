import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { DARK_BACKGROUND, LIGHT_BACKGROUND } from '../../utils/const'

const CustomerService = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View className="w-full h-full" style={{ backgroundColor : isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND }}>
      <Text>CustomerService</Text>
    </View>
  )
}

export default CustomerService