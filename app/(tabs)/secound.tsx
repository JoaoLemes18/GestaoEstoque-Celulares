import React, { useState } from "react";
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
import { deleteDevice } from "@/database";

import { useFocusEffect } from "@react-navigation/native";
import { fetchDevices } from "@/database";
import { DeviceCard } from "@/components/Cards/DeviceCard";
import { FilterBox } from "@/components/Filters/FilterBox";
import { generateDevicePDF } from "@/utils/pdf";
import { useDeviceFilters } from "@/hooks/useDeviceFilters";
import { MaterialIcons, Feather } from "@expo/vector-icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SearchDeviceScreen() {
  const [devices, setDevices] = useState<any[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<any[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      const loadDevices = async () => {
        const all = await fetchDevices();
        setDevices(all);
        setFilteredDevices(all);
      };
      loadDevices();
    }, [])
  );

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltersVisible(!filtersVisible);
  };

  const applyFilters = () => {
    const filtered = devices.filter((d) => {
      const matchImei = d.imei.includes(imeiSearch.trim());
      const matchBrand = brandFilter === "Todos" || d.brand === brandFilter;
      const matchStatus = statusFilter === "Todos" || d.status === statusFilter;
      const matchSize = sizeFilter === "Todos" || d.size === sizeFilter;
      return matchImei && matchBrand && matchStatus && matchSize;
    });
    setFilteredDevices(filtered);
  };

  const clearFilters = () => {
    setImeiSearch("");
    setBrandFilter("Todos");
    setStatusFilter("Todos");
    setSizeFilter("Todos");
    setFilteredDevices(devices);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16, backgroundColor: "#F9FAFB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        onPress={toggleFilters}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <TouchableOpacity
              onPress={clearFilters}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                backgroundColor: "#E5E7EB",
                borderRadius: 6,
                marginRight: 6,
              }}
            >
              <MaterialIcons
                name="clear"
                size={18}
                color="#111"
                style={{ marginRight: 4 }}
              />
              <Text>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={applyFilters}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                backgroundColor: "#2563EB",
                borderRadius: 6,
                marginRight: 6,
              }}
            >
              <Feather
                name="refresh-cw"
                size={18}
                color="#fff"
                style={{ marginRight: 4 }}
              />
              <Text style={{ color: "#fff" }}>Recarregar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => generateDevicePDF(filteredDevices)}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                backgroundColor: "#059669",
                borderRadius: 6,
              }}
            >
              <Feather
                name="file-text"
                size={18}
                color="#fff"
                style={{ marginRight: 4 }}
              />
              <Text style={{ color: "#fff" }}>PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id.toString()} // 👈 agora com id
        renderItem={({ item }) => (
          <DeviceCard
            device={item}
            onEdit={(d) => alert(`Editar ${d.imei}`)}
            onDelete={async (id) => {
              await deleteDevice(Number(id));
              setDevices((prev) => prev.filter((d) => d.id !== id));
              setFilteredDevices((prev) => prev.filter((d) => d.id !== id));
            }}
          />
        )}
        ListEmptyComponent={<Text>Nenhum dispositivo encontrado</Text>}
      />
    </KeyboardAvoidingView>
  );
}
