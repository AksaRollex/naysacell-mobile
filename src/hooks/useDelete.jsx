import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import axios from '../libs/axios';
import {DARK_COLOR, LIGHT_COLOR, WHITE_BACKGROUND, WHITE_COLOR} from '../utils/const';

const ConfirmationModal = ({visible, onConfirm, onCancel, title, message}) => {
  const isDarkMode = useColorScheme() === 'dark'; 
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <View
          style={{
            width: 320,
            backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 4,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#fdecef',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IonIcons size={22} color="#f43f5e" name="trash-outline" />
          </View>
          <Text
            style={{
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            }}
            className=" text-base my-1 normal-case font-poppins-semibold">
            {title}
          </Text>
          <Text
            style={{
              color: isDarkMode ? DARK_COLOR : '#6b6b6b',
            }}
            className=" text-sm text-start normal-case font-poppins-regular mb-4">
            {message}
          </Text>
          <View className="w-full gap-y-2">
            <TouchableOpacity
              className="w-full py-3 rounded-xl items-center"
              style={{backgroundColor: '#f43f5e'}}
              onPress={onConfirm}>
              <Text
                className="font-poppins-semibold normal-case text-center"
                style={{color: '#fff'}}>
                Hapus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full py-3 rounded-xl items-center"
              onPress={onCancel}
              style={{backgroundColor: '#f0f0f0'}}>
              <Text
                className="font-poppins-semibold normal-case text-center"
                style={{color: '#F43F5E'}}>
                Batalkan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const SuccessOverlay = ({visible}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <View
          style={{
            backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
            width: 320,
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 4,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#e6f7e6',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IonIcons size={22} color="#95bb72" name="checkmark-done-sharp" />
          </View>
          <Text
            style={{
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            }}
            className=" text-base my-1 normal-case font-poppins-semibold">
            Berhasil Di Hapus!
          </Text>
          <Text
            style={{
              color: isDarkMode ? WHITE_COLOR : '#6b6b6b',
            }}
            className=" text-sm text-start normal-case font-poppins-regular">
            Data yang telah dihapus tidak dapat dikembalikan!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const FailedOverlay = ({visible, message}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <View
          style={{
            width: 320,
            backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 4,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#fdecef',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IonIcons size={22} color="#f43f5e" name="close-sharp" />
          </View>
          <Text
            style={{
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            }}
            className=" text-base my-1 normal-case font-poppins-semibold">
            Data Gagal Dihapus!
          </Text>
          <Text
            style={{
              color: isDarkMode ? DARK_COLOR : '#6b6b6b',
            }}
            className=" text-sm text-start normal-case font-poppins-regular">
            {message || 'Coba untuk menghapus kembali!'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export const useDelete = callback => {
  const [modalVisible, setModalVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const {onSuccess, onError, onSettled} = callback || {};

  const showConfirmationModal = url => {
    setCurrentUrl(url);
    setModalVisible(true);
  };

  const hideConfirmationModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.delete(currentUrl);
      setIsSuccess(true);
      hideConfirmationModal();
      setOverlayVisible(true);
      setTimeout(() => setOverlayVisible(false), 3000);
      onSuccess && onSuccess(response);
    } catch (error) {
      setIsSuccess(false);
      setOverlayVisible(true);
      hideConfirmationModal();
      setTimeout(() => setOverlayVisible(false), 3000);
      if (onError) {
        const message = error.response?.data?.message;
        setErrorMessage(message);
        onError(error);
      }
      onError && onError(error);
    } finally {
      onSettled && onSettled();
    }
  };

  const DeleteConfirmationModal = () => (
    <ConfirmationModal
      visible={modalVisible}
      onConfirm={handleConfirm}
      onCancel={hideConfirmationModal}
      title="Menghapus Data"
      message="Data yang telah dihapus tidak dapat dikembalikan!"
    />
  );

  const SuccessOverlayModal = () => (
    <SuccessOverlay
      visible={overlayVisible && isSuccess}
      message="Data Berhasil Dihapus"
    />
  );

  const FailedOverlayModal = () => (
    <FailedOverlay
      visible={overlayVisible && !isSuccess}
      message={errorMessage || 'Silahkan Coba Lagi'}
    />
  );

  return {
    delete: showConfirmationModal,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  };
};

const styles = StyleSheet.create({
  cancelButtonText: {
    color: '#4f4f4f',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
