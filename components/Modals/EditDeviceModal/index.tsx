import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

import { FormInput } from "@/components/Forms/FormInput";
import { OptionGroup } from "@/components/Forms/OptionGroup";
import { SuccessButton } from "@/components/Buttons/SuccessButton";
import { colors } from "@/colors";
import { validateDevice } from "@/utils/validations";
import { updateDevice } from "@/database";

export type EditDeviceModalProps = {
  visible: boolean;
  device: any;
  onClose: () => void;
  onSave: (device: any) => void;
};

export const EditDeviceModal = ({
  visible,
  onClose,
  device,
  onSave,
}: EditDeviceModalProps) => {
  const [imei, setImei] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [color, setColor] = React.useState("");
  const [size, setSize] = React.useState("");

  // 🔹 Sempre que abrir um novo dispositivo, atualizar os campos
  React.useEffect(() => {
    if (device) {
      setImei(device.imei || "");
      setBrand(device.brand || "");
      setModel(device.model || "");
      setStatus(device.status || "");
      setColor(device.color || "");
      setSize(device.size || "");
    }
  }, [device]);

  const handleSave = async () => {
    const updated = { id: device.id, imei, brand, model, status, color, size };

    if (!validateDevice(updated)) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha todos os campos antes de salvar ❌",
      });
      return;
    }

    try {
      await updateDevice(updated);
      onSave(updated); // 👈 agora atualiza a lista do pai
      Toast.show({
        type: "success",
        text1: "Dispositivo atualizado",
        text2: `O dispositivo ${imei} foi editado com sucesso ✅`,
      });
      onClose();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível atualizar o dispositivo ❌",
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Editar Dispositivo</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView>
            <FormInput
              label="IMEI"
              value={imei}
              onChange={setImei}
              icon={<Icon name="qr-code" size={20} color={colors.muted} />}
            />
            <FormInput
              label="Modelo"
              value={model}
              onChange={setModel}
              icon={
                <Icon name="phone-android" size={20} color={colors.muted} />
              }
            />
            <FormInput
              label="Cor"
              value={color}
              onChange={setColor}
              icon={<Icon name="palette" size={20} color={colors.muted} />}
            />

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

            <SuccessButton
              label="Salvar Alterações"
              onPress={handleSave}
              icon={<Icon name="save-alt" size={20} color={colors.white} />}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
});
