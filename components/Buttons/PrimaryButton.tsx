import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export const PrimaryButton = ({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode; // 👈 ícone opcional
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.content}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.text}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
