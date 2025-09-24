import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./register";
import Secound from "./secound";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Device } from "@/types/device";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  const handleDeviceSaved = (device: Device) => {
    setDevices((prevDevices) => [...prevDevices, device]);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === "Cadastro de Itens") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Itens Cadastrados") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Cadastro de Itens"
        children={() => <RegisterScreen onDeviceSaved={handleDeviceSaved} />}
        options={{ headerShown: false }} // 👈 título removido
      />
      <Tab.Screen
        name="Itens Cadastrados"
        children={() => <Secound devices={devices} />}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
