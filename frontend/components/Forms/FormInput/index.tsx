import { View, Text, TextInput, StyleSheet } from "react-native";
import { ReactNode } from "react";

import { styles } from "./styles";
export const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>

    <View style={[styles.inputWrapper, error && { borderColor: "#DC2626" }]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput
        style={styles.input}
        placeholder={placeholder ?? `Digite o ${label.toLowerCase()}`}
        placeholderTextColor="#6B7280" // 👈 cor mais forte pro placeholder
        value={value}
        onChangeText={onChange}
      />
    </View>

    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);
