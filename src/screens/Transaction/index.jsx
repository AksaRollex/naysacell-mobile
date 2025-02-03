import {
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  SLATE_COLOR,
} from '../../utils/const';
import {rupiah} from '../../libs/utils';
import Paginate from '../../components/Paginate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function Transaction({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const [transactionStatus, setTransactionStatus] = React.useState('');
  const [selectedTransactionStatus, setSelectedTransactionStatus] =
    React.useState('');
  const [modalTransactionStatus, setModalTransactionStatus] =
    React.useState(false);
  const [payload, setPayload] = React.useState({});

  const getStatusColor = status => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'Pending':
        return 'text-yellow-400';
      case 'Gagal':
      case 'Failed ':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'success':
        return 'Berhasil';
      case 'Pending':
        return 'Pending';
      case 'Failed ':
        return 'Gagal';
      default:
        return 'Gagal';
    }
  };

  const Plugs = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalTransactionStatus(true);
          setTransactionStatus(selectedTransactionStatus);
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
      Pending: {
        display: 'Menunggu',
        value: 'pending',
      },
      Success: {
        display: 'Berhasil',
        value: 'success',
      },
      Failed: {
        display: 'Gagal',
        value: 'failed',
      },
    };

    const status = ['Pending', 'Success', 'Failed'];

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
        transaction_status: selectedValue.toLowerCase(),
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
        visible={modalTransactionStatus}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent(isDarkMode)]}>
            <View style={[styles.modalHeader(isDarkMode)]}>
              <Text style={[styles.modalTitle(isDarkMode)]}>Pilih Filter</Text>
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
                      className={`p-3 rounded-xl mb-2 ${
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

  const transactionCard = ({item}) => {
    return (
      <>
        <View className="ms-2 w-full  px-2">
          <Text
            className="font-poppins-regular text-[13px]  normal-case"
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
          style={{backgroundColor: isDarkMode ? '#232323' : '#f9f9f9'}}>
          <View className="rounded-xl  w-full p-2 flex-row items-center justify-between ">
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
            <View className="flex-col items-end">
              <Text
                className={`font-poppins-semibold text-end ${getStatusColor(
                  item.transaction_status,
                )}`}>
                {getStatusText(item.transaction_status)}
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {item.transaction_product}
              </Text>
              <Text
                className="text-sm font-poppins-regular"
                style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                {rupiah(item.transaction_total)}
              </Text>
              <TouchableOpacity
                className="flex-row mt-2 items-end"
                onPress={() =>
                  navigation.navigate('DetailTransaction', {item})
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
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <Paginate
        url="/auth/histori"
        renderItem={transactionCard}
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
        visible={modalTransactionStatus}
        onClose={() => setModalTransactionStatus(false)}
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
