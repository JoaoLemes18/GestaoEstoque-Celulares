import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export const DeviceCard = ({
  device,
  onEdit,
  onDelete,
}: {
  device: any;
  onEdit: (device: any) => void;
  onDelete: (id: number) => void;
}) => (
  <View style={styles.card}>
    {/* Informações principais */}
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
        {device.brand} - {device.model}
      </Text>

      <View style={styles.infoRow}>
        <Feather name="smartphone" size={14} color="#6B7280" />
        <Text style={styles.label}>IMEI:</Text>
        <Text style={styles.value}>{device.imei}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="activity" size={14} color="#6B7280" />
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{device.status}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="droplet" size={14} color="#6B7280" />
        <Text style={styles.label}>Cor:</Text>
        <Text style={styles.value}>{device.color}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="hard-drive" size={14} color="#6B7280" />
        <Text style={styles.label}>Tamanho:</Text>
        <Text style={styles.value}>{device.size}</Text>
      </View>
    </View>

    {/* Botões de ação */}
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={() => onEdit(device)}
        style={[styles.actionBtn, styles.editBtn]}
      >
        <Feather name="edit-2" size={18} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(device.id)}
        style={[styles.actionBtn, styles.deleteBtn]}
      >
        <MaterialIcons name="delete" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1F2937",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600", // destaque no label
    color: "#374151",
    marginLeft: 6,
    marginRight: 4,
  },
  value: {
    fontSize: 13,
    color: "#4B5563", // valor mais suave
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  actionBtn: {
    padding: 10,
    borderRadius: 50,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  editBtn: {
    backgroundColor: "#2563EB",
  },
  deleteBtn: {
    backgroundColor: "#DC2626",
  },
});
