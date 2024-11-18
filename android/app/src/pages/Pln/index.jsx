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
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {ArrowRight} from '../../assets';

export default function LayananPLN({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const layanans = [
    {
      label: 'Prabayar / Token',
      path: 'PLNPrabayar',
    },
    {
      label: 'Pascabayar / Tagihan',
      path: 'PLNPascaBayar',
    },
  ];

  return (
    <View style={styles.wrapper(isDarkMode)}>
      <View sytle={styles.container(isDarkMode)}>
        <View>
          {layanans.map(item => {
            return (
              <TouchableOpacity
                key={item.label}
                style={styles.layananButton(isDarkMode)}
                onPress={() => navigation.navigate(item.path)}>
                <Text style={styles.buttonText(isDarkMode)}>{item.label}</Text>
                <ArrowRight />
              </TouchableOpacity>
            );
          })}
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
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontFamily: 'Poppins-SemiBold',
  }),
});
