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
    </Stack>
  )
}

export default _layout