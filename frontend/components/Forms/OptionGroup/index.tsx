import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "./styles";
export const OptionGroup = ({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) => (
  <View style={styles.optionContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.optionRow}>
      {options.map((option, idx) => {
        const selected = value === option;
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => setValue(option)}
            style={[
              styles.optionButton,
              selected && styles.optionButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.optionButtonText,
                selected && styles.optionButtonTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);
