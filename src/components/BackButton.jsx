import { View } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'

const BackButton = ({ action, style, size,  color}) => {
  return (
    <View style={style}>
        <IonIcons name="arrow-back" size={size} color={color} onPress={action} />
    </View>
  )
}

export default BackButton