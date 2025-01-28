import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DARK_BACKGROUND, LIGHT_BACKGROUND} from '../../../utils/const';
import {Send, ArrowLeft} from 'lucide-react-native';
import io from 'socket.io-client';
const socket = io(APP_URL);
import {APP_URL} from '@env';


const LiveChat = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Halo! Ada yang bisa kami bantu?',
      isAdmin: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  useEffect(() => {
    // Listen untuk pesan baru dari admin
    socket.on('adminResponse', message => {
      setChatMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: message.text,
          isAdmin: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    });

    return () => {
      socket.off('adminResponse');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: message,
        isAdmin: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        userId: route.params?.userId, // ID pengguna yang sedang chat
      };

      setChatMessages(prev => [...prev, userMessage]);
      socket.emit('userMessage', userMessage); // Kirim ke server
      setMessage('');
    }
  };

  const ChatBubble = ({text, isAdmin, timestamp}) => (
    <View
      className={`flex-row ${isAdmin ? 'justify-start' : 'justify-end'} mb-4`}>
      <View
        className={`max-w-[80%] p-3 rounded-2xl
          ${
            isAdmin
              ? 'bg-gray-200 rounded-tl-none'
              : 'bg-blue-500 rounded-tr-none'
          }`}>
        <Text className={isAdmin ? 'text-black' : 'text-white'}>{text}</Text>
        <Text
          className={`text-xs mt-1 ${
            isAdmin ? 'text-gray-500' : 'text-gray-200'
          }`}>
          {timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{
        backgroundColor: isDarkMode ? DARK_BACKGROUND : LIGHT_BACKGROUND,
      }}>
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <ArrowLeft size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <View>
          <Text
            className={`font-bold text-lg ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            Customer Service
          </Text>
          <Text
            className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Online - Biasanya membalas dalam 5 menit
          </Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView
        className="flex-1 p-4"
        ref={ref => {
          if (ref) {
            ref.scrollToEnd({animated: true});
          }
        }}>
        {chatMessages.map(msg => (
          <ChatBubble
            key={msg.id}
            text={msg.text}
            isAdmin={msg.isAdmin}
            timestamp={msg.timestamp}
          />
        ))}
      </ScrollView>

      {/* Input Area */}
      <View className="p-4 border-t border-gray-200">
        <View className="flex-row items-center">
          <TextInput
            className={`flex-1 p-3 mr-2 rounded-full border border-gray-300 
              ${isDarkMode ? 'text-white bg-gray-800' : 'text-black bg-white'}`}
            placeholder="Ketik pesan..."
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            className={`p-3 rounded-full ${
              message.trim() ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            disabled={!message.trim()}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LiveChat;
