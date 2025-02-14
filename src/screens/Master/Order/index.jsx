import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import Paginate from '../../../components/Paginate';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../utils/const';
import {MenuView} from '@react-native-menu/menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rupiah} from '../../../libs/utils';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useQueryClient} from '@tanstack/react-query';
import {useDelete} from '../../../hooks/useDelete';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Order({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const backgroundColorOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'bg-blue-100';
    } else if (order_status === 'success') {
      return 'bg-green-100';
    } else if (order_status === 'processing') {
      return 'bg-yellow-100';
    } else if (order_status === 'cancelled') {
      return 'bg-red-100';
    } else {
      return 'bg-blue-100';
    }
  };

  const textColorOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'text-blue-500';
    } else if (order_status === 'success') {
      return 'text-green-500';
    } else if (order_status === 'processing') {
      return 'text-yellow-500';
    } else if (order_status === 'cancelled') {
      return 'text-red-500';
    } else {
      return 'text-blue-500';
    }
  };

  const textOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'Menunggu';
    } else if (order_status === 'success') {
      return 'Berhasil';
    } else if (order_status === 'processing') {
      return 'Proses';
    } else if (order_status === 'cancelled') {
      return 'Dibatalkan';
    } else {
      return 'Pending';
    }
  };

  const colorOrderStatus = order_status => {
    if (order_status === 'pending') {
      return '#3b82f6';
    } else if (order_status === 'success') {
      return '#4caf50';
    } else if (order_status === 'processing') {
      return '#eab308';
    } else if (order_status === 'cancelled') {
      return '#ef4444';
    } else {
      return '#3b82f6';
    }
  };

  const iconOrderStatus = order_status => {
    if (order_status === 'pending') {
      return 'time-sharp';
    } else if (order_status === 'success') {
      return 'checkmark-done-sharp';
    } else if (order_status === 'processing') {
      return 'settings-sharp';
    } else if (order_status === 'cancelled') {
      return 'close-sharp';
    } else {
      return 'time-sharp';
    }
  };

  const queryClient = useQueryClient();

  const {
    delete: deleteOrder,
    DeleteConfirmationModal,
    SuccessOverlayModal,
    FailedOverlayModal,
  } = useDelete({
    onSuccess: () => {
      queryClient.invalidateQueries('/master/order');
      navigation.navigate('Order');
    },
    onError: error => {
      console.log(error);
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
      processing: {
        display: 'Proses',
        value: 'processing',
      },
      cancelled: {
        display: 'Dibatalkan',
        value: 'cancelled',
      },
    };

    const status = ['all', 'pending', 'success', 'processing', 'cancelled'];

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
        order_status:
          selectedValue === 'all' ? '' : selectedValue.toLowerCase(),
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

  const orderCards = ({item}) => {
    console.log(item)
    const dropdownOptions = [
      {
        id: 'Edit',
        title: 'Edit',
        action: item => navigation.navigate('FormOrder', {id: item.id}),
      },
      {
        id: 'Hapus',
        title: 'Hapus',
        action: item => deleteOrder(`/master/order/delete/${item.id}`),
      },
    ];
    return (
      <View
        className="w-full p-2 flex-col rounded-xl mt-4"
        style={{
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor: isDarkMode ? '#262626' : '#f8f8f8',
        }}>
        <View className="flex-row w-full my-2 justify-center">
          <View className="w-full flex-row justify-between items-start">
            <View className="flex-row items-center justify-center gap-x-2">
              <View
                className="items-center justify-center"
                style={{
                  backgroundColor: isDarkMode ? '#242424' : '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}>
                <FontAwesome5Icon
                  name="cart-arrow-down"
                  size={25}
                  color={BLUE_COLOR}
                />
              </View>
              <View className="flex-col w-36 items-start justify-start">
                <Text
                  className="font-poppins-medium text-base"
                  style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
                  {item?.user?.name}
                </Text>

                <View className="flex-row gap-x-2">
                  <View className="bg-red-100 rounded-md pl-2 mt-1 justify-center items-center flex-row py-1 max-w-[190px]">
                    <IonIcons name="cart" color="#f43f5e" size={15} />
                    <Text
                      className="font-poppins-regular text-xs mx-2"
                      style={{color: '#f43f5e'}}>
                      {item?.product?.product_name}
                    </Text>
                  </View>

                  <View className="flex-row">
                    <View
                      className={`rounded-md pl-2 mt-1 justify-center items-center flex-row py-1 max-w-[120px] ${backgroundColorOrderStatus(
                        item?.transaction_model.order_status,
                      )}`}>
                      <IonIcons
                        name={iconOrderStatus(item?.transaction_model.order_status)}
                        color={colorOrderStatus(item?.transaction_model.order_status)}
                        size={15}
                      />
                      <Text
                        className={`font-poppins-medium text-xs mx-2 ${textColorOrderStatus(
                          item?.transaction_model.order_status,
                        )}`}>
                        {textOrderStatus(item?.transaction_model.order_status)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row gap-x-2">
                  <View className="bg-green-100 rounded-md pl-2 mt-1 justify-center items-center flex-row py-1 max-w-[130px]">
                    <IonIcons name="call" color="#658844" size={15} />
                    <Text className="font-poppins-medium text-xs mx-2 text-[#658844]">
                      {item?.transaction_model?.transaction_number}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <View className="bg-blue-100 rounded-md pl-2 mt-1 justify-center items-center flex-row py-1 max-w-[120px]">
                      <IonIcons name="pricetag" color="#138EE9" size={15} />
                      <Text className="font-poppins-medium text-xs mx-2 text-[#138EE9]">
                        {rupiah(item?.product?.product_price)}
                      </Text>
                    </View>
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
      <View
        className="rounded-lg"
        style={{backgroundColor: isDarkMode ? '#262626' : '#f8f8f8'}}></View>
      <Paginate
        url="/master/order"
        ref={paginateRef}
        renderItem={orderCards}
        payload={payload}
        Plugin={Plugs}
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