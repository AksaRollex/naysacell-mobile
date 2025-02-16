import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  BLUE_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
} from '../../../utils/const';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../../libs/axios';
import ModalProcess from '../../../components/ModalProcess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAfterProcess from '../../../components/ModalAfterProcess';

export default function IndexUsersAdmin({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [path, setPath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [authToken, setAuthToken] = useState('');
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setAuthToken(token);
    };
    getToken();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const results = await Promise.all([
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            ),
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ),
          ]);
          return results.every(
            result => result === PermissionsAndroid.RESULTS.GRANTED,
          );
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Izin Penyimpanan',
            message: 'Aplikasi memerlukan izin untuk menyimpan file',
            buttonNeutral: 'Tanya Nanti',
            buttonNegative: 'Batal',
            buttonPositive: 'OK',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const downloadTemplate = async () => {
    try {
      setIsDownloading(true);

      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        setModalError(true);
        setTimeout(() => {
          setModalError(false);
        }, 3000);
        return;
      }

      const response = await axios.get('/master/user/download-excel', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        responseType: 'blob',
      });

      const path =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/Data Laporan Daftar User.xlsx`
          : `${RNFS.DownloadDirectoryPath}/Data Laporan Daftar User.xlsx`;

      setPath(path);
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const base64Data = fileReader.result.split(',')[1];

        try {
          await RNFS.writeFile(path, base64Data, 'base64');
          setModalSuccess(true);
          setTimeout(() => {
            setModalSuccess(false);
          }, 3000);
        } catch (writeError) {
          setModalFailed(true);
          setTimeout(() => {
            setModalFailed(false);
          }, 3000);
          setErrorMessage(writeError.message || 'Gagal menyimpan file');
        }
      };

      fileReader.readAsDataURL(response.data);
    } catch (error) {
      setModalFailed(true);
      setTimeout(() => {
        setModalFailed(false);
      }, 3000);
      setErrorMessage(error.message || 'Gagal mengunduh file');
    } finally {
      setIsDownloading(false);
      setDownloadModalVisible(false);
    }
  };

  const closeModal = () => setDownloadModalVisible(false);
  const renderDownloadConfirmationModal = () => (
    <>
      <ModalProcess
        modalVisible={downloadModalVisible}
        functionTrueButton={() => downloadTemplate()}
        functionFalseButton={() => closeModal()}
        onConfirm={downloadTemplate}
        iconName={'document-text'}
        iconColor={'#95bb72'}
        iconSize={24}
        bgIcon={'green-100'}
        title={'Konfirmasi Download'}
        subTitle={
          'Apakah Anda yakin ingin Mengunduh Laporan User Berformat Excel?'
        }
        bgTrueText={isDownloading ? '#95bb72b3' : '#95bb72'}
        buttonTrueColorText={'#fff'}
        buttonFalseColorText={'#fff'}
        bgFalseText={'#ef5350'}
        buttonTrueText={
          isDownloading ? <ActivityIndicator color="#fff" /> : 'Unduh'
        }
        buttonFalseText={'Batal'}
      />
    </>
  );

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
        <View className="flex-row flex-wrap justify-between px-3 gap-3">
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
      {/* <TouchableOpacity
        onPress={() => setDownloadModalVisible(true)}
        disabled={isDownloading}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: '#177a44',
          padding: 10,
          borderRadius: 50,
          opacity: isDownloading ? 0.7 : 1,
        }}>
        <MaterialCommunityIcons name="file-excel" size={28} color="#fff" />
      </TouchableOpacity>
      {renderDownloadConfirmationModal()} */}
      <ModalAfterProcess
        modalVisible={modalSuccess}
        icon={'checkmark-done-sharp'}
        iconColor={'#95bb72'}
        iconSize={24}
        bgIcon={'#e6f7e6'}
        title={'File berhasil di download'}
        subTitle={`File disimpan di ${path}`}
      />
      <ModalAfterProcess
        modalVisible={modalFailed}
        icon={'close'}
        iconColor={'#ef5350'}
        iconSize={24}
        bgIcon={'#fee2e2'}
        title={'File gagal di download'}
        subTitle={errorMessage || 'Gagal menyimpan file'}
      />
      <ModalAfterProcess
        modalVisible={modalError}
        icon={'settings-sharp'}
        iconColor={'#ef5350'}
        iconSize={24}
        bgIcon={'#fee2e2'}
        title={'File gagal di download'}
        subTitle={'Izin penyimpanan diperlukan untuk mengunduh file'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuCard: isDarkMode => ({
    backgroundColor: isDarkMode ? '#262626' : '#fff',
    borderRadius: 16,
    padding: 16,
    width: '46%',
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
