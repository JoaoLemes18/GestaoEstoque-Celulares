import { useState } from "react";
import {
  fetchDevices,
  deleteDevice,
  insertDevice,
  updateDevice,
} from "@/database";
import { Device } from "@/types/device";

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar dispositivos do SQLite
  const loadDevices = async (): Promise<Device[]> => {
    setLoading(true);
    try {
      const all = await fetchDevices();
      setDevices(all);
      return all;
    } catch (err) {
      console.error("Erro ao carregar dispositivos:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo dispositivo
  const addDevice = async (
    device: Omit<Device, "id">
  ): Promise<Device | null> => {
    try {
      await insertDevice(
        device.imei,
        device.brand,
        device.model,
        device.status,
        device.color,
        device.size
      );
      const updated = await loadDevices();
      return updated[updated.length - 1] || null; // retorna o último inserido
    } catch (err) {
      console.error("Erro ao adicionar dispositivo:", err);
      return null;
    }
  };

  // Atualizar dispositivo existente
  const editDevice = async (device: Device): Promise<Device | null> => {
    try {
      await updateDevice(device);
      await loadDevices();
      return device;
    } catch (err) {
      console.error("Erro ao editar dispositivo:", err);
      return null;
    }
  };

  // Remover dispositivo
  const removeDevice = async (id: number): Promise<number | null> => {
    try {
      await deleteDevice(id);
      setDevices((prev) => prev.filter((d) => d.id !== id));
      return id;
    } catch (err) {
      console.error("Erro ao remover dispositivo:", err);
      return null;
    }
  };

  return {
    devices,
    setDevices,
    loading,
    loadDevices,
    addDevice,
    editDevice,
    removeDevice,
  };
}
