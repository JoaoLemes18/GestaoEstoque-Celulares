import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  optionContainer: { marginBottom: 20 },
  label: { fontWeight: "600", fontSize: 16, marginBottom: 10 },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  optionButtonSelected: { backgroundColor: "#2563EB" },
  optionButtonText: { fontSize: 14, fontWeight: "500", color: "#111827" },
  optionButtonTextSelected: { color: "white" },
});
