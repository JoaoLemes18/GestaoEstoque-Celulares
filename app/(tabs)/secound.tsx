import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { DeviceCard } from "@/components/Cards/DeviceCard";
import { FilterBox } from "@/components/Filters/FilterBox";
import { EditDeviceModal } from "@/components/Modals/EditDeviceModal";
import { generateDevicePDF } from "@/utils/pdf";
import { useDeviceFilters } from "@/hooks/useDeviceFilters";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { ActionButton } from "@/components/Buttons/ActionButton";
import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types/device";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SearchDeviceScreen() {
  const { devices, setDevices, loadDevices, removeDevice } = useDevices();

  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  const {
    imeiSearch,
    setImeiSearch,
    brandFilter,
    setBrandFilter,
    statusFilter,
    setStatusFilter,
    sizeFilter,
    setSizeFilter,
  } = useDeviceFilters();

  // 🔹 Carregar lista quando entrar na tela
  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const all = await loadDevices();
        setFilteredDevices(all);
      };
      fetch();
    }, [])
  );

  // 🔹 Aplicar filtros sempre que mudarem
  useEffect(() => {
    const filtered = devices.filter((d) => {
      const matchImei = d.imei
        .toLowerCase()
        .includes(imeiSearch.trim().toLowerCase());
      const matchBrand = brandFilter === "Todos" || d.brand === brandFilter;
      const matchStatus = statusFilter === "Todos" || d.status === statusFilter;
      const matchSize = sizeFilter === "Todos" || d.size === sizeFilter;
      return matchImei && matchBrand && matchStatus && matchSize;
    });

    setFilteredDevices(filtered);
  }, [imeiSearch, brandFilter, statusFilter, sizeFilter, devices]);

  // 🔹 Limpar filtros
  const clearFilters = () => {
    setImeiSearch("");
    setBrandFilter("Todos");
    setStatusFilter("Todos");
    setSizeFilter("Todos");
    setFilteredDevices(devices);
  };

  // 🔹 Excluir item
  const handleDelete = async (id: number) => {
    const removed = await removeDevice(id);
    if (removed) {
      setFilteredDevices((prev) => prev.filter((d) => d.id !== id));
      Toast.show({ type: "success", text1: "Dispositivo removido" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16, backgroundColor: "#F9FAFB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Botão toggle de filtros */}
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setFiltersVisible(!filtersVisible);
        }}
        style={{ marginBottom: 12, flexDirection: "row", alignItems: "center" }}
      >
        <Feather
          name="filter"
          size={20}
          color="#111"
          style={{ marginRight: 6 }}
        />
        <Text style={{ fontWeight: "600", fontSize: 16 }}>Filtros</Text>
      </TouchableOpacity>

      {/* Box de filtros */}
      {filtersVisible && (
        <View style={{ marginBottom: 12 }}>
          <FilterBox
            imeiSearch={imeiSearch}
            setImeiSearch={setImeiSearch}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
          />

          {/* Botões */}
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <ActionButton
              label="Limpar"
              icon={<MaterialIcons name="clear" size={18} color="#111" />}
              onPress={clearFilters}
              bg="#E5E7EB"
              color="#111"
            />
            <ActionButton
              label="PDF"
              icon={<Feather name="file-text" size={18} color="#fff" />}
              onPress={() => {
                if (filteredDevices.length === 0) {
                  Toast.show({
                    type: "warning",
                    text1: "Nada para exportar",
                  });
                  return;
                }
                generateDevicePDF(filteredDevices);
                Toast.show({ type: "success", text1: "PDF gerado" });
              }}
              bg="#059669"
              color="#fff"
            />
          </View>
        </View>
      )}

      {/* Lista */}
      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DeviceCard
            device={item}
            onEdit={(d) => setEditingDevice(d)}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum dispositivo encontrado
          </Text>
        }
      />

      {/* Modal de edição */}
      <EditDeviceModal
        visible={!!editingDevice}
        device={editingDevice}
        onClose={() => setEditingDevice(null)}
        onSave={(updated) => {
          setDevices((prev) =>
            prev.map((d) => (d.id === updated.id ? updated : d))
          );
          setFilteredDevices((prev) =>
            prev.map((d) => (d.id === updated.id ? updated : d))
          );
          setEditingDevice(null);
        }}
      />
    </KeyboardAvoidingView>
  );
}
