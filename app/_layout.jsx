import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import { colors } from "../color_Assests/Color";
const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{headerShown: false}}/>
      <Tabs.Screen/>
    </Tabs>
  )
}

export default _layout

