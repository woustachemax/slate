import { View, TextInput, Image,Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ToastProvider, useToast } from './Toast';

const RoompPage = () => {
    const [room, setroom] = useState(true);
    const [roomName, setroomName] = useState<string>();
    const [isRoomFocues, setisRoomFocused] = useState(false);
    
    const {show} = useToast()
    const router=useRouter();

    const handleRooms = () => {

      if (!roomName) {
        show('*Please Enter the Room Name*', 'error');
        return;
      }

      router.replace('/chat');
    };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className="flex-1 bg-black"
    >
    <ScrollView
    showsVerticalScrollIndicator={false}>
    <View className=''>
      <View>
       
        <Image
        source={require('@/assets/images/room.png')}
        style={{
          width: 200,
          height: 250,
          tintColor: 'white',
        }}
        />
        
      </View>
      
      <View className='mx-2'>
        <Text className='text-blue-200 my-2 font-bold font-serif '> Room ID </Text>
        <TextInput
        value={roomName}
        onChangeText={setroomName}
        onFocus={() => setisRoomFocused(true)}
        onBlur={() => setisRoomFocused(false)}   
        autoCapitalize="none"
        keyboardType="default"
        placeholder="iamvengeance"
        placeholderTextColor='gray'
        className={`w-80 border border-gray-500 px-4 py-3 rounded-md bg-black text-white outline-none transition-all duration-300
        ${isRoomFocues ? "shadow-xl shadow-cyan-500/50 " : ""}
        `}
        >
       </TextInput>
      </View>

        <TouchableOpacity className='mx-2 mt-8 w-80 border border-gray-500 px-4 py-3 rounded-md bg-black outline-none transition-all duration-300 shadow-xl
        active:shadow-teal-500/50 active:text-white'
        onPress={handleRooms}
        > 
            {room? (
                <Text className='text-teal-200  font-serif text-bold text-center active:text-white'>
                    Create Room
                </Text>
            ):(
                <Text className='text-teal-200 font-serif text-bold text-center active:text-white'>
                    Join Room
                </Text>
            )}
        </TouchableOpacity>
      </View>
            {room ? (
            <Text 
                onPress={() => setroom(false)}
                className='text-center text-gray-200 mt-10 hover:text-white font-serif'>
                Wanna Join an existing Room? Join Room</Text>
            ) : (
            <Text 
                onPress={() => setroom(true)}
                className='text-center text-gray-200 mt-10 hover:text-white font-serif'>
                Don't Have a Room? Create One!</Text>
            )} 

            <Text 
            onPress={()=>router.replace('/')}
            className='text-center text-violet-200 mt-10 hover:text-white font-serif'>
                 Back to login
            </Text>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

 const WrappedRoom = ()=>{
  return(
  <ToastProvider>
    <RoompPage/>
  </ToastProvider>
  )
 }

export default WrappedRoom