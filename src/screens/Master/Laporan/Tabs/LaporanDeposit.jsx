import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  BLUE_COLOR,
} from '../../../../utils/const';
import Paginate from '../../../../components/Paginate';
import {rupiah} from '../../../../libs/utils';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {MenuView} from '@react-native-menu/menu';
import {useDelete} from '../../../../hooks/useDelete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQueryClient} from '@tanstack/react-query';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LaporanDeposit({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const backgroundColor = status => {
    if (status === 'success') {
      return 'bg-green-100';
    } else if (status === 'pending') {
      return 'bg-blue-100';
    } else if (status === 'failed') {
      return 'bg-red-100';
    } else {
      return 'bg-gray-100';
    }
  };
  const textColor = status => {
    if (status === 'success') {
      return 'text-green-600';
    } else if (status === 'pending') {
      return 'text-blue-500';
    } else if (status === 'failed') {
      return 'text-red-500';
    } else {
      return 'text-gray-600';
    }
  };

  const text = status => {
    if (status === 'success') {
      return 'Berhasil';
    } else if (status === 'pending') {
      return 'Pending';
    } else if (status === 'failed') {
      return 'Gagal';
    }
  };

  const queryClient = useQueryClient();

  const {
    delete: deleteLaporanDeposit,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  } = useDelete({
    onSuccess: () => {
      queryClient.invalidateQueries('/auth/histori-deposit-web');
      navigation.navigate('LaporanDeposit');
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
    const statusMapping = {
      all: {
        display: 'Semua',
        value: 'all',
      },
      pending: {
        display: 'Menunggu',
        value: 'pending',
      },
      success: {
        display: 'Berhasil',
        value: 'success',
      },
      failed: {
        display: 'Gagal',
        value: 'failed',
      },
      process: {
        display: 'Proses',
        value: 'process',
      },
      cancelled: {
        display: 'Dibatalkan',
        value: 'cancelled',
      },
    };
    const status = [
      'all',
      'pending',
      'success',
      'failed',
      'process',
      'cancelled',
    ];

    const hasChanges = () => {
      return transactionStatus !== '';
    };

    const handleConfirm = () => {
      const selectedValue =
        statusMapping[transactionStatus]?.value || transactionStatus;
      setSelectedTransactionStatus(
        statusMapping[transactionStatus]?.display || transactionStatus,
      );
      setPayload(prev => ({
        ...prev,
        status: selectedValue === 'all' ? '' : selectedValue.toLowerCase(),
      }));

      if (paginateRef.current) {
        paginateRef.current.refetch();
      }
      onClose();
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTransactionStatus}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent(isDarkMode)}>
            <View style={styles.modalHeader(isDarkMode)}>
              <Text style={styles.modalTitle(isDarkMode)}>Pilih Filter</Text>
              <TouchableOpacity
                onPress={() => {
                  setTransactionStatus('');
                  onClose();
                }}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between px-4">
              <View className="flex-1 mr-2">
                <Text
                  className="font-poppins-semibold mb-2"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Status Transaksi
                </Text>
                <ScrollView className="max-h-64">
                  {status.map(statusTransaksi => (
                    <TouchableOpacity
                      key={statusTransaksi}
                      className={`p-3 rounded-md mb-2 ${
                        transactionStatus === statusTransaksi
                          ? 'bg-blue-100'
                          : isDarkMode
                          ? 'bg-[#262626]'
                          : 'bg-[#f8f8f8]'
                      }`}
                      onPress={() => setTransactionStatus(statusTransaksi)}>
                      <Text
                        className={`${
                          transactionStatus === statusTransaksi
                            ? 'text-blue-500 font-poppins-semibold'
                            : isDarkMode
                            ? 'text-white font-poppins-regular'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {statusMapping[statusTransaksi]?.display ||
                          statusTransaksi}
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
                  TERAPKAN
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
        action: item =>
          deleteLaporanDeposit(`/master/delete-laporan-deposit/${item.id}`),
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
                <IonIcons name="receipt" size={25} color={BLUE_COLOR} />
              </View>

              <View className="flex-col items-start justify-start ">
                <Text
                  className="font-poppins-medium text-base "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.user_name}
                </Text>
                <Text
                  className="font-poppins-regular text-sm "
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.deposit_code}
                </Text>
                <View className="flex-row justify-center items-center gap-x-2">
                  <View className="bg-green-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                    <IonIcons name="call" color="#658844" size={15} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#658844]">
                      {item?.user_number}
                    </Text>
                  </View>
                  <View className="bg-gray-100 rounded-md pl-2    mt-1 justify-center  items-center flex-row  py-1 max-w-[190px]">
                    <IonIcons name="today" color="#2f2f2f" size={15} />
                    <Text
                      className="font-poppins-regular text-xs mx-2"
                      style={{color: '#2f2f2f'}}>
                      {new Date(item.created_at).toLocaleDateString(`id-ID`, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-x-2">
                  <View className="bg-blue-100 rounded-md pl-2   mt-1 justify-center  items-center flex-row  py-1 max-w-[120px]">
                    <IonIcons name="pricetag" color="#138EE9" size={15} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                      {rupiah(item?.amount)}
                    </Text>
                  </View>
                  <View
                    className={`rounded-md  justify-center items-center flex-row mt-1 py-1 gap-x-2 ${backgroundColor(
                      item?.status,
                    )}`}>
                    {item?.status === 'success' ? (
                      <IonIcons
                        name="checkmark-done-sharp"
                        color="#4caf50"
                        size={15}
                      />
                    ) : item?.status === 'failed' ? (
                      <IonIcons name="close-sharp" color="#138EE9" size={15} />
                    )  : item?.status  === 'cancelled' ? (
                      <IonIcons name="close-sharp" color="#ef4444" size={15} />
                    )  : item?.status === 'pending' ? (
                      <IonIcons name="time-sharp" color="#3b82f6" size={15} />
                    ) : item?.status === 'process' ? (
                      <IonIcons name="settings-sharp" color="#eab308" size={15} />
                    )
                    : (
                      <IonIcons name="time-sharp" color="#3b82f6" size={15} />
                    )}
                    <Text
                      className={`font-poppins-medium text-xs mx-2  ${textColor(
                        item?.status,
                      )}`}>
                      {text(item?.status)}
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
        url="/auth/histori-deposit"
        ref={paginateRef}
        payload={payload}
        Plugin={Plugs}
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
  modalContent: isDarkMode => ({
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  }),
  modalHeader: isDarkMode => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  }),
  modalTitle: isDarkMode => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
});
