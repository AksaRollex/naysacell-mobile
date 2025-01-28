// screens/admin/AdminChat.js
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { APP_URL } from '@env';

const socket = io(APP_URL);

const AdminChat = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    // Listen untuk pesan baru dari user
    socket.on('userMessage', message => {
      // Update list chat aktif
      setActiveChats(prev => {
        if (!prev.find(chat => chat.userId === message.userId)) {
          return [...prev, { userId: message.userId, lastMessage: message.text }];
        }
        return prev;
      });

      // Update messages untuk user tersebut
      setMessages(prev => ({
        ...prev,
        [message.userId]: [...(prev[message.userId] || []), message]
      }));
    });

    return () => {
      socket.off('userMessage');
    };
  }, []);

  const sendAdminResponse = () => {
    if (message.trim() && selectedChat) {
      const adminMessage = {
        text: message,
        userId: selectedChat,
        timestamp: new Date().toLocaleTimeString()
      };

      // Kirim pesan ke user
      socket.emit('adminResponse', adminMessage);

      // Update local messages
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), { ...adminMessage, isAdmin: true }]
      }));

      setMessage('');
    }
  };

  return (
    <View className="flex-1 flex-row">
      {/* Daftar chat aktif */}
      <View className="w-1/3 border-r border-gray-200">
        <FlatList
          data={activeChats}
          keyExtractor={item => item.userId}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className={`p-4 border-b border-gray-200 ${selectedChat === item.userId ? 'bg-blue-50' : ''}`}
              onPress={() => setSelectedChat(item.userId)}
            >
              <Text className="font-bold">User {item.userId}</Text>
              <Text numberOfLines={1}>{item.lastMessage}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Area chat */}
      {selectedChat ? (
        <View className="flex-1">
          <ScrollView className="flex-1 p-4">
            {messages[selectedChat]?.map((msg, index) => (
              <View key={index} className={`mb-4 ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                <View className={`p-3 rounded-lg ${msg.isAdmin ? 'bg-blue-500' : 'bg-gray-200'}`}>
                  <Text className={msg.isAdmin ? 'text-white' : 'text-black'}>{msg.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <View className="p-4 border-t border-gray-200">
            <View className="flex-row">
              <TextInput
                className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
                value={message}
                onChangeText={setMessage}
                placeholder="Ketik balasan..."
              />
              <TouchableOpacity 
                className="px-4 py-2 bg-blue-500 rounded-lg"
                onPress={sendAdminResponse}
              >
                <Text className="text-white">Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text>Pilih chat untuk memulai percakapan</Text>
        </View>
      )}
    </View>
  );
};

export default AdminChat;