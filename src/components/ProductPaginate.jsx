import React, {
  memo,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
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
import {useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../libs/axios';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {CheckProduct} from '../../assets';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProductPaginate = forwardRef(
  ({url, payload, renderItem, Plugin, onItemPress, editUrl, ...props}, ref) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const cardData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const {data, isFetching, refetch} = useQuery({
      queryKey: [url, page],
      queryFn: () => axios.post(url, {...payload, page}).then(res => res.data),
      placeholderData: {data: []},
      onSuccess: res => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // console.log(res.data, 888);
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

    // Fungsi baru untuk menangani press item
    const handleItemPress = item => {
      // Toggle selection jika item sudah dipilih
      setSelectedItem(prevSelected =>
        prevSelected && prevSelected.id === item.id ? null : item,
      );

      // Panggil onItemPress jika ada
      if (onItemPress) {
        onItemPress(item);
      }
    };

    // Fungsi untuk mengedit item (opsional)
    const handleEditItem = async item => {
      try {
        // Pastikan editUrl tersedia
        if (editUrl) {
          // Misalnya mengirim request edit ke API
          const response = await axios.get(`${editUrl}/${item.id}`, item);
          // Anda bisa menambahkan logika tambahan setelah edit berhasil
          console.log('Edit response:', response.data);

          // Optional: refetch data setelah edit
          refetch();
        }
      } catch (error) {
        console.error('Error editing item:', error);
        // Tambahkan error handling sesuai kebutuhan
      }
    };

    const ListFooter = () => (
      <View className="flex-row justify-center mt-4">
        {isFetchingMore && (
          <ActivityIndicator
            size="large"
            color="#312e81"
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
        <View className="mt-5 items-center">
          {cardData.map(index => (
            <View key={index} className="flex-row w-full px-4 mb-2">
              <View
                className="w-full rounded-2xl "
                style={{
                  backgroundColor: '#E6E6E6',
                }}>
                <Skeleton
                  animation="wave"
                  width="100%"
                  height={70}
                  LinearGradientComponent={LinearGradient}
                />
              </View>
            </View>
          ))}
        </View>
      );
    }

    const enhancedRenderItem = ({item, index}) => {
      // Periksa apakah item saat ini adalah item yang dipilih
      const isSelected = selectedItem && selectedItem.id === item.id;

      return (
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          onLongPress={editUrl ? () => handleEditItem(item) : undefined}
          style={[
            // Optional: tambahkan style khusus untuk item yang dipilih
            isSelected && {
              borderWidth: 2,
              borderColor: 'green', // Warna border hijau untuk item terpilih
              backgroundColor: 'rgba(0,255,0,0.1)', // Latar belakang transparan hijau
            },
          ]}>
          {renderItem({
            item,
            index,
            isSelected, // Kirim status selected ke render item
            // Optional: tambahkan komponen centang
            selectedComponent: isSelected ? (
              <View>
                <CheckProduct width={20} />
              </View>
            ) : null,
          })}
        </TouchableOpacity>
      );
    };

    return (
      <View className="flex-1 p-4" {...props}>
        <FlatList
          data={dataList}
          renderItem={enhancedRenderItem}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center mt-20">
              <Image
                source={require('../../assets/images/datanotfound.png')}
                className="w-60 h-60 opacity-60 "
              />
              <Text className="text-gray-500 font-poppins-regular ">
                Data Tidak Ditemukan
              </Text>
            </View>
          )}
        />
      </View>
    );
  },
);

export default memo(ProductPaginate);
