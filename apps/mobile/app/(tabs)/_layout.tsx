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
    </Stack>
  )
}

export default _layout