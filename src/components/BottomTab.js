import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {BLUE_COLOR, DARK_BACKGROUND, LIGHT_COLOR} from '../utils/const';
import {
  HomeActive,
  HomeDefault,
  TransaksiActive,
  TransaksiDefault,
  UserActive,
  UserDefault,
  MasterDefault,
  MasterActive,
} from '../../assets';
import React from 'react';
function MyTabBar({state, descriptors, navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const IkonMenu = ({label, active}) => {
    if (label === 'Home') {
      return active ? <HomeActive /> : <HomeDefault />;
    }
    if (label === 'Transaksi') {
      return active ? <TransaksiActive /> : <TransaksiDefault />;
    }
    if (label === 'Profil') {
      return active ? <UserActive /> : <UserDefault />;
    }
    if (label === 'Master') {
      return active ? <MasterActive /> : <MasterDefault />;
    }

    return <HomeDefault />;
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? DARK_BACKGROUND : '#FFF',
              padding: 10,
              alignItems: 'center',
            }}>
            <IkonMenu label={label} active={isFocused} />
            <Text style={{color: isFocused ? BLUE_COLOR : LIGHT_COLOR}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
