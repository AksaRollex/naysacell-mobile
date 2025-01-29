import {
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  BLUE_COLOR,
  SLATE_COLOR,
} from '../../../utils/const';
import {rupiah} from '../../../libs/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Paginate from '../../../components/Paginate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function HistoryDeposit({}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();
  const navigation = useNavigation();

  const [depositStatus, setDepositStatus] = React.useState('');
  const [selectedDepositStatus, setSelectedDepositStatus] = React.useState('');
  const [modalDepositStatus, setModalDepositStatus] = React.useState(false);
  const [payload, setPayload] = React.useState({});

  const Plugs = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalDepositStatus(true);
          setDepositStatus(selectedDepositStatus);
        }}
        className=" flex-row items-center rounded-xl border-[0.5px] border-stone-600 justify-between p-[14px] min-w-[70px] mb-4"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}>
        <View className="flex-row items-center">
          <IonIcons
            name="bag-check"
            size={20}
            color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
          />
          <Text
            className=" font-poppins-regular mx-2 text-sm"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {selectedDepositStatus || 'Status'}
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
    };

    const status = ['pending', 'success', 'failed'];

    const hasChanges = () => {
      return depositStatus !== '';
    };

    const handleConfirm = () => {
      const selectedValue =
        statusMapping[depositStatus]?.value || depositStatus;
      setSelectedDepositStatus(
        statusMapping[depositStatus]?.display || depositStatus,
      );
      setPayload(prev => ({
        ...prev,
        status: selectedValue.toLowerCase(),
      }));

      if (paginateRef.current) {
        paginateRef.current.refetch();
      }
      onClose();
    };

    useEffect(() => {
      if (paginateRef.current) {
        paginateRef.current.refetch();
      }
    }, [payload]);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDepositStatus}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent(isDarkMode)]}>
            <View style={[styles.modalHeader(isDarkMode)]}>
              <Text style={[styles.modalTitle(isDarkMode)]}>Pilih Filter</Text>
              <TouchableOpacity
                onPress={() => {
                  setDepositStatus('');
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
                  className="text-black font-poppins-semibold mb-2"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  Status Transaksi
                </Text>
                <ScrollView className="max-h-64">
                  {status.map(statusDeposit => (
                    <TouchableOpacity
                      key={statusDeposit}
                      className={`p-3 rounded-xl mb-2 ${
                        depositStatus === statusDeposit
                          ? 'bg-blue-100'
                          : isDarkMode
                          ? 'bg-[#262626]'
                          : 'bg-[#f8f8f8]'
                      }`}
                      onPress={() => setDepositStatus(statusDeposit)}>
                      <Text
                        className={`${
                          depositStatus === statusDeposit
                            ? 'text-blue-500 font-poppins-semibold'
                            : isDarkMode
                            ? 'text-white font-poppins-regular'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {statusMapping[statusDeposit]?.display || statusDeposit}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
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

  const getStatusColor = status => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'Gagal':
      case 'failed ':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'success':
        return 'Berhasil';
      case 'pending':
        return 'Pending';
      case 'failed ':
        return 'Gagal';
      default:
        return 'Gagal';
    }
  };
  const historiDepositCards = ({item}) => {
    return (
      <>
        <View className="ms-2 w-full  px-2">
          <Text
            className="font-poppins-regular text-[13px]  capitalize"
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {new Date(item?.created_at || '').toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <View
          className="w-full p-2 flex-col  rounded-xl mb-4"
          style={{backgroundColor: isDarkMode ? '#262626' : '#f9f9f9'}}>
          <View className="rounded-xl  w-full p-2 flex-row items-center justify-between ">
            <View
              className="items-center justify-center"
              style={{
                backgroundColor: isDarkMode ? '#242424' : '#fff',
                width: 50,
                height: 50,
                borderRadius: 25,
              }}>
              <MaterialCommunityIcons
                name="credit-card-plus"
                size={25}
                color={BLUE_COLOR}
              />
            </View>
            <View className="flex-col items-end">
              <Text
                className={`font-poppins-semibold text-end ${getStatusColor(
                  item.status,
                )}`}>
                {getStatusText(item.status)}
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item.user_number}
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item.amount)}
              </Text>
              <TouchableOpacity
                className="flex-row mt-2 items-end"
                onPress={() =>
                  navigation.navigate('DetailHistoryDeposit', {item})
                }>
                <Text
                  value
                  className="text-xs font-poppins-regular "
                  style={{color: isDarkMode ? SLATE_COLOR : SLATE_COLOR}}>
                  Ketuk Untuk Melihat Detail
                </Text>
                <MaterialCommunityIcons
                  name="chevron-double-right"
                  size={17}
                  color={isDarkMode ? SLATE_COLOR : SLATE_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <View
      className="w-full h-full py-4"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <Paginate
        url="/auth/histori-deposit"
        renderItem={historiDepositCards}
        ref={paginateRef}
        showSearchSkeleton={false}
        showPaginationInfo={false}
        Plugin={Plugs}
        showListFooter={false}
        showTopMargin={false}
        payload={payload}
        showSearch={false}
      />
      <TypePicker
        visible={modalDepositStatus}
        onClose={() => setModalDepositStatus(false)}
      />
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
