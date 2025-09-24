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
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.options}>
      {options.map((option, idx) => {
        const selected = value === option;
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => setValue(option)}
            style={[styles.option, selected && styles.selected]}
          >
            <Text style={[styles.optionText, selected && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

