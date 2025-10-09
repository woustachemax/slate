import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import WrappedRoom from '../components/RoomPage'

export default function Room () {
  const router = useRouter()
  return (
    <View className='flex-1 bg-black justify-center items-center'>
     <WrappedRoom/>
    </View>
  )
}

