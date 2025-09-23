import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const DangerButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
  },
  text: { color: "white", fontWeight: "600", textAlign: "center" },
});
export default DangerButton;
