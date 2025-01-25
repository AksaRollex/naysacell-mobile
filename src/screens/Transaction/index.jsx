import {
  useColorScheme,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  windowHeight,
  windowWidth,
} from '../../utils/const';
import {ImageBackground} from 'react-native';
import {HeaderBG} from '../../../assets';
import {useQueryClient, useQuery} from '@tanstack/react-query';
import {rupiah} from '../../libs/utils';
import axios from '../../libs/axios';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Paginate = forwardRef(
  (
    {
      url,
      payload,
      renderItem,
      Plugin,
      onItemPress,
      statusFilter,
      editUrl,
      ...props
    },
    ref,
  ) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const cardData = [1, 2, 3];

    const {data, isFetching, refetch} = useQuery({
      queryKey: [url, page],
      queryFn: () => axios.post(url, {...payload, page}).then(res => res.data),
      placeholderData: {data: []},
      onSuccess: res => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (page === 1) {
          setDataList(res.data);
        } else {
          setDataList(prevData => [...prevData, ...(res.data || [])]);
        }
      },
    });

    useEffect(() => {
      if (!data?.data?.length) queryClient.invalidateQueries([url]);
    }, [data]);

    useImperativeHandle(ref, () => ({
      refetch,
      editItem: handleEditItem,
    }));

    useEffect(() => {
      if (page === 1) {
        refetch();
      }
    }, [JSON.stringify(payload)]);

    const handleLoadMore = () => {
      if (!isFetchingMore && page < data.last_page) {
        setIsFetchingMore(true);
        setPage(prevPage => prevPage + 1);
      }
    };

    useEffect(() => {
      if (isFetchingMore) {
        refetch().finally(() => setIsFetchingMore(false));
      }
    }, [isFetchingMore]);

    const handleScroll = event => {
      const scrollOffset = event.nativeEvent.contentOffset.y;
      if (scrollOffset <= 0 && page > 1) {
        setPage(1);
      }
    };

    const handleItemPress = item => {
      setSelectedItem(prevSelected =>
        prevSelected && prevSelected.id === item.id ? null : item,
      );
      if (onItemPress) {
        onItemPress(item);
      }
    };

    const handleEditItem = async item => {
      try {
        if (editUrl) {
          const response = await axios.get(`${editUrl}/${item.id}`, item);
          console.log('Edit response:', response.data);
          refetch();
        }
      } catch (error) {
        console.error('Error editing item:', error);
      }
    };

    const ListFooter = () => (
      <View className="flex-row justify-center mt-4">
        {isFetchingMore && (
          <ActivityIndicator
            size="large"
            color="#138EE9"
            style={{
              transform: [{scale: 1.1}],
              opacity: isFetchingMore ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
      </View>
    );

    if (isFetching && page === 1) {
      return (
        <View className=" items-center rounded-xl">
          {cardData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                width: '90%',
              }}>
              <View className="items-center">
                <View
                  LinearGradientComponent={LinearGradient}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Skeleton
                    animation="wave"
                    width={390}
                    LinearGradientComponent={LinearGradient}
                    height={160}
                    style={{borderRadius: 12}}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: '5%',
                      left: '5%',
                    }}>
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 10}}
                    />
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 10}}
                    />
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 10}}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }

    const enhancedRenderItem = ({item, index}) => {
      const isSelected = selectedItem && selectedItem.id === item.id;
      return (
        <View style={{width: '100%', padding: 5}}>
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
            onLongPress={editUrl ? () => handleEditItem(item) : undefined}>
            {renderItem({
              item,
              index,
              isSelected,
            })}
          </TouchableOpacity>
        </View>
      );
    };

    const filteredDataList =
      statusFilter && statusFilter !== 'all'
        ? dataList.filter(
            item =>
              item.transaction_status.toLowerCase() ===
              statusFilter.toLowerCase(),
          )
        : dataList;

    return (
      <View className="flex-1 px-4" {...props}>
        <FlatList
          data={filteredDataList}
          renderItem={enhancedRenderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          onEndReached={handleLoadMore}
          ListFooterComponent={ListFooter}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center mt-20">
              <Image
                source={require('../../../assets/images/datanotfound.png')}
                className="w-60 h-60 opacity-60"
              />
              <Text className="text-gray-500 font-poppins-regular capitalize">
                Tidak Ada Data Transaksi{' '}
                {statusFilter === 'all' ? '' : statusFilter}
              </Text>
            </View>
          )}
        />
      </View>
    );
  },
);

export default function Transaction({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const [statusFilter, setStatusFilter] = useState('all');

  const getPaymentStatusColor = payment_status => {
    if (payment_status === 'success') {
      return 'text-green-400';
    } else if (payment_status === 'pending') {
      return 'text-yellow-400';
    } else if (payment_status === 'failed') {
      return 'text-red-400';
    }
  };

  const getPaymentStatusText = payment_status => {
    switch (payment_status) {
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

  const transactionCard = ({item}) => {
    if (
      statusFilter !== 'all' &&
      item.transaction_status.toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return null;
    }

    return (
      <View>
        <View className="ms-2 w-full  px-2">
          <Text
            value
            className="text-[13px]  capitalize font-poppins-regular "
            style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
            {new Date(item.transaction_date).toLocaleDateString(`id-ID`, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        <TouchableOpacity
          className="rounded-xl p-2 flex-col mb-4"
          onPress={() => navigation.navigate('DetailTransaction', {item})}
          style={{
            backgroundColor: isDarkMode ? '#262626' : WHITE_BACKGROUND,
            shadowColor: isDarkMode ? '#fff' : '#000',
          }}>
          <View className="flex-row justify-between items-center my-1 ">
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Status Pesanan
            </Text>
            <Text
              className={`font-poppins-semibold text-end ${getStatusColor(
                item.transaction_status,
              )}`}>
              {getStatusText(item.transaction_status)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center my-1 ">
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Status Pembayaran
            </Text>
            <Text
              className={`font-poppins-semibold text-end ${getPaymentStatusColor(
                item.payment_status,
              )}`}>
              {getPaymentStatusText(item.payment_status)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center my-1 ">
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Produk
            </Text>
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.transaction_product}
            </Text>
          </View>
          <View className="flex-row justify-between items-center my-1 ">
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Pesan
            </Text>
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.transaction_message}
            </Text>
          </View>
          <View className="flex-row justify-between items-center my-1 ">
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Harga
            </Text>
            <Text
              className="text-sm font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {rupiah(item.transaction_total)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      <ImageBackground
        source={HeaderBG}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
        }}>
        <View style={{padding: 20}}>
          <Text className="text-white font-poppins-semibold text-base  ">
            Histori Transaksi
          </Text>
        </View>
      </ImageBackground>

      <View className=" justify-center items-center flex">
        <View
          className="w-full p-7  flex-row justify-between flex-wrap"
          style={{height: windowHeight * 0.11}}>
          {/* Tombol Semua */}
          <TouchableOpacity
            onPress={() => setStatusFilter('all')}
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'all'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'all'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? DARK_COLOR
                    : LIGHT_COLOR,
              }}>
              Semua
            </Text>
          </TouchableOpacity>

          {/* Tombol Sukses */}
          <TouchableOpacity
            onPress={() => setStatusFilter('success')}
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'success'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'success'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? '#80ed80ff'
                    : BLUE_COLOR,
              }}>
              Berhasil
            </Text>
          </TouchableOpacity>

          {/* Tombol Pending */}
          <TouchableOpacity
            onPress={() => setStatusFilter('pending')}
            className="h-full rounded-md items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'pending'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'pending'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? '#FACC15'
                    : BLUE_COLOR,
              }}>
              Pending
            </Text>
          </TouchableOpacity>

          {/* Tombol Gagal */}
          <TouchableOpacity
            onPress={() => setStatusFilter('failed')}
            className="h-full rounded-md items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'Gagal'
                  ? BLUE_COLOR
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'failed'
                    ? WHITE_COLOR
                    : isDarkMode
                    ? '#ff746c'
                    : BLUE_COLOR,
              }}>
              Gagal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Paginate
        url="/auth/histori"
        renderItem={transactionCard}
        ref={paginateRef}
        showSearch={false}
        statusFilter={statusFilter}
      />
    </View>
  );
}
