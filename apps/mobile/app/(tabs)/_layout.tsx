import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
        name='index'
        options={{
            headerShown: false,
            title: "Home"
        }}/>
        <Stack.Screen 
        name='Room'
        options={{
          headerShown: false,
          title: "Room"
        }}
      />
      <Stack.Screen 
      name='chat/[slug]'
      options={{
        headerShown: false,
        title: "chat"
      }}/>
    </Stack>
  )
}

export default _layout