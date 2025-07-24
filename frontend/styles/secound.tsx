import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#E0ECEF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    marginBottom: 6,
  },

  chipSelected: {
    backgroundColor: "#0D6E6D", // Verde escuro
    borderColor: "#0D6E6D",
  },

  chipText: {
    fontSize: 14,
    color: "#333",
  },

  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  clearButton: {
    flex: 1,
    backgroundColor: "#E53935", // Vermelho
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },

  reloadButton: {
    flex: 1,
    backgroundColor: "#007BFF", // Azul
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  deviceCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  deviceTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#0D6E6D",
  },

  deviceDetail: {
    fontSize: 14,
    color: "#555",
  },

  noResult: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#999",
  },
  filterToggle: {
    backgroundColor: "#D7EAE8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  filterToggleText: {
    fontWeight: "bold",
    color: "#0D6E6D",
    fontSize: 16,
    textAlign: "center",
  },

  filtersBox: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  pdfButtonContainer: {
    marginTop: 8,
  },

  pdfButton: {
    backgroundColor: "#28A745", // Verde
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
