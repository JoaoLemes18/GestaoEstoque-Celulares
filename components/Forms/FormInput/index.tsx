import { View, Text, TextInput } from "react-native";
import { ReactNode } from "react";
import { styles } from "./styles";
import { colors } from "@/colors";

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

    <View
      style={[
        styles.inputWrapper,
        { borderColor: error ? colors.error : colors.border },
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput
        style={styles.input}
        placeholder={placeholder ?? `Digite o ${label.toLowerCase()}`}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChange}
      />
    </View>

    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);
