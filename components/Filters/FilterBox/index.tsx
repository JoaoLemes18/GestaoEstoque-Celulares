import { View, TextInput, StyleSheet } from "react-native";
import { FilterChips } from "@/components/Filters/FilterChips";

export const FilterBox = ({
  imeiSearch,
  setImeiSearch,
  brandFilter,
  setBrandFilter,
  statusFilter,
  setStatusFilter,
  sizeFilter,
  setSizeFilter,
}: any) => (
  <View style={styles.box}>
    <TextInput
      placeholder="Digite o IMEI..."
      value={imeiSearch}
      onChangeText={setImeiSearch}
      style={styles.input}
    />

    <FilterChips
      label="Marca"
      value={brandFilter}
      onChange={setBrandFilter}
      options={["Todos", "Apple", "Samsung", "Xiaomi", "Motorola"]}
    />

    <FilterChips
      label="Status"
      value={statusFilter}
      onChange={setStatusFilter}
      options={["Todos", "Novo", "Seminovo", "Usado"]}
    />

    <FilterChips
      label="Tamanho"
      value={sizeFilter}
      onChange={setSizeFilter}
      options={["Todos", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"]}
    />
  </View>
);

const styles = StyleSheet.create({
  box: { backgroundColor: "#F3F4F6", padding: 12, borderRadius: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});

export default FilterChips;
