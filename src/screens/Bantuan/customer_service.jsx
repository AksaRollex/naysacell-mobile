import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {BLUE_COLOR, DARK_BACKGROUND, LIGHT_BACKGROUND} from '../../utils/const';
import {
  Phone,
  Mail,
  MessageCircle,
  FileQuestion,
  Clock,
  User,
} from 'lucide-react-native';

const CustomerService = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const openWhatsApp = () => {
    const phoneNumber = '+6285336970707';
    const message = 'Halo Admin NAYSA CELL !';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(url).catch(err => {
      console.error('Error occurred', err);
      alert('WhatsApp is not installed or there is an issue.');
    });
  };

  const openEmail = () => {
    const email = 'naysacell837@gmail.com';
    const subject = 'Bantuan NAYSA CELL';
    const body = 'Halo Admin NAYSA CELL !';

    Linking.openURL(
      `mailto:${email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    );
  };

  const supportOptions = [
    {
      title: 'Hubungi Kami',
      description: 'Bicara langsung dengan tim support kami melalui whatsapp',
      icon: <Phone size={24} color={isDarkMode ? BLUE_COLOR : '#000'} />,
      action: () => openWhatsApp(),
    },
    {
      title: 'Email Support',
      description: 'Kirim email untuk bantuan lebih detail',
      icon: <Mail size={24} color={isDarkMode ? BLUE_COLOR : '#000'} />,
      action: () => openEmail(),
    },
    // {
    //   title: 'Live Chat',
    //   description: 'Chat langsung dengan customer service',
    //   icon: (
    //     <MessageCircle size={24} color={isDarkMode ? BLUE_COLOR : '#000'} />
    //   ),
    //   action: () => navigation.navigate('LiveChat'),
    // },
    // {
    //   title: 'FAQ',
    //   description: 'Temukan jawaban untuk pertanyaan umum',
    //   icon: <FileQuestion size={24} color={isDarkMode ? BLUE_COLOR : '#000'} />,
    //   action: () => console.log('Open FAQ'),
    // },
  ];

  return (
    <ScrollView
      className="w-full h-full p-4"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      {/* Header */}
      {/* <View className="mb-6">
        <Text
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
          Pusat Bantuan
        </Text>
        <Text
          className={`text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          Bagaimana kami dapat membantu Anda hari ini?
        </Text>
      </View> */}

      {/* Status Card */}
      <View
        className="p-4 mb-6 rounded-xl"
        style={{backgroundColor: isDarkMode ? '#1e1e1e' : '#F3F4F6'}}>
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Clock size={20} color={isDarkMode ? BLUE_COLOR : '#000'} />
            <Text
              className={`ml-2 font-poppins-semibold text-sm ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              Status Layanan
            </Text>
          </View>
          <View className="px-2 py-1 bg-green-500 rounded-xl">
            <Text className="text-white text-xs font-poppins-medium ">Online</Text>
          </View>
        </View>
        <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-poppins-regular text-xs`}>
          Waktu respons rata-rata: 10-15 menit
        </Text>
      </View>

      {/* Support Options */}
      <View className="flex-row flex-wrap justify-between">
        {supportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            className="w-[48%] p-4 mb-4 rounded-xl"
            style={{backgroundColor: isDarkMode ? '#1e1e1e' : '#F3F4F6'}}
            onPress={option.action}>
            <View className="mb-3">{option.icon}</View>
            <Text
              className={`font-poppins-semibold text-sm mb-1 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              {option.title}
            </Text>
            <Text
              className={`text-xs font-poppins-regular ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Card */}
      <View
        className="p-4 mt-2 rounded-xl"
        style={{backgroundColor: isDarkMode ? '#1e1e1e' : '#F3F4F6'}}>
        <View className="flex-row items-center mb-3">
          <User size={20} color={isDarkMode ? BLUE_COLOR : '#000'} />
          <Text
            className={`ml-2 font-poppins-semibold ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            Kontak Langsung
          </Text>
        </View>
        <Text
          className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2 font-poppins-regular text-xs`}>
          Telepon: +62 8533 - 3697 - 7070
        </Text>
        <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-poppins-regular text-xs`}>
          Email: naysacell837@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
};

export default CustomerService;
