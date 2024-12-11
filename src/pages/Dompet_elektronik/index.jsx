import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {ArrowRight} from '../../../assets';
export default function DompetElektronik({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.wrapper(isDarkMode)}>
      <View sytle={styles.container(isDarkMode)}>
        <View>
          <TouchableOpacity
            style={styles.layananButton(isDarkMode)}
            onPress={() => navigation.navigate('Shopeepay')}>
            <Text style={styles.buttonText(isDarkMode)}>Shopeepay</Text>
            <ArrowRight />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.layananButton(isDarkMode)}
            onPress={() => navigation.navigate('OVO')}>
            <Text style={styles.buttonText(isDarkMode)}>Ovo</Text>
            <ArrowRight />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.layananButton(isDarkMode)}
            onPress={() => navigation.navigate('Dana')}>
            <Text style={styles.buttonText(isDarkMode)}>Dana</Text>
            <ArrowRight />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.layananButton(isDarkMode)}
            onPress={() => navigation.navigate('GoPay')}>
            <Text style={styles.buttonText(isDarkMode)}>GOPay</Text>
            <ArrowRight />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: isDarkMode => ({
    flex: 1,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }),
  container: isDarkMode => ({
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 15,
  }),

  layananButton: isDarkMode => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    padding: 10,
    justifyContent: 'space-between',
  }),
  buttonText: isDarkMode => ({
    fontFamily: 'Poppins-SemiBold',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
});
