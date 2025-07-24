import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { DeviceProvider } from "@/context/DeviceContext";

const Layout = () => {
  return (
    <DeviceProvider>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </DeviceProvider>
  );
};

export default Layout;
