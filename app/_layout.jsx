import { Tabs } from 'expo-router'
import React from 'react'
import { colors } from "../color_Assests/Color";
const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false, 
      tabBarStyle:{
        backgroundColor: colors.navBackground,

      },
      tabBarActiveTintColor: colors.navActive,
      tabBarInactiveTintColor: colors.navInactive
    
    }}>
    </Tabs>
  )
}

export default _layout

