import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  BLUE_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
} from '../../../utils/const';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function IndexUsersAdmin({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const mainMenus = [
    {
      title: 'Admin',
      icon: 'user-cog',
      screen: 'Admin',
      color: '#138EE9',
      description: 'Ketuk untuk masuk ke halaman admin',
    },
    {
      title: 'User',
      icon: 'user-alt',
      screen: 'User',
      color: '#138EE9',
      description: 'Ketuk untuk masuk ke halaman user',
    },
  ];

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <View className="gap-y-4 ">
        <View className=" flex-row justify-between items-center p-3">
          <View className="items-center flex-row gap-x-1 justify-between">
            {mainMenus.map((menu, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuCard(isDarkMode)}
                onPress={() => navigation.navigate(menu.screen)}>
                <View
                  style={[
                    styles.menuIconContainer,
                    {backgroundColor: menu.color},
                  ]}
                  className="rounded-full">
                  <FontAwesome5 name={menu.icon} size={22} color="white" />
                </View>
                <Text style={styles.menuTitle(isDarkMode)}>{menu.title}</Text>
                <Text style={styles.menuDescription(isDarkMode)}>
                  {menu.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  menuCard: isDarkMode => ({
    backgroundColor: isDarkMode ? '#262626' : '#fff',
    borderRadius: 16,
    padding: 16,
    width: '49%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }),
  menuIconContainer: {
    backgroundColor: BLUE_COLOR,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: isDarkMode => ({
    fontSize: 17,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  }),
  menuDescription: isDarkMode => ({
    fontSize: 13,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
    lineHeight: 16,
    fontFamily: 'Poppins-Regular',
  }),
});
