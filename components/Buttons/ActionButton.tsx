import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const ActionButton = ({
  label,
  icon,
  onPress,
  bg,
  color,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  bg: string;
  color: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: bg,
      borderRadius: 6,
      marginRight: 6,
    }}
  >
    {icon}
    <Text style={{ color, marginLeft: 4 }}>{label}</Text>
  </TouchableOpacity>
);
