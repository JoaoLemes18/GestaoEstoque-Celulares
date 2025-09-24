// styles.ts
import { StyleSheet } from "react-native";
import { colors } from "@/colors";

export const styles = StyleSheet.create({
  inputContainer: { marginBottom: 16 },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 6,
    color: colors.text,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14, color: colors.text },
  errorText: { color: colors.error, fontSize: 12, marginTop: 4 },
});
