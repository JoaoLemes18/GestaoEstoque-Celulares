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
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
        {device.brand} - {device.model}
      </Text>
      <Text style={styles.detail}>IMEI: {device.imei}</Text>
      <Text style={styles.detail}>Status: {device.status}</Text>
      <Text style={styles.detail}>Cor: {device.color}</Text>
      <Text style={styles.detail}>Tamanho: {device.size}</Text>
    </View>

    {/* Botões de ação */}
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={() => onEdit(device)} // 👈 passa o objeto inteiro
        style={styles.editBtn}
      >
        <Feather name="edit-2" size={18} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(device.id)} // 👈 aqui sim só o id
        style={styles.deleteBtn}
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
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111827",
  },
  detail: {
    fontSize: 13,
    color: "#4B5563",
  },
  actions: {
    justifyContent: "space-between",
    marginLeft: 12,
  },
  editBtn: {
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  deleteBtn: {
    backgroundColor: "#DC2626",
    padding: 8,
    borderRadius: 6,
  },
});
