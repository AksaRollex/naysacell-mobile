import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {DARK_BACKGROUND, LIGHT_BACKGROUND} from '../../utils/const';
import {Bell, Package, Wallet, Clock} from 'lucide-react-native';

const Notifikasi = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const notifications = [
    {
      id: 1,
      date: '29 Januari 2025',
      data: [
        {
          id: 1,
          title: 'Pembelian Berhasil!',
          message: 'Pembelian Kamu Berhasil di BPJS Kesehatan!',
          time: '10:30',
          type: 'transaction',
          icon: <Package size={24} color={isDarkMode ? '#fff' : '#000'} />,
        },
        {
          id: 2,
          title: 'Pembayaran Diterima',
          message:
            'Pembayaran BPJS Kesehatan periode Januari 2025 telah diterima',
          time: '09:15',
          type: 'payment',
          icon: <Wallet size={24} color={isDarkMode ? '#fff' : '#000'} />,
        },
      ],
    },
  ];

  const NotificationItem = ({item}) => (
    <TouchableOpacity
      className="w-full p-4 rounded-xl mb-3"
      style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
      <View className="flex-row">
        <View className="mr-3 justify-center">{item.icon}</View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text
              className={`font-poppins-semibold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              {item.title}
            </Text>
            <Text
              className={`text-xs font-poppins-regular ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {item.time}
            </Text>
          </View>
          <Text
            className={`text-[13px] font-poppins-regular ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      {/* Notification List */}
      <ScrollView className="flex-1 p-4">
        {notifications.map(section => (
          <View key={section.id} className="mb-6">
            <Text
              className={`text-sm mb-3 font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {section.date}
            </Text>
            {section.data.map(item => (
              <NotificationItem key={item.id} item={item} />
            ))}
          </View>
        ))}

        {/* Jika tidak ada notifikasi */}
        {notifications.length === 0 && (
          <View className="flex-1 justify-center items-center p-8">
            <Bell size={48} color={isDarkMode ? '#4B5563' : '#9CA3AF'} />
            <Text
              className={`mt-4 text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Belum ada notifikasi
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notifikasi;
