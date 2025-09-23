import React from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useCamera } from "@/hooks/useCamera";
import { useDeviceForm } from "@/hooks/useDeviceForm";
import { insertDevice } from "@/database";
import { useDevices } from "@/context/DeviceContext";
import { FormInput } from "@/components/Forms/FormInput";
import { OptionGroup } from "@/components/Forms/OptionGroup";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { SuccessButton } from "@/components/Buttons/SuccessButton";
import { CameraModal } from "@/components/Modals/CameraModal";
import { validateDevice } from "@/utils/validations";

export default function Register({
  onDeviceSaved,
}: {
  onDeviceSaved: (device: any) => void;
}) {
  const { addDevice } = useDevices();
  const {
    modalIsVisible,
    setModalIsVisible,
    handleOpenCamera,
    handleQrCodeRead,
  } = useCamera();
  const {
    imei,
    setImei,
    brand,
    setBrand,
    model,
    setModel,
    status,
    setStatus,
    color,
    setColor,
    size,
    setSize,
    resetForm,
  } = useDeviceForm();

  const saveDevice = async () => {
    const newDevice = { imei, brand, model, status, color, size };
    if (!validateDevice(newDevice)) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }
    try {
      await insertDevice(imei, brand, model, status, color, size);
      onDeviceSaved(newDevice);
      addDevice(newDevice);
      resetForm();
      Alert.alert("Sucesso", "Dispositivo salvo com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar o dispositivo.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 20,
            color: "#111827",
          }}
        >
          Cadastro de Itens
        </Text>

        {/* Botão de abrir câmera */}
        <PrimaryButton
          label="Ler Código de Barras"
          onPress={handleOpenCamera}
          icon={<Icon name="qr-code-scanner" size={20} color="#fff" />}
        />

        {/* Inputs */}
        <FormInput
          label="IMEI"
          value={imei}
          onChange={setImei}
          icon={<Icon name="qr-code" size={18} color="#6B7280" />}
        />
        <FormInput
          label="Modelo"
          value={model}
          onChange={setModel}
          icon={<Icon name="phone-android" size={18} color="#6B7280" />}
        />
        <FormInput
          label="Cor"
          value={color}
          onChange={setColor}
          icon={<Icon name="palette" size={18} color="#6B7280" />}
        />

        {/* Grupos de opções */}
        <OptionGroup
          label="Marca"
          value={brand}
          setValue={setBrand}
          options={["Apple", "Samsung", "Xiaomi", "Motorola"]}
        />
        <OptionGroup
          label="Status"
          value={status}
          setValue={setStatus}
          options={["Novo", "Seminovo", "Usado"]}
        />
        <OptionGroup
          label="Tamanho"
          value={size}
          setValue={setSize}
          options={["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"]}
        />

        {/* Botão salvar */}
        <SuccessButton
          label="Salvar"
          onPress={saveDevice}
          icon={<Icon name="save-alt" size={20} color="#fff" />}
        />
      </ScrollView>

      {/* Modal da câmera */}
      <CameraModal
        visible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        onScanned={(scannedData) => {
          const imeiFromBarcode = handleQrCodeRead(scannedData);
          setImei(imeiFromBarcode);
          setModalIsVisible(false);
        }}
      />
    </KeyboardAvoidingView>
  );
}
