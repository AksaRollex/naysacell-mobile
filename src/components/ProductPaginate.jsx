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
      setSelectedItem(prevSelected =>
        prevSelected && prevSelected.id === item.id ? null : item,
      );
      if (onItemPress) {
        onItemPress(item);
      }
    };

    // Fungsi untuk mengedit item (opsional)
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
        <View className="mt-5 items-center">
          {/* Kontainer baris */}
          {cardData.map((_, index) => {
            // Membuat baris baru setiap dua item
            if (index % 2 === 0) {
              return (
                <View key={index} className="flex-row w-full mb-2 px-4">
                  {/* Elemen produk pertama */}
                  <View className="w-1/2 px-1" style={{}}>
                    <Skeleton
                      animation="wave"
                      width="100%"
                      style={{borderRadius: 12}}
                      height={70}
                      LinearGradientComponent={LinearGradient}
                    />
                  </View>
                  {/* Elemen produk kedua */}
                  {cardData[index + 1] && (
                    <View className="w-1/2 px-1" style={{}}>
                      <Skeleton
                        animation="wave"
                        width="100%"
                        style={{borderRadius: 12}}
                        height={70}
                        LinearGradientComponent={LinearGradient}
                      />
                    </View>
                  )}
                </View>
              );
            }
            return null; // Jangan render elemen jika bukan awal baris
          })}
        </View>
      );
    }

    const enhancedRenderItem = ({item, index}) => {
      const isSelected = selectedItem && selectedItem.id === item.id;
      return (
        <View style={{width: '50%', padding: 5}}>
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

    return (
      <View className="flex-1 p-4" {...props}>
        <FlatList
          data={dataList}
          renderItem={enhancedRenderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooter}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center mt-20">
              <Image
                source={require('../../assets/images/datanotfound.png')}
                className="w-60 h-60 opacity-60"
              />
              <Text className="text-gray-500 font-poppins-regular">
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
