import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

import { useCamera } from "@/hooks/useCamera";
import { useDeviceForm } from "@/hooks/useDeviceForm";
import { insertDevice, fetchDevices } from "@/database";
import { useDevices } from "@/context/DeviceContext";
import { FormInput } from "@/components/Forms/FormInput";
import { OptionGroup } from "@/components/Forms/OptionGroup";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { SuccessButton } from "@/components/Buttons/SuccessButton";
import { CameraModal } from "@/components/Modals/CameraModal";
import { validateDevice } from "@/utils/validations";
import { colors } from "@/colors";

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

    // 🔹 Validação
    if (!validateDevice(newDevice)) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha todos os campos para continuar ❌",
      });
      return;
    }

    try {
      // 🔹 Verificar duplicidade
      const existing = await fetchDevices();
      if (existing.some((d) => d.imei === imei)) {
        Toast.show({
          type: "error",
          text1: "Dispositivo duplicado",
          text2: "Já existe um dispositivo com este IMEI ⚠️",
        });
        return;
      }

      // 🔹 Inserir no banco
      await insertDevice(imei, brand, model, status, color, size);
      onDeviceSaved(newDevice);
      addDevice(newDevice);
      resetForm();

      Toast.show({
        type: "success",
        text1: "Cadastro realizado!",
        text2: "O dispositivo foi salvo com sucesso ✅",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro inesperado",
        text2: "Não foi possível salvar o dispositivo ❌",
      });
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* CARD PRINCIPAL */}
        <View
          style={{
            width: "100%",
            maxWidth: 480,
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          {/* Título */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 20,
              color: colors.text,
              textAlign: "center",
            }}
          >
            Cadastro de Dispositivos
          </Text>

          {/* Botão Câmera */}
          <PrimaryButton
            label="Ler Código de Barras"
            onPress={() => {
              handleOpenCamera();
              Toast.show({
                type: "info",
                text1: "Câmera aberta",
                text2: "Aponte para o código de barras 📷",
              });
            }}
            icon={
              <Icon name="qr-code-scanner" size={20} color={colors.white} />
            }
          />

          {/* Inputs */}
          <FormInput
            label="IMEI"
            value={imei}
            onChange={setImei}
            icon={
              <Icon name="qr-code" size={20} color={colors.textSecondary} />
            }
          />
          <FormInput
            label="Modelo"
            value={model}
            onChange={setModel}
            icon={
              <Icon
                name="phone-android"
                size={20}
                color={colors.textSecondary}
              />
            }
          />
          <FormInput
            label="Cor"
            value={color}
            onChange={setColor}
            icon={
              <Icon name="palette" size={20} color={colors.textSecondary} />
            }
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

          {/* Botão Salvar */}
          <SuccessButton
            label="Salvar"
            onPress={saveDevice}
            icon={<Icon name="save-alt" size={20} color={colors.white} />}
          />
        </View>
      </ScrollView>

      {/* Modal de Câmera */}
      <CameraModal
        visible={modalIsVisible}
        onClose={() => {
          setModalIsVisible(false);
          Toast.show({
            type: "info",
            text1: "Câmera fechada",
            text2: "Leitura de código cancelada ❌",
          });
        }}
        onScanned={(scannedData) => {
          const imeiFromBarcode = handleQrCodeRead(scannedData);
          setImei(imeiFromBarcode);
          setModalIsVisible(false);

          Toast.show({
            type: "success",
            text1: "Código lido!",
            text2: `IMEI detectado: ${imeiFromBarcode}`,
          });
        }}
      />
    </KeyboardAvoidingView>
  );
}
