import {
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
} from '../../../../../utils/const';
import Paginate from '../../../../../components/Paginate';
import {MenuView} from '@react-native-menu/menu';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rupiah} from '../../../../../libs/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDelete} from '../../../../../hooks/useDelete';
import {useQueryClient} from '@tanstack/react-query';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

  const Plugs = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalTypeVisible(true);
          setTempCategory(selectedCategory);
          setTempProvider(selectedProvider);
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
    const providers = ['Telkomsel', 'XL', 'Indosat'];

    const hasChanges = () => {
      return tempCategory !== '' || tempProvider !== '';
    };

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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Filter</Text>
              <TouchableOpacity
                onPress={() => {
                  setTempCategory('');
                  setTempProvider('');
                  onClose();
                }}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between px-4">
              <View className="flex-1 mr-2">
                <Text className="text-black font-poppins-semibold mb-2">
                  Kategori
                </Text>
                <ScrollView className="max-h-64">
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category}
                      className={`p-3 rounded-md mb-2 ${
                        tempCategory === category
                          ? 'bg-blue-100'
                          : 'bg-[#ececec]'
                      }`}
                      onPress={() => setTempCategory(category)}>
                      <Text
                        className={`${
                          tempCategory === category
                            ? 'text-blue-500 font-poppins-semibold'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-black font-poppins-semibold mb-2">
                  Provider
                </Text>
                <ScrollView className="max-h-64">
                  {providers.map(provider => (
                    <TouchableOpacity
                      key={provider}
                      className={`p-3 rounded-md mb-2 ${
                        tempProvider === provider
                          ? 'bg-blue-100'
                          : 'bg-[#ececec]'
                      }`}
                      onPress={() => setTempProvider(provider)}>
                      <Text
                        className={`${
                          tempProvider === provider
                            ? 'text-blue-500 font-poppins-semibold'
                            : 'text-black font-poppins-regular'
                        }`}>
                        {provider}
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
      }, 2000);
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
            <View className="flex-row  items-start gap-x-2 ">
              <Image
                source={require('../../../../../../assets/images/logo.png')}
                className="w-12 h-12 rounded-full"
              />
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
