import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { fetchDevices } from "@/database";
import { styles } from "@/styles/secound";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Device {
  imei: string;
  brand: string;
  model: string;
  status: string;
  color: string;
  size: string;
}

const allBrands = ["Todos", "Apple", "Samsung", "Xiaomi", "Motorola"];
const allStatus = ["Todos", "Novo", "Seminovo", "Usado"];
const allSizes = ["Todos", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];

export default function SearchDeviceScreen() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);

  const [imeiSearch, setImeiSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [sizeFilter, setSizeFilter] = useState("Todos");

  const [filtersVisible, setFiltersVisible] = useState(false);

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
    const filtered = devices.filter((device) => {
      const matchImei = device.imei.includes(imeiSearch.trim());
      const matchBrand =
        brandFilter === "Todos" || device.brand === brandFilter;
      const matchStatus =
        statusFilter === "Todos" || device.status === statusFilter;
      const matchSize = sizeFilter === "Todos" || device.size === sizeFilter;
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

  const handleGeneratePDF = async () => {
    if (filteredDevices.length === 0) {
      alert("Nenhum dispositivo para gerar relatório.");
      return;
    }

    const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: sans-serif; padding: 16px; }
          h1 { color: #0D6E6D; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <h1>Relatório de Dispositivos</h1>
        <table>
          <thead>
            <tr>
              <th>IMEI</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Status</th>
              <th>Cor</th>
              <th>Tamanho</th>
            </tr>
          </thead>
          <tbody>
            ${filteredDevices
              .map(
                (d) => `
              <tr>
                <td>${d.imei}</td>
                <td>${d.brand}</td>
                <td>${d.model}</td>
                <td>${d.status}</td>
                <td>${d.color}</td>
                <td>${d.size}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, { mimeType: "application/pdf" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Botão Filtros */}
      <TouchableOpacity style={styles.filterToggle} onPress={toggleFilters}>
        <Text style={styles.filterToggleText}>📂 Filtros</Text>
      </TouchableOpacity>

      {/* Filtros colapsáveis */}
      {filtersVisible && (
        <View style={styles.filtersBox}>
          {/* Campo IMEI */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>IMEI</Text>
            <TextInput
              placeholder="Digite o IMEI..."
              value={imeiSearch}
              onChangeText={setImeiSearch}
              style={styles.input}
            />
          </View>

          {/* Chips */}
          <Text style={styles.label}>Marca</Text>
          <View style={styles.chipContainer}>
            {allBrands.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setBrandFilter(item)}
                style={[
                  styles.chip,
                  brandFilter === item && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    brandFilter === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Status</Text>
          <View style={styles.chipContainer}>
            {allStatus.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setStatusFilter(item)}
                style={[
                  styles.chip,
                  statusFilter === item && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    statusFilter === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Tamanho</Text>
          <View style={styles.chipContainer}>
            {allSizes.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSizeFilter(item)}
                style={[
                  styles.chip,
                  sizeFilter === item && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    sizeFilter === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botões Limpar / Recarregar */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reloadButton}
              onPress={applyFilters}
            >
              <Text style={styles.buttonText}>Recarregar</Text>
            </TouchableOpacity>
            <View style={styles.pdfButtonContainer}>
              <TouchableOpacity
                style={styles.pdfButton}
                onPress={handleGeneratePDF}
              >
                <Text style={styles.buttonText}>📄 Gerar PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Lista */}
      <FlatList
        data={filteredDevices}
        keyExtractor={(item) => item.imei}
        renderItem={({ item }) => (
          <View style={styles.deviceCard}>
            <Text style={styles.deviceTitle}>
              {item.brand} - {item.model}
            </Text>
            <Text style={styles.deviceDetail}>IMEI: {item.imei}</Text>
            <Text style={styles.deviceDetail}>Status: {item.status}</Text>
            <Text style={styles.deviceDetail}>Cor: {item.color}</Text>
            <Text style={styles.deviceDetail}>Tamanho: {item.size}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResult}>Nenhum dispositivo encontrado</Text>
        }
      />
    </KeyboardAvoidingView>
  );
}
