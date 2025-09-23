import { Modal, View } from "react-native";
import { CameraView } from "expo-camera";
import DangerButton from "@/components/Buttons/DangerButton";
export const CameraModal = ({
  visible,
  onClose,
  onScanned,
}: {
  visible: boolean;
  onClose: () => void;
  onScanned: (data: any) => void;
}) => (
  <Modal visible={visible} animationType="slide">
    <CameraView style={{ flex: 1 }} onBarcodeScanned={onScanned} />
    <View style={{ padding: 20, backgroundColor: "white" }}>
      <DangerButton label="Cancelar" onPress={onClose} />
    </View>
  </Modal>
);
