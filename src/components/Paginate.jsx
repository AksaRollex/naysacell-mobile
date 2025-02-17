import React, {
  memo,
  useState,
  useEffect,
  forwardRef,
  useMemo,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Image,
  Dimensions,
  useColorScheme,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import axios from '../libs/axios';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Feather';
import {DARK_COLOR, LIGHT_COLOR, SLATE_COLOR} from '../utils/const';

const windowWidth = Dimensions.get('window').width;

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
      showSearch = true,
      showListFooter = true,
      showPaginationInfo = true,
      showSearchSkeleton = true,
      isExternalLoading = false,
      showTopMargin = true,
      widthSkeleton = false,
      ...props
    },
    ref,
  ) => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const {control, handleSubmit} = useForm();
    const cardData = [1, 2];
    const isDarkMode = useColorScheme() === 'dark';

    const {data, isFetching, refetch} = useQuery({
      queryKey: [url, page, search, JSON.stringify(payload)],
      queryFn: () =>
        axios
          .post(url, {
            page,
            search,
            ...(payload || {}),
          })
          .then(res => res.data),
      placeholderData: {data: []},
      onSuccess: res => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDataList(res.data);
      },
    });

    const PaginationInfo = () => {
      if (!showPaginationInfo) return null;

      const startIndex = (page - 1) * (data?.per_page || 10) + 1;
      const endIndex = Math.min(
        page * (data?.per_page || 10),
        data?.total || 0,
      );
      const totalItems = data?.total || 0;

      return (
        <View className="mt-2 mb-6">
          <Text className=" text-sm text-start text-gray-500 font-poppins-regular normal-case">
            Menampilkan {startIndex} sampai {endIndex} dari {totalItems} data
          </Text>
        </View>
      );
    };

    const pagination = useMemo(() => {
      const totalPages = data.last_page || 1;
      const currentPage = data.current_page || 1;
      const pagesToShow = 5;

      let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      if (endPage - startPage + 1 < pagesToShow) {
        startPage = Math.max(1, endPage - pagesToShow + 1);
      }

      return Array.from(
        {length: endPage - startPage + 1},
        (_, i) => startPage + i,
      );
    }, [data?.current_page, data?.last_page]);

    useEffect(() => {
      if (data && !data.data?.length) {
        queryClient.invalidateQueries([url]);
      }
      console.log(payload);
    }, [data]);

    useEffect(() => {
      console.log('Payload changed:', payload);
      refetch();
    }, [JSON.stringify(payload)]);

    useImperativeHandle(ref, () => ({
      refetch,
    }));

    useEffect(() => {
      if (page === 1) {
        refetch();
      }
    }, [JSON.stringify(payload)]);

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

    const handleSearch = query => {
      setSearch(query);
      setPage(1);
      refetch();
    };

    const SearchComponent = ({control, handleSearch, isDarkMode}) => (
      <Controller
        control={control}
        name="search"
        render={({field: {onChange, value}}) => (
          <View className="flex-1 relative">
            <TextInput
              className="w-full font-poppins-medium pr-12 h-12 rounded-xl border-[0.5px] border-stone-600  px-4"
              style={{
                backgroundColor: isDarkMode ? '#262626' : '#fff',
                color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
              }}
              value={value}
              placeholderTextColor={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              placeholder="Cari..."
              onChangeText={text => {
                onChange(text);
              }}
              onSubmitEditing={() => {
                handleSearch(value);
              }}
            />
            <TouchableOpacity
              className="absolute right-2 top-2 -translate-y-1/2 p-2 rounded-md"
              activeOpacity={0.7}
              onPress={() => handleSearch(value)}>
              <Icons
                name="search"
                size={18}
                color={isDarkMode ? DARK_COLOR : LIGHT_COLOR}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    );

    const ListHeader = () => (
      <View className={`mb-1 ${showTopMargin ? 'mt-4' : ''}`}>
        <View className="flex-row items-center space-x-4">
          {showSearch && (
            <SearchComponent
              control={control}
              handleSearch={handleSearch}
              isDarkMode={isDarkMode}
            />
          )}
          {Plugin && (
            <View className="flex-shrink-0">
              <Plugin />
            </View>
          )}
        </View>
      </View>
    );

    const ListFooter = () => {
      if (!showListFooter) return null;

      return (
        <View className="flex-row justify-start mt-6 space-x-2 items-center">
          {page > 1 && (
            <>
              <TouchableOpacity
                className="px-3 py-2 rounded-lg border"
                style={{borderColor: '#138EE9'}}
                onPress={() => setPage(1)}>
                <Icons name="chevrons-left" size={18} color="#138EE9" />
              </TouchableOpacity>
            </>
          )}

          {pagination.map(i => (
            <TouchableOpacity
              key={i}
              className={`px-3 py-2 rounded-md border ${
                i == data?.current_page
                  ? 'bg-[#138EE9] border-[#138EE9] border'
                  : 'border-[#138EE9] border'
              }`}
              onPress={() => setPage(i)}>
              <Text
                className={`${
                  i == data?.current_page ? 'text-white' : 'text-[#138EE9]'
                } font-semibold`}>
                {i}
              </Text>
            </TouchableOpacity>
          ))}

          {page < data.last_page && (
            <>
              <TouchableOpacity
                className="px-3 py-2 mx-2 rounded-md border border-[#138EE9]"
                onPress={() => setPage(data.last_page)}>
                <Icons name="chevrons-right" size={18} color="#138EE9" />
              </TouchableOpacity>
            </>
          )}
        </View>
      );
    };

    const shouldShowLoading = isExternalLoading || (isFetching && page === 1);

    if (shouldShowLoading) {
      return (
        <View className=" items-center">
          {showSearchSkeleton && (
            <View
              className="flex-row justify-center items-center mt-6"
              style={{width: '90%'}}>
              <Skeleton
                animation="wave"
                width={390}
                LinearGradientComponent={LinearGradient}
                height={53}
                style={{borderRadius: 12}}
              />
            </View>
          )}
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
                    width={widthSkeleton ? 350 : 390}
                    LinearGradientComponent={LinearGradient}
                    height={120}
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
                      style={{marginTop: 6}}
                    />
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 6}}
                    />
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 6}}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: '5%',
                      right: '5%',
                    }}>
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 6}}
                    />
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 6}}
                    />
                    <Skeleton
                      animation="wave"
                      width={100}
                      height={28}
                      LinearGradientComponent={LinearGradient}
                      style={{marginTop: 6}}
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
      <View className="flex-1 px-4" {...props}>
        <ListHeader />
        <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View className="justify-end items-start">
              <ListFooter />
              <PaginationInfo />
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center my-5">
              <Image
                source={require('../../assets/images/datanotfound.png')}
                className="w-28 h-28 my-5 opacity-60 "
              />
              <Text className=" font-poppins-regular text-xs " style={{  color : SLATE_COLOR }}>
                Data Tidak Tersedia
              </Text>
            </View>
          )}
        />
      </View>
    );
  },
);

export default memo(Paginate);
