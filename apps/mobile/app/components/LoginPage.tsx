import { View, TextInput, Image,Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';


const LoginPage = () => {
    const [isSignedUp, setIsSignedUp] = useState(true);
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
    const [isNamefocused, setisNameFocused] = useState(false);
    const [isUserFocused, setisUserFocused] = useState(false);
    const [focused, setFocused] = useState(false);



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className="flex-1 bg-black"
    >
    <ScrollView>
    <View className=''>
      <View>
        <Image
        source={require('@/assets/images/slate.png')}
        style={{
          width: 200,
          height: 250,
          tintColor: 'white',
        }}
        />
      </View>
      <View className='mx-2'>
        <Text className='text-blue-200 my-2 font-bold font-serif '> Username </Text>
        <TextInput
        value={username}
        onChangeText={setUsername}
        onFocus={() => setisUserFocused(true)}
        onBlur={() => setisUserFocused(false)}   
        autoCapitalize="none"
        keyboardType="default"
        placeholder="iamvengeance"
        placeholderTextColor='gray'
        className={`w-80 border border-gray-500 px-4 py-3 rounded-md bg-black text-white outline-none transition-all duration-300
        ${isUserFocused ? "shadow-xl shadow-cyan-500/50 " : ""}
        `}
        >
       </TextInput>
      </View>

      <View className='mx-2 mt-8'>
        <Text className='text-pink-200 my-2 font-bold font-serif '> Password </Text>
        <TextInput
        value={password}
        onChangeText={setPassword}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}   
        autoCapitalize="none"
        keyboardType="default"
        secureTextEntry={true}
        placeholder="* * * * *"
        placeholderTextColor='gray'
        className={`w-80 border border-gray-500 px-4 py-3 rounded-md bg-black text-white outline-none transition-all duration-300
        ${focused ? "shadow-xl shadow-pink-500/50" : ""}
        `}
        >
       </TextInput>
      </View>

      {isSignedUp && (
        <View className='mx-2 mt-8'>
        <Text className='text-green-200 my-2 font-bold font-serif '> Name </Text>
        <TextInput
        value={name}
        onChangeText={setName}
        onFocus={() => setisNameFocused(true)}
        onBlur={() => setisNameFocused(false)}   
        autoCapitalize="none"
        keyboardType="default"
        placeholder="Bruce Wayne"
        placeholderTextColor='gray'
        className={`w-80 border border-gray-500 px-4 py-3 rounded-md bg-black text-white outline-none transition-all duration-300
        ${isNamefocused ? "shadow-xl shadow-green-500/50" : ""}
        `}
        >
       </TextInput>
      </View>
      )}
      <View className='mt-8 mx-2'>
        <TouchableOpacity className='mt-8 w-80 border border-gray-500 px-4 py-3 rounded-md bg-black outline-none transition-all duration-300 shadow-xl
        
        active:shadow-teal-500/50 active:text-white'
        > 
            {isSignedUp? (
                <Text className='text-teal-200  font-serif text-bold text-center active:text-white'>
                    SignUp
                </Text>
            ):(
                <Text className='text-teal-200 font-serif text-bold text-center active:text-white'>
                    Login
                </Text>
            )}
        </TouchableOpacity>
      </View>
            {isSignedUp ? (
            <Text 
                onPress={() => setIsSignedUp(false)}
                className='text-center text-gray-200 mt-10 hover:text-white font-serif'>
                Already have an account? Login</Text>
            ) : (
            <Text 
                onPress={() => setIsSignedUp(true)}
                className='text-center text-gray-200 mt-10 hover:text-white font-serif'>
                Don't Have an Account? Signup!</Text>
            )} 
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginPage