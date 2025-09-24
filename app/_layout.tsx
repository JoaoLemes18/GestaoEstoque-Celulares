import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { DeviceProvider } from "@/context/DeviceContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/toastConfig";

const Layout = () => {
  return (
    <DeviceProvider>
      <View style={{ flex: 1 }}>
        <Slot />
        <Toast config={toastConfig} />
        </View>
    </DeviceProvider>
  );
};

export default Layout;
