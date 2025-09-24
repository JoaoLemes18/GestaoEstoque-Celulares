import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/colors";

export const FilterChips = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chips}>
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.chip, selected && styles.chipSelected]}
          >
            <Text
              style={[styles.chipText, selected && styles.chipTextSelected]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 6,
    color: colors.text,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.border,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
});
