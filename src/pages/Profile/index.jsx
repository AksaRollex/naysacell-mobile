import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
  Dimensions,
  Modal,
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
import {HeaderBG, SignOut} from '../../../assets';
import {useState} from 'react';
import ModalProcess from '../../components/ModalProcess';
import { useMutation, useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../libs/axios';
import ModalAfterProcess from '../../components/ModalAfterProcess';
import {APP_URL} from '@env';
const {width, height} = Dimensions.get('window');

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

  const {data} = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => axios.get('/auth/me').then(response => response.data.user),
    onError: error => {
      console.error('Error fetching data:', error);
    },
  });

  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openImageViewer = imageUrl => {
    setSelectedImage(`${process.env.APP_URL}${imageUrl}`);
    setImageViewerVisible(true);
    console.log(selectedImage);
  };

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
        <View
          className="w-full items-end justify-between flex-row  "
          style={{padding: 20}}>
          <Text className="text-white font-poppins-semibold text-base  ">
            Profil Saya
          </Text>
          <TouchableOpacity className="mr-2" onPress={handleLogout}>
            <SignOut width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View className=" items-center justify-center">
          {data && (
            <View className="space-x-4 flex-row items-center">
              {/* <TouchableOpacity
                onPress={() => openImageViewer(data.photo)}
                style={{
                  alignSelf: 'center',
                }}>
                <Image
                  className="rounded-3xl w-20 h-20 bg-slate-50"
                  source={{
                    uri: data.photo
                      ? `${APP_URL}${data.photo}`
                      : 'https://t4.ftcdn.net/jpg/04/89/93/27/360_F_489932757_QoDMy213RNITzJcdRuPs7ZVsQyccJ9Vd.jpg',
                  }}
                  // source={{
                  //   uri: data.photo
                  //     ? `${APP_URL}${
                  //         data.photo.startsWith('/')
                  //           ? data.photo
                  //           : '/' + data.photo
                  //       }`
                  //     : 'https://default-avatar-url',
                  // }}
                  onError={e => {
                    console.log('Image load error:', e.nativeEvent.error);
                    console.log('Image URL:', `${APP_URL}/${data.photo}`);
                  }}
                />
              </TouchableOpacity> */}
              {/* <View className="flex-col">
                <Text
                  className="text-base font-poppins-semibold"
                  style={{color: isDarkMode ? 'white' : 'white'}}>
                  {data.name}
                </Text>
                <Text
                  className="text-base font-poppins-semibold "
                  style={{color: isDarkMode ? 'white' : 'white'}}>
                  {data.email}
                </Text>
              </View> */}
            </View>
          )}
        </View>
      </ImageBackground>

      {/* TAB */}
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

      {/* MODAL */}
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={imageViewerVisible}
          onRequestClose={() => setImageViewerVisible(false)}>
          <View style={styles.imageViewerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImageViewerVisible(false)}>
              {/* <IonIcons name="close" size={40} color="white" /> */}
            </TouchableOpacity>
            <Image
              style={styles.fullScreenImage}
              source={{
                uri: selectedImage,
              }}
            />
          </View>
        </Modal>
        <ModalProcess
          modalVisible={modalLogout}
          title={'Apakah Anda Yakin Ingin Keluar?'}
          url={require('../../../assets/lottie/logout-animation.json')}
          buttonFalseText={'Batal'}
          buttonTrueText={'Ya, Keluar'}
          functionFalseButton={cancelLogout}
          functionTrueButton={confirmLogout}
        />

        <ModalAfterProcess
          modalVisible={modalSuccessLogout}
          title={'Logout Berhasil'}
          subTitle={'Anda Akan Dikembalikan Ke Halaman Login'}
          url={require('../../../assets/lottie/success-animation.json')}
        />

        <ModalAfterProcess
          modalVisible={modalFailedLogout}
          title={'Logout Gagal'}
          subTitle={errorMessage}
          url={require('../../../assets/lottie/failed-animation.json')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});
