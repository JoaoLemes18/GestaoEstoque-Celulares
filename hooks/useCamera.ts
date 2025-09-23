import { useState, useCallback } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";

export function useCamera() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenCamera = async () => {
    const { granted } = await requestPermission();
    if (!granted) {
      return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
    }
    setModalIsVisible(true);
  };

  const handleQrCodeRead = useCallback(({ data }: { data: string }) => {
    setModalIsVisible(false);
    return data; // Retorna o IMEI lido
  }, []);

  return {
    modalIsVisible,
    setModalIsVisible,
    handleOpenCamera,
    handleQrCodeRead,
  };
}
