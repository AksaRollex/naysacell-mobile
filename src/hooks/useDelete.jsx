import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import axios from '../libs/axios';

const ConfirmationModal = ({visible, onConfirm, onCancel, title, message}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onCancel}>
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="w-80 bg-white rounded-2xl p-6 items-center shadow-2xl">
        <View className="w-20 h-20 rounded-full bg-red-50 justify-center items-center mb-4">
          <IonIcons size={40} color="#f43f5e" name="trash-outline" />
        </View>
        <Text className="text-xl font-poppins-semibold text-black mb-3">
          {title}
        </Text>

        <View className="w-full h-px bg-gray-200 mb-4" />

        <Text className="text-md text-center text-gray-600 mb-6 font-poppins-regular">
          {message}
        </Text>
        <View className="flex-row w-full justify-between">
          <TouchableOpacity
            className="flex-1 mr-3 bg-gray-100 py-3 rounded-xl items-center"
            onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Batalkan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 ml-3 bg-red-500 py-3 rounded-xl items-center"
            onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Ya, Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const SuccessOverlay = ({visible}) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="w-80 bg-white rounded-2xl p-6 items-center shadow-2xl">
        <View className="w-20 h-20 rounded-full bg-green-50 justify-center items-center mb-4">
          <IonIcons size={40} color="#95bb72" name="checkmark-done-sharp" />
        </View>
        <Text className="text-xl font-poppins-semibold text-black mb-3">
          Berhasil Di Hapus !
        </Text>
        <View className="w-full h-px bg-gray-200 mb-4" />
        <Text className="text-md text-center text-gray-600  font-poppins-regular">
          Data yang telah dihapus tidak dapat dikembalikan !
        </Text>
      </View>
    </View>
  </Modal>
);
const FailedOverlay = ({visible, message}) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="w-80 bg-white rounded-2xl p-6 items-center shadow-2xl">
        <View className="w-20 h-20 rounded-full bg-red-50 justify-center items-center mb-4">
          <IonIcons size={40} color="#f43f5e" name="close-sharp" />
        </View>
        <Text className="text-xl font-poppins-semibold text-black mb-3">
          Data Gagal Dihapus !
        </Text>

        <View className="w-full h-px bg-gray-200 mb-4" />

        <Text className="text-md text-center text-gray-600 font-poppins-regular">
          {message || 'Coba untuk menghapus kembali!'}
        </Text>
      </View>
    </View>
  </Modal>
);

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
      setTimeout(() => setOverlayVisible(false), 2000);
      onSuccess && onSuccess(response);
    } catch (error) {
      setIsSuccess(false);
      setOverlayVisible(true);
      hideConfirmationModal();
      setTimeout(() => setOverlayVisible(false), 2000);
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
      title="Apakah anda yakin?"
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
