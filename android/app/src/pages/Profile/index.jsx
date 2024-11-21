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
  LIGHT_BACKGROUND,
  windowHeight,
  windowWidth,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ProfileForm from './tab/profileForm';
import {HeaderBG, SignOut} from '../../assets';
import {useState} from 'react';
import ModalProcess from '../../components/ModalProcess';
import Toast from 'react-native-toast-message';
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../libs/axios';
import ModalAfterProcess from '../../components/ModalAfterProcess';

const formPage = () => <ProfileForm />;

const renderScene = SceneMap({
  form: formPage,
});
export default function Profile({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: 'form', title: 'Detail Akun'}]);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalSuccessLogout, setModalSuccessLogout] = useState(false);
  const [modalFailedLogout, setModalFailedLogout] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const queryClient = useQueryClient();

  const handleLogout = () => {
    setModalLogout(true);
  };

  const confirmLogout = () => {
    setModalLogout(false);
    logout();
  };

  const cancelLogout = () => {
    setModalLogout(false);
  };

  const {mutate: logout} = useMutation({
    mutationFn: () => axios.delete('/auth/logout'),
    onSuccess: async () => {
      try {
        await AsyncStorage.removeItem('@auth-token');
        setModalSuccessLogout(true);
        setTimeout(() => {
          setModalSuccessLogout(false);
          navigation.replace('Login');
        }, 2000);
      } catch (error) {
        setErrorMessage(error.response?.data || error.message);
        setModalFailedLogout(true);
        setTimeout(() => {
          setModalFailedLogout(false);
        }, 2000);
      }
    },
    onError: error => {
      console.error('Logout error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data || error.message);
      setModalFailedLogout(true);
      setTimeout(() => {
        setModalFailedLogout(false);
      }, 2000);
    },
  });

  const {data, error, isLoading} = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => axios.get('/auth/me').then(response => response.data.user),
    onError: error => {
      console.error('Error fetching data:', error);
    },
  });

  return (
    <View
      className="w-full h-full flex"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <ImageBackground
        source={HeaderBG}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
        }}>
        <View className="w-full py-3 px-2 items-end justify-end flex-row  ">
          <TouchableOpacity className="mr-2" onPress={handleLogout}>
            <SignOut width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View className=" flex-col items-center justify-center  py-4 ">
          <Image
            source={require('../../../src/assets/images/avatar.jpg')}
            className="w-20 h-20 rounded-full"
          />
          {data && (
            <Text
              className="text-base font-poppins-semibold my-2"
              style={{color: isDarkMode ? 'white' : 'white'}}>
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
              }} // WARNA GARIS BAWAH
              style={{
                backgroundColor: isDarkMode ? '#18181B' : WHITE_BACKGROUND,
              }} // WARNA BACKGROUND TAB
              labelStyle={{fontFamily: 'Poppins-SemiBold'}}
              activeColor={BLUE_COLOR} // WARNA TAB AKTIF
              inactiveColor="gray" // WARNA TAB TIDAK AKTIF
            />
          )}
        />
      </View>

      <View>
        <ModalProcess
          modalVisible={modalLogout}
          title={'Apakah Anda Yakin Ingin Keluar?'}
          url={require('../../assets/lottie/logout-animation.json')}
          buttonFalseText={'Batal'}
          buttonTrueText={'Ya, Keluar'}
          functionFalseButton={cancelLogout}
          functionTrueButton={confirmLogout}
        />

        <ModalAfterProcess
          modalVisible={modalSuccessLogout}
          title={'Logout Berhasil'}
          subTitle={'Anda Akan Dikembalikan Ke Halaman Login'}
          url={require('../../assets/lottie/success-animation.json')}
        />

        <ModalAfterProcess
          modalVisible={modalFailedLogout}
          title={'Logout Gagal'}
          subTitle={errorMessage}
          url={require('../../assets/lottie/failed-animation.json')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
