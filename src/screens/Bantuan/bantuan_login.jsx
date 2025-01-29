import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Linking,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  LIGHT_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import {Phone, Mail, Clock, User} from 'lucide-react-native';

export default function BantuanLogin() {
  const isDarkMode = useColorScheme() === 'dark';

  const nomorCS = '08123456789';

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
  ];

  return (
    <ScrollView
      className="w-full h-full"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      {/* Section 1: Cara Daftar */}
      <View
        className="m-3 p-3 my-5 rounded-xl"
        style={{backgroundColor: isDarkMode ? '#262626' : '#fff'}}>
        <Text
          className="text-base text-center my-2"
          style={{
            color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
            fontFamily: 'Poppins-SemiBold',
          }}>
          Cara Daftar Akun Di NAYSA CELL
        </Text>
        <View className="mx-auto mb-5">
          <Text
            className="text-sm capitalize text-justify"
            style={{
              color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
              fontFamily: 'Poppins-Regular',
            }}>
            1. Pertama klik dulu tombol daftar di halaman awal
          </Text>
          <Text
            className="text-sm capitalize text-justify"
            style={{
              color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
              fontFamily: 'Poppins-Regular',
            }}>
            2. Lalu lengkapi form data
          </Text>
          <Text
            className="text-sm capitalize text-justify"
            style={{
              color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
              fontFamily: 'Poppins-Regular',
            }}>
            3. Lalu klik tombol daftar
          </Text>
          <Text
            className="text-sm capitalize text-justify"
            style={{
              color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
              fontFamily: 'Poppins-Regular',
            }}>
            4. Masukkan data yang telah kamu daftarkan di halaman login
          </Text>
          <Text
            className="text-sm capitalize text-justify"
            style={{
              color: isDarkMode ? WHITE_COLOR : LIGHT_COLOR,
              fontFamily: 'Poppins-Regular',
            }}>
            5. Klik tombol login
          </Text>
        </View>
        {/* Support Options */}
        <View className="flex-row flex-wrap justify-between">
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className="w-[48%] p-4 mb-4 rounded-xl"
              style={{backgroundColor: isDarkMode ? '#242424' : '#F3F4F6'}}
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
          style={{backgroundColor: isDarkMode ? '#242424' : '#F3F4F6'}}>
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
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-2 font-poppins-regular text-xs`}>
            Telepon: +62 8533 - 3697 - 7070
          </Text>
          <Text
            className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } font-poppins-regular text-xs`}>
            Email: naysacell837@gmail.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
