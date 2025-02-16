import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_COLOR,
} from '../../../../../utils/const';
import Paginate from '../../../../../components/Paginate';
import {MenuView} from '@react-native-menu/menu';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rupiah} from '../../../../../libs/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDelete} from '../../../../../hooks/useDelete';
import ModalProcess from '../../../../../components/ModalProcess';
import axios from '../../../../../libs/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import RNFS from 'react-native-fs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalAfterProcess from '../../../../../components/ModalAfterProcess';

export default function Prabayar({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();
  const queryClient = useQueryClient();

  const [modalTypeVisible, setModalTypeVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const [tempCategory, setTempCategory] = useState('');
  const [tempProvider, setTempProvider] = useState('');

  const [payload, setPayload] = useState({});

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

      const response = await axios.get('/master/productPrepaid/download-excel', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        responseType: 'blob',
      });

      const path =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/Data Laporan Daftar Produk.xlsx`
          : `${RNFS.DownloadDirectoryPath}/Data Laporan Daftar Produk.xlsx`;

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

  const Plugs = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalTypeVisible(true);
          setTempCategory(selectedCategory);
          setTempProvider(selectedProvider);
        }}
        className=" flex-row items-center rounded-xl border-[0.5px] border-stone-600 justify-between p-[14px] min-w-[70px]"
        style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
        <View className="flex-row items-center">
          <IonIcons
            name="apps"
            size={20}
            color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
          />
          <Text
            className=" font-poppins-regular mx-2 text-sm"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {selectedCategory || 'Kategori'}
          </Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={20}
          color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setPayload({
      product_category: selectedCategory,
      product_provider: selectedProvider,
    });
  }, [selectedCategory, setSelectedProvider]);

  const TypePicker = ({visible, onClose}) => {
    const categories = ['Pulsa', 'Data', 'E-Money'];
    const providers = [
      'Telkomsel',
      'XL',
      'Indosat',
      'By.u',
      'Smartfren',
      'Three',
      'AXIS',
    ];
    const emoneyType = ['Gopay', 'Ovo', 'Dana', 'Shopeepay'];

    const hasChanges = () => tempCategory !== '' || tempProvider !== '';

    const handleConfirm = () => {
      setSelectedCategory(tempCategory);
      setSelectedProvider(tempProvider);
      setPayload({
        product_provider: tempProvider,
        product_category: tempCategory,
      });
      onClose();
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'},
            ]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  {color: isDarkMode ? DARK_COLOR : LIGHT_COLOR},
                ]}>
                Pilih Filter
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setTempCategory('');
                  setTempProvider('');
                  onClose();
                }}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                />
              </TouchableOpacity>
            </View>

            {/* Kategori & Provider */}
            <View className="flex-row justify-between px-4">
              {/* Pilihan Kategori */}
              <View className="flex-1 mr-2">
                <Text
                  className="font-poppins-semibold mb-2"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Kategori
                </Text>
                <ScrollView className="max-h-64">
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category}
                      className={`p-3 rounded-xl mb-2 ${
                        tempCategory === category
                          ? 'bg-blue-100'
                          : isDarkMode
                          ? 'bg-[#262626]'
                          : 'bg-[#f8f8f8]'
                      }`}
                      onPress={() => setTempCategory(category)}>
                      <Text
                        className={`${
                          tempCategory === category
                            ? 'text-blue-500 font-poppins-semibold'
                            : isDarkMode
                            ? 'text-white font-poppins-regular'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Pilihan Provider untuk Pulsa/Data */}
              {(tempCategory === 'Pulsa' || tempCategory === 'Data') && (
                <View className="flex-1 ml-2">
                  <Text
                    className="font-poppins-semibold mb-2"
                    style={{color: isDarkMode ? WHITE_COLOR : DARK_COLOR}}>
                    Provider
                  </Text>
                  <ScrollView className="max-h-64">
                    {providers.map(provider => (
                      <TouchableOpacity
                        key={provider}
                        className={`p-3 rounded-xl mb-2 ${
                          tempProvider === provider
                            ? 'bg-blue-100'
                            : isDarkMode
                            ? 'bg-[#262626]'
                            : 'bg-[#f8f8f8]'
                        }`}
                        onPress={() => setTempProvider(provider)}>
                        <Text
                          className={`${
                            tempProvider === provider
                              ? 'text-blue-500 font-poppins-semibold'
                              : isDarkMode
                              ? 'text-white font-poppins-regular'
                              : 'text-black font-poppins-regular'
                          }`}>
                          {provider}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Pilihan Provider untuk E-Money */}
              {tempCategory === 'E-Money' && (
                <View className="flex-1 ml-2">
                  <Text
                    className="font-poppins-semibold mb-2"
                    style={{color: isDarkMode ? WHITE_COLOR : DARK_COLOR}}>
                    Provider
                  </Text>
                  <ScrollView className="max-h-64">
                    {emoneyType.map(emoney => (
                      <TouchableOpacity
                        key={emoney}
                        className={`p-3 rounded-xl mb-2 ${
                          tempProvider === emoney
                            ? 'bg-blue-100'
                            : isDarkMode
                            ? 'bg-[#262626]'
                            : 'bg-[#f8f8f8]'
                        }`}
                        onPress={() => setTempProvider(emoney)}>
                        <Text
                          className={`${
                            tempProvider === emoney
                              ? 'text-blue-500 font-poppins-semibold'
                              : isDarkMode
                              ? 'text-white font-poppins-regular'
                              : 'text-black font-poppins-regular'
                          }`}>
                          {emoney}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View className="mt-4 px-4">
              <TouchableOpacity
                className="w-full rounded-xl mx-auto px-4 h-12 items-center justify-center"
                style={{
                  backgroundColor: BLUE_COLOR,
                }}
                disabled={!hasChanges()}
                onPress={handleConfirm}>
                <Text className="text-white text-center font-poppins-semibold">
                  TERAPKAN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const {
    delete: deletePrabayar,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  } = useDelete({
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries('/master/products/prabayar');
        navigation.navigate('Prabayar');
      }, 3000);
    },
    onError: error => {
      console.log(error);
    },
  });

  const prabayarCards = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormPrabayar', {id: item.id}),
      },
      {
        id: 'Hapus',
        title: 'Hapus',
        action: item =>
          deletePrabayar(`/master/product/prepaid/delete-pbb/${item.id}`),
      },
    ];
    return (
      <View
        className="w-full p-2 flex-col  rounded-lg mt-4"
        style={{
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
        }}>
        <View className="flex-row w-full  my-2 justify-center ">
          <View className="w-full flex-row justify-between items-start">
            <View className="flex-row  items-center justify-start gap-x-2 ">
              <View
                className="items-center justify-center"
                style={{
                  backgroundColor: isDarkMode ? '#242424' : '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <MaterialIcons
                  name="shopping-cart"
                  size={25}
                  color={BLUE_COLOR}
                />
              </View>
              <View className="flex-col  w-64 items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.product_name}
                </Text>
                <Text
                  className="font-poppins-regular text-sm "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.product_desc}
                </Text>
                <View className="flex-row gap-x-2">
                  <View className="bg-yellow-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                    <IonIcons name="bookmark" color="#867736" size={17} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#867736]">
                      {item.product_category}
                    </Text>
                  </View>
                  <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                    <IonIcons name="pricetag" color="#138EE9" size={17} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                      {rupiah(item?.product_price)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <MenuView
              title="Menu Title"
              actions={dropdownOptions.map(option => ({
                ...option,
              }))}
              onPressAction={({nativeEvent}) => {
                const selectedOption = dropdownOptions.find(
                  option => option.title === nativeEvent.event,
                );
                if (selectedOption) {
                  selectedOption.action(item);
                }
              }}
              shouldOpenOnLongPress={false}>
              <View className="p-1 justify-end rounded-full items-start bg-stone-200">
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color="black"
                  size={20}
                />
              </View>
            </MenuView>
          </View>
        </View>

        <DeleteConfirmationModal />
        <SuccessOverlayModal />
        <FailedOverlayModal />
      </View>
    );
  };
  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <Paginate
        url="/master/product/prepaid"
        ref={paginateRef}
        Plugin={Plugs}
        renderItem={prabayarCards}
        payload={payload}
      />
      <TypePicker
        visible={modalTypeVisible}
        onClose={() => setModalTypeVisible(false)}
      />
      <AntDesign
        name="plus"
        size={28}
        color="#fff"
        style={styles.plusIcon}
        onPress={() => navigation.navigate('FormPrabayar')}
      />
      {/* <TouchableOpacity
        onPress={() => setDownloadModalVisible(true)}
        disabled={isDownloading}
        style={{
          position: 'absolute',
          bottom: 100,
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
        icon={'close-sharp'}
        iconColor={'#ef5350'}
        iconSize={24}
        bgIcon={'red-100'}
        title={'File gagal di download'}
        subTitle={errorMessage || 'Gagal menyimpan file'}
      />
      <ModalAfterProcess
        modalVisible={modalError}
        icon={'settings-sharp'}
        iconColor={'#ef5350'}
        iconSize={24}
        bgIcon={'red-100'}
        title={'File gagal di download'}
        subTitle={'Izin penyimpanan diperlukan untuk mengunduh file'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#138EE9',
    padding: 10,
    borderRadius: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
