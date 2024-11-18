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
import {useState, useEffect} from 'react';
import ModalProcess from '../../components/ModalProcess';
import Toast from 'react-native-toast-message';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../libs/axios';

const formPage = () => <ProfileForm />;

const renderScene = SceneMap({
  form: formPage,
});
export default function Profile({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: 'form', title: 'Detail Akun'}]);
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const [data, setData] = useState(null);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    logout();
  };

  const {mutate: logout} = useMutation({
    mutationFn: () => axios.post('/auth/logout'),
    onSuccess: async () => {
      await AsyncStorage.removeItem('@auth-token');
      Toast.show({
        type: 'success',
        text1: 'Logout Berhasil',
      });
      queryClient.invalidateQueries(['auth', 'user']);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Gagal Logout',
      });
    },
  });

  useEffect(() => {
    axios
      .get('/auth/me')
      .then(response => {
        setData(response.data.user);
        console.log(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
        <View className="w-full py-3 px-2 items-end justify-end flex-row  ">
          <TouchableOpacity className="mr-2" onPress={handleLogout}>
            <SignOut width={24} height={24} fill={isDarkMode ? 'red' : 'red'} />
          </TouchableOpacity>
        </View>
        <View className=" flex-col items-center justify-center  py-4 ">
          <Image
            source={require('../../../src/assets/images/avatar.jpg')}
            className="w-20 h-20 rounded-full"
          />
          {data && (
            <Text
              className="text-base font-poppins-regular my-2"
              style={{color: isDarkMode ? 'white' : 'black'}}>
              {data.name}
            </Text>
          )}
        </View>
      </ImageBackground>
      <View style={{flex: 1}}>
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
              labelStyle={{fontFamily: 'Poppins-semiBold'}}
              activeColor={BLUE_COLOR} // Warna teks tab aktif
              inactiveColor="gray" // Warna teks tab tidak aktif
            />
          )}
        />
      
      </View>

      <View>
        <ModalProcess
          modalVisible={modalVisible}
          title={'Apakah Anda Yakin Ingin Keluar?'}
          url={require('../../assets/lottie/logout-animation.json')}
          buttonFalseText={'Batal'}
          buttonTrueText={'Ya, Keluar'}
          functionTrueButton={confirmLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
