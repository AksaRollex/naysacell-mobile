import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import * as React from 'react';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  windowHeight,
  windowWidth,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ProfileForm from './tab/profileForm';
import {HeaderBG, Pencil, SignOut} from '../../assets';

const formPage = () => <ProfileForm />;

const renderScene = SceneMap({
  form: formPage,
});
export default function Profile({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: 'form', title: 'Detail Akun'}]);
  return (
    <View
      className="w-full h-full flex"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      {/* NAVBAR */}

      {/* PROFILE */}
      <ImageBackground
        source={HeaderBG}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
        }}>
        <View
          className="w-full py-3 px-2 items-end justify-end flex-row  "
          // style={{
          //   backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          // }}
        >
          <TouchableOpacity
            className="mx-5"
            onPress={() => navigation.navigate('ProfileFormEdit')}>
            <Pencil
              fill={isDarkMode ? 'white' : 'black'}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.navigate('Login')}>
            <SignOut
              width={24}
              height={24}
              fill={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <View
          className=" flex-row items-center justify-center  py-4 "
          // style={{
          //   backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
          // }}
        >
          <Image
            source={require('../../../src/assets/images/avatar.jpg')}
            className="w-20 h-20 rounded-full"
          />
          {/* <View
            className="
          flex-col items-start justify-center 
          ">
            <Text
              className="text-base font-bold font-sans"
              style={{color: isDarkMode ? 'white' : 'black'}}>
              Aksa Rollcake
            </Text>
            <Text
              className="text-sm  font-bold font-sans"
              style={{color: isDarkMode ? 'white' : 'black'}}>
              ramsimw8@gmail.com
            </Text>
            <Text
              className="text-sm   font-bold font-sans"
              style={{color: isDarkMode ? 'white' : 'black'}}>
              08123456789
            </Text>
          </View> */}
        </View>
      </ImageBackground>
      <View style={{flex: 1}} className="">
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: isDarkMode ? BLUE_COLOR : BLUE_COLOR,
                height: 1,
              }} // Warna indikator tab aktif
              style={{
                backgroundColor: isDarkMode ? '#18181B' : WHITE_BACKGROUND,
              }} // Warna background tab
              labelStyle={{fontWeight: 'bold'}}
              activeColor={BLUE_COLOR} // Warna teks tab aktif
              inactiveColor="gray" // Warna teks tab tidak aktif
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
