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
import { deleteDevice, fetchDevices } from "@/database";
import { useFocusEffect } from "@react-navigation/native";
import { DeviceCard } from "@/components/Cards/DeviceCard";
import { FilterBox } from "@/components/Filters/FilterBox";
import { EditDeviceModal } from "@/components/Modals/EditDeviceModal";
import { generateDevicePDF } from "@/utils/pdf";
import { useDeviceFilters } from "@/hooks/useDeviceFilters";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

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
  const [editingDevice, setEditingDevice] = useState<any | null>(null);

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

  // Carregar devices quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      const loadDevices = async () => {
        try {
          const all = await fetchDevices();
          setDevices(all);
          setFilteredDevices(all);

          Toast.show({
            type: "info",
            text1: "Lista carregada",
            text2: `Foram encontrados ${all.length} dispositivos 📱`,
          });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Erro ao carregar",
            text2: "Não foi possível carregar os dispositivos ❌",
          });
        }
      };
      loadDevices();
    }, [])
  );

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltersVisible(!filtersVisible);
    Toast.show({
      type: "info",
      text1: filtersVisible ? "Filtros ocultos" : "Filtros exibidos",
      text2: filtersVisible
        ? "Você ocultou os filtros"
        : "Agora pode refinar sua busca 🔍",
    });
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

    Toast.show({
      type: filtered.length ? "success" : "warning",
      text1: filtered.length
        ? "Filtros aplicados"
        : "Nenhum resultado encontrado",
      text2: filtered.length
        ? `Foram encontrados ${filtered.length} dispositivos ✅`
        : "Tente ajustar os filtros 🔎",
    });
  };

  const clearFilters = () => {
    setImeiSearch("");
    setBrandFilter("Todos");
    setStatusFilter("Todos");
    setSizeFilter("Todos");
    setFilteredDevices(devices);

    Toast.show({
      type: "info",
      text1: "Filtros limpos",
      text2: "Todos os dispositivos foram exibidos novamente 🗑️",
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDevice(Number(id));
      setDevices((prev) => prev.filter((d) => d.id !== id));
      setFilteredDevices((prev) => prev.filter((d) => d.id !== id));

      Toast.show({
        type: "success",
        text1: "Dispositivo removido",
        text2: `ID ${id} foi excluído com sucesso ✅`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir",
        text2: "Não foi possível excluir o dispositivo ❌",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16, backgroundColor: "#F9FAFB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Botão toggle de filtros */}
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

          {/* Botões de ação */}
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
              onPress={() => {
                if (filteredDevices.length === 0) {
                  Toast.show({
                    type: "warning",
                    text1: "Nada para exportar",
                    text2: "A lista está vazia ❌",
                  });
                  return;
                }
                generateDevicePDF(filteredDevices);
                Toast.show({
                  type: "success",
                  text1: "PDF gerado",
                  text2: "Relatório exportado com sucesso 📄",
                });
              }}
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

      {/* Lista */}
      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.id.toString()} // 👈 chave única
        renderItem={({ item }) => (
          <DeviceCard
            device={item}
            onEdit={(d) => {
              setEditingDevice(d); // abre modal já com dados
              Toast.show({
                type: "info",
                text1: "Modo edição",
                text2: `Você está editando o dispositivo ${d.imei} ✏️`,
              });
            }}
            onDelete={(id) => handleDelete(id)}
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
