import { Tabs } from "expo-router";
import React from "react";
import { colors } from "../color_Assests/Color";
import { StatusBar } from "expo-status-bar";
const _layout = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.navBackground,
          },
          tabBarActiveTintColor: colors.navActive,
          tabBarInactiveTintColor: colors.navInactive,
        }}
      ></Tabs>
    </>
  );
};

export default _layout;
