import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../../utils/const';
import Paginate from '../../../../components/Paginate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rupiah} from '../../../../libs/utils';
import {MenuView} from '@react-native-menu/menu';
import {useDelete} from '../../../../hooks/useDelete';
import {useQueryClient} from '@tanstack/react-query';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Laporan({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const queryClient = useQueryClient();

  const backgroundColor = transaction_status => {
    if (transaction_status === 'Success') {
      return 'bg-green-100';
    } else if (transaction_status === 'Pending') {
      return 'bg-blue-100';
    } else if (transaction_status === 'Failed') {
      return 'bg-red-100';
    } else {
      return 'bg-gray-100';
    }
  };
  const textColor = transaction_status => {
    if (transaction_status === 'Success') {
      return 'text-green-400';
    } else if (transaction_status === 'Pending') {
      return 'text-blue-400';
    } else if (transaction_status === 'Failed') {
      return 'text-red-400';
    } else {
      return 'text-gray-600';
    }
  };

  const {
    delete: deleteLaporan,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  } = useDelete({
    onSuccess: () => {
      queryClient.invalidateQueries('/master/laporan');
      navigation.navigate('Laporan');
    },
    onError: error => {
      console.log('delete error', error);
    },
  });

  const [transactionStatus, setTransactionStatus] = React.useState('');
  const [selectedTransactionStatus, setSelectedTransactionStatus] =
    React.useState('');
  const [modalTransactionStatus, setModalTransactionStatus] =
    React.useState(false);
  const [payload, setPayload] = React.useState({});

  const Plugs = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalTransactionStatus(true);
          setTransactionStatus(selectedTransactionStatus);
        }}
        className=" flex-row items-center rounded-md justify-between p-[14px] min-w-[70px]"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
        <View className="flex-row items-center">
          <IonIcons
            name="apps"
            size={20}
            color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
          />
          <Text
            className=" font-poppins-regular mx-2 text-sm"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {selectedTransactionStatus || 'Status'}
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

  const TypePicker = ({onClose}) => {
    const status = ['Pending', 'Success', 'Failed'];

    const hasChanges = () => {
      return transactionStatus !== '';
    };

    const handleConfirm = () => {
      setSelectedTransactionStatus(transactionStatus);
      setPayload({
        transaction_status: transactionStatus,
      });
      onClose();
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTransactionStatus}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Filter</Text>
              <TouchableOpacity
                onPress={() => {
                  setTransactionStatus('');
                  onClose();
                }}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between px-4">
              <View className="flex-1 mr-2">
                <Text className="text-black font-poppins-semibold mb-2">
                  Status Transaksi
                </Text>
                <ScrollView className="max-h-64">
                  {status.map(statusTransaksi => (
                    <TouchableOpacity
                      key={statusTransaksi}
                      className={`p-3 rounded-md mb-2 ${
                        transactionStatus === statusTransaksi
                          ? 'bg-blue-100'
                          : 'bg-[#ececec]'
                      }`}
                      onPress={() => setTransactionStatus(statusTransaksi)}>
                      <Text
                        className={`${
                          transactionStatus === statusTransaksi
                            ? 'text-blue-500 font-poppins-semibold'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {statusTransaksi}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View className="mt-4 px-4">
              <TouchableOpacity
                className={`py-3 rounded-md ${
                  hasChanges() ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                disabled={!hasChanges()}
                onPress={handleConfirm}>
                <Text className="text-white text-center font-poppins-semibold">
                  Terapkan Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const LaporanCards = ({item}) => {
    const dropdownOptions = [
      {
        id: 'Hapus',
        title: 'Hapus',
        action: item => deleteLaporan(`/master/delete-laporan/${item.id}`),
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
            <View className="flex-row  items-start gap-x-2 ">
              <Image
                source={require('../../../../../assets/images/logo.png')}
                className="w-12 h-12 rounded-full"
              />
              <View className="flex-col items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.user.name}
                </Text>
                <Text
                  className="font-poppins-regular text-sm "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.transaction_code}
                </Text>
                <View
                  className={`rounded-md  justify-center items-center flex-col mt-1 py-1 max-w-[120px] ${backgroundColor(
                    item?.transaction_status,
                  )}`}>
                  <Text
                    className={`font-poppins-medium text-xs mx-2 ${textColor(
                      item?.transaction_status,
                    )}`}>
                    {item?.transaction_status}
                  </Text>
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
        <View
          className="border-[0.5px] w-full my-2 opacity-40 rounded-es-xl"
          style={{borderColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}></View>
        <View className="flex-row w-full justify-between items-center ">
          <View className="w-1/2 gap-x-2 flex-col items-start justify-start space-y-1">
            <View className="flex-row justify-between space-x-1">
              <Text
                className="font-poppins-regular text-sm "
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_time}
              </Text>
              <Text
                className="font-poppins-regular text-sm "
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                :
              </Text>
              <Text
                className="font-poppins-regular text-sm "
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item?.transaction_date}
              </Text>
            </View>
            <Text
              className="font-poppins-regular text-sm "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item?.transaction_message}
            </Text>
          </View>
          <View
            className="border-[0.5px] h-7 w-[0.3px] opacity-40"
            style={{borderColor: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}></View>
          <View className="w-1/2  gap-x-2 flex-col items-start justify-start">
            <Text
              className="font-poppins-regular text-sm "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item?.transaction_number}
            </Text>
            <Text
              className="font-poppins-regular text-sm "
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {rupiah(item?.transaction_total)}
            </Text>
          </View>
        </View>
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
        url="/master/laporan"
        Plugin={Plugs}
        payload={payload}
        ref={paginateRef}
        renderItem={LaporanCards}
      />
      <TypePicker
        visible={modalTransactionStatus}
        onClose={() => setModalTransactionStatus(false)}
      />
      <DeleteConfirmationModal />
      <SuccessOverlayModal />
      <FailedOverlayModal />
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
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
