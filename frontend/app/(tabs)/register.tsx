import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { CameraView } from "expo-camera";
import { useCamera } from "@/hooks/useCamera";
import { styles } from "@/styles/register";
import { insertDevice } from "@/database";
import { useDevices } from "@/context/DeviceContext";

interface Device {
  imei: string;
  brand: string;
  model: string;
  status: string;
  color: string;
  size: string;
}

interface DeviceFormProps {
  onDeviceSaved: (device: Device) => void;
}

export default function Register({ onDeviceSaved }: DeviceFormProps) {
  const { addDevice } = useDevices(); // ✅ Agora está no lugar certo

  const {
    modalIsVisible,
    setModalIsVisible,
    handleOpenCamera,
    handleQrCodeRead,
  } = useCamera();

  const [imei, setImei] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const resetForm = () => {
    setImei("");
    setBrand("");
    setModel("");
    setStatus("");
    setColor("");
    setSize("");
  };

  const saveDevice = async () => {
    if (!imei || !brand || !model || !status || !color || !size) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }

    const newDevice: Device = { imei, brand, model, status, color, size };

    try {
      await insertDevice(imei, brand, model, status, color, size);
      onDeviceSaved(newDevice);
      addDevice(newDevice);
      resetForm(); // ✅ Limpa todos os inputs
      Alert.alert("Sucesso", "Dispositivo salvo com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar o dispositivo.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <Text style={styles.buttonText}>Ler Código de Barras</Text>
      </TouchableOpacity>

      {["IMEI", "Modelo", "Cor"].map((label, i) => (
        <View key={i} style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            placeholder={`Digite o ${label.toLowerCase()}`}
            value={[imei, model, color][i]}
            onChangeText={[setImei, setModel, setColor][i]}
            style={styles.input}
          />
        </View>
      ))}

      {[
        {
          label: "Marca",
          value: brand,
          setValue: setBrand,
          options: ["Apple", "Samsung", "Xiaomi", "Motorola"],
        },
        {
          label: "Status",
          value: status,
          setValue: setStatus,
          options: ["Novo", "Seminovo", "Usado"],
        },
        {
          label: "Tamanho",
          value: size,
          setValue: setSize,
          options: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
        },
      ].map((field, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.buttonGroup}>
            {field.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  field.value === option && {
                    backgroundColor: "blue",
                    color: "white",
                  },
                ]}
                onPress={() => field.setValue(option)}
              >
                <Text style={styles.optionButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={saveDevice}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <Modal visible={modalIsVisible} animationType="slide">
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={(scannedData) => {
            const imeiFromBarcode = handleQrCodeRead(scannedData);
            setImei(imeiFromBarcode);
            setModalIsVisible(false);
          }}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalIsVisible(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
