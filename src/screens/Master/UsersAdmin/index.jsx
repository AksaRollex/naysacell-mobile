import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  BLUE_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
} from '../../../utils/const';
import {List} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function IndexUsersAdmin({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const Admin = () => {
    navigation.navigate('Admin');
  };

  const User = () => {
    navigation.navigate('User');
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        className="gap-y-4 my-4">
        <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px]"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                User
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <FontAwesome5
                  name="user-alt"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={User}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View>
        <View>
          <List.Item
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
            }}
            title={
              <Text
                className="font-poppins-medium text-[15px]"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                Admin
              </Text>
            }
            left={() => (
              <View
                className="rounded-full ml-3"
                style={{backgroundColor: BLUE_COLOR}}>
                <FontAwesome5
                  name="user-cog"
                  size={17}
                  color={'white'}
                  style={{padding: 5}}
                />
              </View>
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            )}
            className="bg-[#ffffff] border-black p-2 ml-3 mr-3"
            onPress={Admin}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkMode ? '#262626' : '#f8f8f8',
              marginHorizontal: 15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
