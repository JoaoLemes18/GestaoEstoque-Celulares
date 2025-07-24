import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Device {
  imei: string;
  brand: string;
  model: string;
  status: string;
  color: string;
  size: string;
}

interface DeviceContextProps {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  addDevice: (device: Device) => void;
}

const DeviceContext = createContext({} as DeviceContextProps);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);

  function addDevice(device: Device) {
    setDevices((prev) => [...prev, device]);
  }

  return (
    <DeviceContext.Provider value={{ devices, setDevices, addDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  return useContext(DeviceContext);
}
