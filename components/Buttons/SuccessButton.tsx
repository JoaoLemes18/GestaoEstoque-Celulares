import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { colors } from "@/colors";

export const SuccessButton = ({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
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
    backgroundColor: colors.success,
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { marginRight: 8 },
  text: { color: colors.white, fontWeight: "600", textAlign: "center" },
});
