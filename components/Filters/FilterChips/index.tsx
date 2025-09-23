import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const FilterChips = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.chipContainer}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          onPress={() => onChange(opt)}
          style={[styles.chip, value === opt && styles.chipSelected]}
        >
          <Text style={[styles.text, value === opt && styles.textSelected]}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  label: { fontWeight: "600", marginBottom: 6 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    marginBottom: 6,
  },
  chipSelected: { backgroundColor: "#2563EB" },
  text: { fontSize: 14, color: "#111827" },
  textSelected: { color: "#fff" },
});
