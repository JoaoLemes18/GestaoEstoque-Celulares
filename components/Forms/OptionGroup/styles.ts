import { colors } from "@/colors";

import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.white,
  },
});
