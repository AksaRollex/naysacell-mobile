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
} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../libs/axios';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
// import Icons from 'react-native-vector-icons/Feather';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Paginate = forwardRef(
  ({url, payload, renderItem, Plugin, ...props}, ref) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const cardData = [1, 2, 3];

    const {data, isFetching, refetch} = useQuery({
      queryKey: [url, page],
      queryFn: () => axios.post(url, {...payload, page}).then(res => res.data),
      placeholderData: {data: []},
      onSuccess: res => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.log(res.data, 88);
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
    }));

    useEffect(() => {
      setPage(1);
      refetch();
    }, [payload]);

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
          {cardData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 12,
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
                    height={180}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      top: '5%',
                      left: '5%',
                    }}>
                    <Skeleton
                      animation="wave"
                      width={360}
                      height={30}
                      LinearGradientComponent={LinearGradient}
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

    return (
      <View className="flex-1 p-4" {...props}>
        <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          numColumns={2}
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

export default memo(Paginate);
