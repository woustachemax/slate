import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';

async function getRoomId(slug: string) {
  const res = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return res.data;
}

const Chat = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams(); 
  useEffect(() => {
    if (!slug) return;
    getRoomId(String(slug)).then((data) => {
      console.log('Room data:', data);
    });
  }, [slug]);

  return (
    <View className='bg-black flex flex-1 justify-center items-center'>
      <Text className='text-white'>chat room: {String(slug)}</Text>
      <TouchableOpacity
        className='bg-white rounded-lg mt-4'
        onPress={() => router.replace('/')}
      >
        <Text className='text-black px-2 py-2'>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
