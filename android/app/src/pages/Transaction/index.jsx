import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
  windowHeight,
  windowWidth,
} from '../../utils/const';
import {ImageBackground} from 'react-native';
import {HeaderBG} from '../../assets';
import axios from '../../libs/axios';
import Paginate from '../../components/Paginate';
import {rupiah} from '../../libs/utils';

export default function Transaction() {
  const isDarkMode = useColorScheme() === 'dark';
  const paginateRef = useRef();

  const [statusFilter, setStatusFilter] = useState('all');
  const [transactions, setTransactions] = useState([]);

  const filteredTransactions = transactions.filter(transaction => {
    if (statusFilter === 'all') return true;
    return (
      transaction.transaction_status.toLowerCase() ===
      statusFilter.toLowerCase()
    );
  });

  useEffect(() => {
    const payload = {
      role_id: 3,
    };
    axios
      .post('/auth/histori', payload)
      .then(res => {
        // Ambil data dari respons
        setTransactions(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setTransactions([]); // Set ke array kosong jika ada error
      });
  }, []);

  const transactionCard = ({item}) => {
    return (
      <TouchableOpacity
        id="cardTransaction"
        className="rounded-md p-3 flex-col mb-5"
        style={{
          backgroundColor: isDarkMode ? '#27272A' : WHITE_BACKGROUND,
          elevation: 3,
          shadowColor: isDarkMode ? '#fff' : '#000',
        }}>
        <View
          id="cardTitle"
          className="flex-row justify-between border-b py-3"
          style={{borderColor: isDarkMode ? GREY_COLOR : LIGHT_COLOR}}>
          <View className="flex-col justify-start items-start">
            <Text
              className="font-poppins-semibold"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Pulsa
            </Text>
            <Text
              className="font-poppins-semibold"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              {item.transaction_code}
            </Text>
          </View>
          <View className="flex justify-end items-end">
            <Text className="font-poppins-semibold text-end text-indigo-400">
              {item.transaction_status}
            </Text>
          </View>
        </View>
        <View id="cardTitle" className="flex-row  justify-between py-3">
          <View className="flex-col justify-start items-start">
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Kode Transaksi : {item.transaction_code}
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Provider : Telkomsel
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Produk : Telkomsel 5000
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Nomor Tujuan : {item.transaction_number}
            </Text>
            <Text
              className="font-poppins-regular"
              style={{color: isDarkMode ? DARK_COLOR : LIGHT_COLOR}}>
              Total Harga : {rupiah(item.transaction_total)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
      <View className="-mt-16 justify-center items-center flex">
        <View
          className=" w-full p-6 flex-row  justify-between flex-wrap"
          style={{height: windowHeight * 0.11}}>
          <TouchableOpacity
            onPress={() => setStatusFilter('all')}
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'all'
                  ? isDarkMode
                    ? BLUE_COLOR
                    : BLUE_COLOR
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
          <TouchableOpacity
            onPress={() => setStatusFilter('success')}
            className="h-full rounded-md flex items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'success'
                  ? '#6bc76b'
                  : isDarkMode
                  ? '#27272A'
                  : WHITE_BACKGROUND,
            }}>
            <Text
              className="font-poppins-semibold"
              style={{
                color:
                  statusFilter === 'success'
                    ? isDarkMode
                      ? WHITE_COLOR
                      : WHITE_COLOR
                    : isDarkMode
                    ? '#80ed80ff'
                    : BLUE_COLOR,
              }}>
              Sukses
            </Text>
          </TouchableOpacity>
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
                    ? BLUE_COLOR
                    : BLUE_COLOR,
              }}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('failed')}
            className="h-full rounded-md items-center justify-center"
            style={{
              width: windowWidth * 0.2,
              backgroundColor:
                statusFilter === 'failed'
                  ? '#ff746c'
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
        payload={{status: statusFilter}}
        data={filteredTransactions}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
